import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchService } from 'src/app/services/search.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ICard } from 'src/app/interfaces/icard.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  constructor(private service: SearchService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  _cityWeather!: ICard;
  _temp = 0;
  @Input() set cityWeather(data: ICard) {
    if (data && data.name) {
      this._cityWeather = data;
      this._temp = Math.round((data.main!.temp! - 32) * (5 / 9));
    }
  }
  @Input() placeholder: string = '';
  @Output() onDeleteCard = new EventEmitter<string>();

  delete(city: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '150px',
      width: '240px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') this.onDeleteCard.emit(city);
    });
  }
}
