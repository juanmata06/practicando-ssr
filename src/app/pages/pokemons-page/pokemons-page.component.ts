import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import PokemonListComponent from '@pokemons/components/pokemon-list/pokemon-list.component';
import PokemonListSkeletonComponent from '@pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '@pokemons/services/pokemons.service';
import { SimplePokemon } from '@pokemons/interfaces';
import { map, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit, OnDestroy {
  private _title = inject(Title);

  public isLoading = signal(true);
  private _appRef = inject(ApplicationRef);
  private $appState = this._appRef.isStable.subscribe((isStable) => {
    // console.log({isStable});
  });

  private _poskemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  public currentPage = toSignal<number>(
    this._route.queryParamMap.pipe(
      map( params => params.get('page') ?? '1'),
      map( page => (isNaN(+page) ? 1 : +page)),
      map( page => Math.max(1, page))
    )
  );

  ngOnInit(): void {
    // this._route.queryParamMap.subscribe(console.log);
    // console.log(this.currentPage());
    
    this.loadPokemonsList();
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }
  
  ngOnDestroy(): void {
    this.$appState.unsubscribe();
  }

  loadPokemonsList(page = 0) {
    const pageToLoad = Math.max(1, this.currentPage()! + page);
    this._poskemonsService.loadPage(pageToLoad)
      .pipe(
        tap(() => this._router.navigate([], {queryParams: {page: pageToLoad}})),
        tap(() => this._title.setTitle(`Pokemons list - Page ${pageToLoad}`))
      )
      .subscribe(this.pokemons.set);
  }
  
}
