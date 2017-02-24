import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiholeStatsComponent } from './pihole-stats.component';

describe('PiholeStatsComponent', () => {
  let component: PiholeStatsComponent;
  let fixture: ComponentFixture<PiholeStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiholeStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiholeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
