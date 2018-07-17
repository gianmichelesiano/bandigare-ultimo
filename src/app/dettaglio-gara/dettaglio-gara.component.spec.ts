import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioGaraComponent } from './dettaglio-gara.component';

describe('DettaglioGaraComponent', () => {
  let component: DettaglioGaraComponent;
  let fixture: ComponentFixture<DettaglioGaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettaglioGaraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioGaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
