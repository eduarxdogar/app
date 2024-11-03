import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Response } from '../models/response';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from '../models/cliente';
import { DeleteComponent } from '../common/delete/delete.component';
import { publicDecrypt } from 'crypto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
 
  public lst: any[] = [];
  public columnas : string[] = ['id', 'nombre', 'actions'];
  readonly width: string='300px';
  constructor(
    private apiCliente : ApiclienteService,
    public dialog : MatDialog,
    public snackbar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
     this.getClientes();
  }

  getClientes(){
    this.apiCliente.getClientes().subscribe(response => {
      this.lst = response.data;
    });
  }

  openAdd(){
    const dialogRef = this.dialog.open(DialogComponent,{
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getClientes();
    });
  }

  openEdit(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogComponent,{
      width: this.width,
      data: cliente
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getClientes();
    });

  }

  delete(cliente: Cliente){
    const dialogRef = this.dialog.open(DeleteComponent,{
      width: this.width,
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.apiCliente.eliminar(cliente.id).subscribe(response => {
          if(response.exito === 1){
            this.snackbar.open('Cliente eliminado con exito', '', {
              duration:2000
            });
            this.getClientes();
          }
        });
      }
    });
    

  }

}
