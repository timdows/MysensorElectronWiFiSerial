import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nrf24SnifferComponent } from './nrf24-sniffer.component';

describe('Nrf24SnifferComponent', () => {
  let component: Nrf24SnifferComponent;
  let fixture: ComponentFixture<Nrf24SnifferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nrf24SnifferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nrf24SnifferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
