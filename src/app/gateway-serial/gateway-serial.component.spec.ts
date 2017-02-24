import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewaySerialComponent } from './gateway-serial.component';

describe('GatewaySerialComponent', () => {
  let component: GatewaySerialComponent;
  let fixture: ComponentFixture<GatewaySerialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatewaySerialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewaySerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
