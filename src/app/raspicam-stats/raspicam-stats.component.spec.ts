import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaspicamStatsComponent } from './raspicam-stats.component';

describe('RaspicamStatsComponent', () => {
  let component: RaspicamStatsComponent;
  let fixture: ComponentFixture<RaspicamStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaspicamStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaspicamStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
