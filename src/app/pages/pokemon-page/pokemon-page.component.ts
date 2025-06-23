import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetailResponse } from '@pokemons/interfaces';
import { PokemonsService } from '@pokemons/services/pokemons.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  
  private title = inject(Title);
  private meta = inject(Meta);
  
  private _poskemonsService = inject(PokemonsService);
  public pokemon = signal<PokemonDetailResponse | null>(null);

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (!id) { return; }
    this._poskemonsService.loadPokemon(id)
    .pipe(
      tap( ({name, id}) => {
        const title = `#${id} - ${name}`;
        const description = `Pokemon's page - ${name}`;
        this.title.setTitle(title);
        this.meta.updateTag({name: 'description', content: description});
        this.meta.updateTag({name: 'og:title', content: title});
        this.meta.updateTag({name: 'og:description', content: description});
        this.meta.updateTag({name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`});

      })
    )
    .subscribe(this.pokemon.set);
  }
}
