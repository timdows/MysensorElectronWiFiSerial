import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SevenSegmentsComponent } from './seven-segments.component';

describe('SevenSegmentsComponent', () => {
  let component: SevenSegmentsComponent;
  let fixture: ComponentFixture<SevenSegmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SevenSegmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SevenSegmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
