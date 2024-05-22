import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from './services/search.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { DataFromDialogService } from './services/data-from-dialog.service';
import { BehaviorSubject, Subscription, switchMap, tap } from 'rxjs';
import { ICard } from './interfaces/icard.model';
import { Store } from '@ngrx/store';
import { setCities } from './reducers/app.actions';
import { selectCities } from './reducers/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'weather';

  subs$: Subscription[] = [];
  dataSource: ICard[] = [];
  dataSource$ = new BehaviorSubject<ICard[]>([]);
  interval: any;
  date = new Date().getFullYear(); 

  constructor(
    private service: SearchService,
    public dialog: MatDialog,
    private dataFromDialogService: DataFromDialogService,
    private store$: Store
  ) {
    let weather = JSON.parse(localStorage.getItem('weather')!);
    if (weather && weather.length > 0) {
      this.store$.dispatch(setCities({ items: weather }));
    }
  }

  ngOnInit(): void {
    this.subs$.push(
      this.store$.select(selectCities).subscribe((e) => {
        this.dataSource = [...e.cities];
        this.dataSource$.next(this.dataSource);
      }),
      this.dataFromDialogService.data$
        .pipe(switchMap((value) => this.service.search(value)))
        .subscribe((e: any) => {
          this.dataSource.push(e);
          this.dataSource$.next(this.dataSource);
          localStorage.setItem('weather', JSON.stringify(this.dataSource));
        })
    );
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.dataSource = [];
      this.dataSource$.getValue().forEach((data) =>
        this.subs$.push(
          this.service.search(data.name!).subscribe((e) => {
            this.dataSource.push(e);
            this.dataSource$.next(this.dataSource);
            localStorage.setItem('weather', JSON.stringify(this.dataSource));
          })
        )
      );
    }, 60000);//1 минута
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '220px',
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  onDeleteCard(city: string) {
    let index = this.dataSource$.getValue().findIndex((f) => f.name === city);
    this.dataSource$.getValue().splice(index, 1);
    localStorage.setItem(
      'weather',
      JSON.stringify(this.dataSource$.getValue())
    );
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => sub.unsubscribe());
  }
}
