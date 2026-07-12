import { TestBed } from '@angular/core/testing';

import { GlobalToast } from './global-toast';

describe('GlobalToast', () => {
  let service: GlobalToast;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalToast);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
