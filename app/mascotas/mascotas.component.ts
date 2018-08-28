import { Component, OnInit } from '@angular/core';

import { Mascota } from '../mascota';
import { MascotaService } from '../mascota.service';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})

export class MascotasComponent implements OnInit {

  mascotas: Mascota[];
  // selectedMascota: Mascota;

  constructor(private mascotaService: MascotaService) { }
 
  ngOnInit() {
    this.getMascotas();
  }
 
  getMascotas(): void {
    this.mascotaService.getMascotas()
    .subscribe(mascotas => this.mascotas = mascotas);
  }
 
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.mascotaService.addMascota({ name } as Mascota)
      .subscribe(mascota => {
        this.mascotas.push(mascota);
      });
  }
 
  delete(mascota: Mascota): void {
    this.mascotas = this.mascotas.filter(h => h !== mascota);
    this.mascotaService.deleteMascota(mascota).subscribe();
  }
 
}