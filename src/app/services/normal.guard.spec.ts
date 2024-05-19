import { TestBed } from '@angular/core/testing';

import { NormalGuard } from './user.guard';

describe('NormalGuard', () => {
  let guard: NormalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NormalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
