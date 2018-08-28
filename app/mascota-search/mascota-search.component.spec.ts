import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaSearchComponent } from './mascota-search.component';

describe('MascotaSearchComponent', () => {
  let component: MascotaSearchComponent;
  let fixture: ComponentFixture<MascotaSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotaSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
