import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICard } from '../interfaces/icard.model';
import { ICity } from '../interfaces/icity.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(city: string): Observable<ICard> {
    return this.http.get(
      `https://open-weather13.p.rapidapi.com/city/${city}/RU`,
      {
        headers: {
          'X-RapidAPI-Key':
            'bb2401458amshfe80fa478bdf42cp18715bjsnc1e799d3995b',
          'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com',
        },
      }
    );
  }

  searchCities(query: string): Observable<ICity[]> {
    return this.http
      .post(
        'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
        { query },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Token 283e63b97a2e048a913d33a16a7c8d934d3cfca2',
          },
        }
      )
      .pipe(map((value: any) => value.suggestions));
  }

  
}
