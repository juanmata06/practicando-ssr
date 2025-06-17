import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '@pokemons/interfaces';

@Component({
  standalone: true,
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonCardComponent {
  public pokemon = input.required<SimplePokemon>();
  public readonly pokemonImage = computed(
    () => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`
  );
  // logEffect = effect(() => {
  //   console.log('card:', this.pokemon());
  // });
}
