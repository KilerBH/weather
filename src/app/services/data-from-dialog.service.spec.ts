import { TestBed } from '@angular/core/testing';

import { DataFromDialogService } from './data-from-dialog.service';

describe('DataFromDialogService', () => {
  let service: DataFromDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFromDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
