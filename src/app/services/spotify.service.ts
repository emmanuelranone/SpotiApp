import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) {
    console.log('Servicio listo');
  }

  getQuery (query: string){
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCpHPiUDMgzuzDPogSy3dN1J_SnihUyVLlS0KG8sODCcI7qZX8rq37WVRPp6ctSNWnsGNG8_X9zPo-3WME'
    });

    return this.http.get( url, { headers });
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases?limit=20')
                .pipe( map( data => {
                  return data['albums'].items;
                }));
  }

  getArtistas( termino: string){
        return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe( map( data => data['artists'].items )); // como la funcoin de flecha devuelve un solo dato, puedo sacar el return
  }

  getArtista( id: string){
    return this.getQuery(`artists/${id}`);
            //.pipe( map( data => data['artists'].items )); // como la funcoin de flecha devuelve un solo dato, puedo sacar el return
  }

  getTopTracks( id: string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
            .pipe( map( data => data['tracks'] ));
  }
}
