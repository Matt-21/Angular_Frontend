import { IContato } from '../Interfaces/i-contato';
import { MatTableDataSource } from '@angular/material/table';

export interface IPessoa {
  id?: number,
  nome: string,
  contatos: IContato[] | MatTableDataSource<IContato>;
}
