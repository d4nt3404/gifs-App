import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  gifsList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = 'NcktCdAb89cA4PP9jG3oePuOucpDDKEi';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.GetLocalStorage();
   }

get tagsHistory() {
  return [...this._tagsHistory];
}

 searchTag( tag:string): void {
  if (tag.length === 0) return;
  this.organizeHistory(tag);

  //fetch('http://api.giphy.com/v1/gifs/search?api_key=NcktCdAb89cA4PP9jG3oePuOucpDDKEi&q=office&limit=2')
  //.then( resp => resp.json()
  //.then( data => console.log(data)));

  const params = new HttpParams()
  .set('api_key', this.apiKey)
  .set('limit', '10')
  .set('q', tag)

  this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
  .subscribe(resp => {
    this.gifsList = resp.data;
  })
}

private organizeHistory(tag:  string) {
  tag = tag.toLowerCase();

  if(this.tagsHistory.includes(tag)) {
    this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag);
  }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.SaveLocalStorage();
}

private SaveLocalStorage(): void {
  localStorage.setItem('history',JSON.stringify(this._tagsHistory))
}

private GetLocalStorage() {
  if (!localStorage.getItem('history')) return;
  this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

  if( this._tagsHistory.length === 0) return;
  this.searchTag(this._tagsHistory[0]);
}

}
