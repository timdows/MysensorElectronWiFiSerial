import { TestBed, inject } from '@angular/core/testing';

import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvironmentService]
    });
  });

  it('should ...', inject([EnvironmentService], (service: EnvironmentService) => {
    expect(service).toBeTruthy();
  }));
});
