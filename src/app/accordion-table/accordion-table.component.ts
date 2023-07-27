import { Component } from '@angular/core';
import { PessoaService } from '../Services/pessoa.service';

@Component({
  selector: 'app-accordion-table',
  templateUrl: './accordion-table.component.html',
  styleUrls: ['./accordion-table.component.scss']
})

export class AccordionTableComponent {

  constructor(private pessoaService: PessoaService) {}

  public pessoa:any = [];

  ngOnInit(): void {
    this.pessoaService.getAll().subscribe(
      data => {
        this.pessoa = data;
      }
    );
  }
}
