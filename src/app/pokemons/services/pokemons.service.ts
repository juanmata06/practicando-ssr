import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { PokemonDetailResponse, PokemonListResponse, SimplePokemon } from '@pokemons/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private _httpClient = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page != 0) {
      --page;
    }

    page = Math.max(0, page);

    return this._httpClient
      .get<PokemonListResponse>(
        `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`
      )
      .pipe(
        map((resp) => {
          const simplePokemons: SimplePokemon[] = resp.results.map((value) => ({
            id: value.url.split('/').at(-2) ?? '',
            name: value.name,
          }));
          return simplePokemons;
        }),
        tap(console.log)
      );
  }

  public loadPokemon(id: string) {
    return this._httpClient
      .get<PokemonDetailResponse>(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
  }
}
