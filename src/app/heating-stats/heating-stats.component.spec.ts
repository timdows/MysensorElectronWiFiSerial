import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatingStatsComponent } from './heating-stats.component';

describe('HeatingStatsComponent', () => {
  let component: HeatingStatsComponent;
  let fixture: ComponentFixture<HeatingStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatingStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatingStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
