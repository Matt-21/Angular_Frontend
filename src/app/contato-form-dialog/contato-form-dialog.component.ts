import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContatoService } from '../Services/contato.service';
import { PessoaService } from '../Services/pessoa.service';

@Component({
  selector: 'app-contato-form-dialog',
  templateUrl: './contato-form-dialog.component.html',
  styleUrls: ['./contato-form-dialog.component.scss']
})
export class ContatoFormDialogComponent {
  public contato!: FormGroup;
  public pessoaList: any;
  selected = 0;

  constructor(
    public dialogRef: MatDialogRef<ContatoFormDialogComponent>,
    private fb: FormBuilder,
    private rest: ContatoService,
    private pessoaService: PessoaService,
  ) { }

  ngOnInit(): void {
    this.contato = this.fb.group({
      nome: ['', [Validators.required]],
      pessoa_id: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      whatsapp: ['', [Validators.required]],
    });

    this.pessoaService.getAll().subscribe(
      data => {
        this.pessoaList = data;
      }
    );
  }

  createLive(){
    this.rest.postContato(this.contato.value).subscribe(result => {});
    this.dialogRef.close(true);
    window.location.reload();
    this.contato.reset();
  }

  cancel(){
    this.dialogRef.close(true);
    this.contato.reset();
  }
}
