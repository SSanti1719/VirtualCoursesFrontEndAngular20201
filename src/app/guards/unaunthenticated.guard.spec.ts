import { TestBed } from '@angular/core/testing';

import { UnaunthenticatedGuard } from './unaunthenticated.guard';

describe('UnaunthenticatedGuard', () => {
  let guard: UnaunthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnaunthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
