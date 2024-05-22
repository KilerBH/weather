import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataFromDialogService {

  constructor() { }

  data$ = new Subject<any>();

  setData(data: any) {
      this.data$.next(data);
  }
}
