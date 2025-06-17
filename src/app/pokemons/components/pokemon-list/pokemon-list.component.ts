import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import PokemonCardComponent from "../pokemon-card/pokemon-card.component";
import { SimplePokemon } from '@pokemons/interfaces';

@Component({
  standalone: true,
  selector: 'app-pokemon-list',
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonListComponent { 
  public pokemons = input.required<SimplePokemon[]>();
}
