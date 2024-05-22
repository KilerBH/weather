import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, startWith, map, BehaviorSubject } from 'rxjs';
import { DataFromDialogService } from 'src/app/services/data-from-dialog.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private dataService: DataFromDialogService,
    private searchService: SearchService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  myControl = new FormControl('');
  options$ = new BehaviorSubject<any[]>([]);
  filteredOptions!: Observable<any[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.length >= 3 ? value.toLowerCase() : '';
    if (filterValue && filterValue.length >= 3) {
      this.searchService
        .searchCities(filterValue)
        .subscribe((e) => this.options$.next(e));
    } else {
      this.options$.next([]);
    }

    return this.options$.getValue();
  }

  selectedOption(e: any) {
    this.dataService.setData(e);
  }
}
