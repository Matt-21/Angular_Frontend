import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { ContatoFormDialogComponent } from './contato-form-dialog/contato-form-dialog.component';
import { SuporteBalanceadFormDialogComponent } from './suporte-balancead-form-dialog/suporte-balancead-form-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  addLive(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      // maxHeight: '95vh',
      minWidth: '400px',
      // width: '25vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // window.location.reload();
    });
  }

  addContato(): void {
    const dialogRef = this.dialog.open(ContatoFormDialogComponent, {
      // maxHeight: '95vh',
      minWidth: '400px',
      // width: '25vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // window.location.reload();
    });
  }

  openSuporte (): void {
    const dialogRef = this.dialog.open(SuporteBalanceadFormDialogComponent, {
      // maxHeight: '95vh',
      minWidth: '400px',
      // width: '25vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // window.location.reload();
    });
  }
}
