import { Component, OnInit } from '@angular/core';
import { Mascota } from '../mascota';
import { MascotaService } from '../mascota.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  mascotas: Mascota[] = [];

  constructor(private mascotaService: MascotaService) { }

  ngOnInit() {
    this.getMascotas();
  }

  getMascotas(): void {
    this.mascotaService.getMascotas()
      .subscribe(mascotas => this.mascotas = mascotas.slice(1, 5));
  }
}