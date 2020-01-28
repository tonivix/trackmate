import { TestBed } from '@angular/core/testing';

import { UserFacade } from './user.facade';

describe('UserFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserFacade = TestBed.get(UserFacade);
    expect(service).toBeTruthy();
  });
});
