import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Mascota } from './mascota';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class MascotaService {

  private mascotasUrl = 'api/mascotas';  

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  getMascotas (): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.mascotasUrl)
      .pipe(
        tap(mascotas => this.log('fetched mascotas')),
        catchError(this.handleError('getMascotas', []))
      );
  }


  getMascotaNo404<Data>(id: number): Observable<Mascota> {
    const url = `${this.mascotasUrl}/?id=${id}`;
    return this.http.get<Mascota[]>(url)
      .pipe(
        map(mascotas => mascotas[0]), 
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} mascota id=${id}`);
        }),
        catchError(this.handleError<Mascota>(`getMascota id=${id}`))
      );
  }


  getMascota(id: number): Observable<Mascota> {
    const url = `${this.mascotasUrl}/${id}`;
    return this.http.get<Mascota>(url).pipe(
      tap(_ => this.log(`fetched mascota id=${id}`)),
      catchError(this.handleError<Mascota>(`getMascota id=${id}`))
    );
  }


  searchMascotas(term: string): Observable<Mascota[]> {
    if (!term.trim()) {

      return of([]);
    }
    return this.http.get<Mascota[]>(`${this.mascotasUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found mascotas matching "${term}"`)),
      catchError(this.handleError<Mascota[]>('searchMascotas', []))
    );
  }


  addMascota (mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(this.mascotasUrl, mascota, httpOptions).pipe(
      tap((mascota: Mascota) => this.log(`added mascota w/ id=${mascota.id}`)),
      catchError(this.handleError<Mascota>('addMascota'))
    );
  }


  deleteMascota (mascota: Mascota | number): Observable<Mascota> {
    const id = typeof mascota === 'number' ? mascota : mascota.id;
    const url = `${this.mascotasUrl}/${id}`;

    return this.http.delete<Mascota>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted mascota id=${id}`)),
      catchError(this.handleError<Mascota>('deleteMascota'))
    );
  }


  updateMascota (mascota: Mascota): Observable<any> {
    return this.http.put(this.mascotasUrl, mascota, httpOptions).pipe(
      tap(_ => this.log(`updated mascota id=${mascota.id}`)),
      catchError(this.handleError<any>('updateMascota'))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error); 


      this.log(`${operation} failed: ${error.message}`);


      return of(result as T);
    };
  }


  
  private log(message: string) {
    this.messageService.add(`MascotaService: ${message}`);
  }
}