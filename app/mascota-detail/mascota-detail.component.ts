
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Mascota } from '../mascota';
import { MascotaService } from '../mascota.service';

@Component({
  selector: 'app-mascota-detail',
  templateUrl: './mascota-detail.component.html',
  styleUrls: ['./mascota-detail.component.css']
})

export class MascotaDetailComponent implements OnInit {
  mascota: Mascota;

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMascota();
  }
  getMascota(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.mascotaService.getMascota(id)
      .subscribe(mascota => this.mascota = mascota);
  }
  goBack(): void {
    this.location.back();
  }


  save(): void {
    this.mascotaService.updateMascota(this.mascota)
      .subscribe(() => this.goBack());
  }
}
