import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { ContatoFormDialogComponent } from '../contato-form-dialog/contato-form-dialog.component';
import { SuporteService } from '../Services/suporte.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-suporte-balancead-form-dialog',
  templateUrl: './suporte-balancead-form-dialog.component.html',
  styleUrls: ['./suporte-balancead-form-dialog.component.scss']
})
export class SuporteBalanceadFormDialogComponent implements OnDestroy {
  public suporteForm!: FormGroup;
  private unsubscribe = new Subject<void>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ContatoFormDialogComponent>,
    public dialog: MatDialog,
    private suporteService: SuporteService
  ) { }

  ngOnInit(): void {
    this.suporteForm = this.fb.group({
      expr: ['', [Validators.required]]
    });
  }

  suporteBalanceado() {
    this.suporteService.postSuporte(this.suporteForm.value).pipe(takeUntil(this.unsubscribe)).subscribe(result => {alert(result)});
  }

  cancel() {
    this.dialogRef.close(true);
    this.suporteForm.reset();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
