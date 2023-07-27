import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PessoaService } from '../Services/pessoa.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnDestroy {
  public pessoaForm!: FormGroup;
  private unsubscribe = new Subject<void>;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    private fb: FormBuilder,
    private rest: PessoaService
  ) { }

  ngOnInit(): void {
    this.pessoaForm = this.fb.group({
      nome: ['', [Validators.required]]
    });
  }

  createLive(){
    console.log(this.pessoaForm.value);
    this.rest.postPessoa(this.pessoaForm.value).pipe(takeUntil(this.unsubscribe)).subscribe(result => {console.log(result)});
    this.dialogRef.close(true);
    this.pessoaForm.reset();
    window.location.reload();
  }

  cancel(){
    this.dialogRef.close(true);
    this.pessoaForm.reset();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
