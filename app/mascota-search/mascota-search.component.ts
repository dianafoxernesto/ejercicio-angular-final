import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Mascota } from '../mascota';
import { MascotaService } from '../mascota.service';

@Component({
  selector: 'app-mascota-search',
  templateUrl: './mascota-search.component.html',
  styleUrls: [ './mascota-search.component.css' ]
})
export class MascotaSearchComponent implements OnInit {
  mascotas$: Observable<Mascota[]>;
  private searchTerms = new Subject<string>();

  constructor(private mascotaService: MascotaService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.mascotas$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.mascotaService.searchMascotas(term)),
    );
  }
}