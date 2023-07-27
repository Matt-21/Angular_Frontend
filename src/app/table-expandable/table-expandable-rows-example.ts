import {ChangeDetectorRef, Component, OnDestroy, QueryList, ViewChildren} from '@angular/core';
import {NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {MatTable, MatTableModule} from '@angular/material/table';
import { IPessoa } from '../Interfaces/i-pessoa';
import { PessoaService } from '../Services/pessoa.service';
import { ContatoService } from '../Services/contato.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IContato } from '../Interfaces/i-contato';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';


const COLUMNS_SCHEMA = [
  {
    key: 'id',
    type: 'text',
    label: 'ID',
  },
  {
    key: 'pessoa_id',
    type: 'text',
    label: 'PESSOA_ID',
  },
  {
    key: 'nome',
    type: 'text',
    label: 'Nome',
  },
  {
    key: 'telefone',
    type: 'text',
    label: 'Telefone',
  },
  {
    key: 'email',
    type: 'text',
    label: 'E-mail',
  },
  {
    key: 'whatsapp',
    type: 'text',
    label: 'Whatsapp',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: 'Actions',
  },
];

const COLUMNS_FIRST_TABLE = [
  {
    key: 'id',
    type: 'text',
    label: 'ID',
  },
  {
    key: 'nome',
    type: 'text',
    label: 'Nome',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: 'Actions',
  }
];

/**
 * @title Binding event handlers and properties to the table rows.
 */
@Component({
  selector: 'table-expandable-rows-example',
  styleUrls: ['table-expandable-rows-example.scss'],
  templateUrl: 'table-expandable-rows-example.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})

export class TableExpandableRowsExample implements OnDestroy {

  displayedColumnsFirstTable: string[] = COLUMNS_FIRST_TABLE.map((col) => col.key);
  columnsToDisplay: any = COLUMNS_FIRST_TABLE;
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  innerDisplayedColumns: any = COLUMNS_SCHEMA;
  pessoaData: IPessoa[] = [];
  sort: MatSort = new MatSort;
  clickedRows = new Set<IPessoa>();
  @ViewChildren('innerSort')
  innerSort!: QueryList<MatSort>;
  @ViewChildren('innerTables')
  innerTables!: QueryList<MatTable<IContato>>;
  expandedElement!: IPessoa | null;
  private unsubscribe = new Subject<void>;

  public dataSource:any = [];
  public pessoaForm!: FormGroup;
  public contatoForm!: FormGroup;

  constructor
  (
    private pessoaService: PessoaService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private contatoService: ContatoService
  ) {}


  ngOnInit(): void {
    this.forms();
    this.pessoaService.getAll().subscribe(
      data => {
        data.forEach((pessoa: IPessoa) => {
          if (pessoa.contatos && Array.isArray(pessoa.contatos) && pessoa.contatos.length) {
            this.pessoaData = [...this.pessoaData, {...pessoa, contatos: new MatTableDataSource(pessoa.contatos)}];
          } else {
            this.pessoaData = [...this.pessoaData, pessoa];
          }
        });
        this.dataSource = new MatTableDataSource(this.pessoaData);
        this.dataSource.sort = this.sort;
      }
    );
  }

  forms () {
    this.pessoaForm = this.fb.group({
      id: ['', [Validators.required]],
      nome: ['', [Validators.required]]
    });

    this.contatoForm = this.fb.group({
      id: ['', [Validators.required]],
      pessoa_id: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      whatsapp: ['', [Validators.required]],
    });
  }

  toggleRow(element: IPessoa) {
    element.contatos && (element.contatos as MatTableDataSource<IContato>).data?.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<IContato>).sort = this.innerSort.toArray()[index]);
  }

  removeRow(element: any){}

  updatePessoa () {
    this.pessoaService.putPessoa(this.pessoaForm.value).pipe(takeUntil(this.unsubscribe)).subscribe(result => {console.log(result)});
    this.cd.detectChanges();
  }

  deletePessoa (id: number) {
    this.pessoaService.deletePessoa(id).pipe(takeUntil(this.unsubscribe)).subscribe(result => {console.log(result)});
    window.location.reload();
    this.cd.detectChanges();
  }

  updateContatos () {
    this.contatoService.putContatos(this.contatoForm.value).pipe(takeUntil(this.unsubscribe)).subscribe(result => {console.log(result)});
    this.cd.detectChanges();
  }

  deleteContatos (id: number) {
    this.contatoService.deleteContatos(id).pipe(takeUntil(this.unsubscribe)).subscribe(result => {console.log(result)});
    window.location.reload();
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
