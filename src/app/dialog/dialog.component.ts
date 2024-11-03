import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiclienteService } from '../services/apicliente.service';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public nombres!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public apiCliente: ApiclienteService,
    public snackBAr: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public cliente :Cliente
  ) {  
       if(this.cliente !== null) {
        this.nombres = cliente.nombre;
       }

  }
 
  close(){
    this.dialogRef.close();
  }

  editCliente(){
    const cliente: Cliente ={ nombre:this.nombres,id: this.cliente.id};

    this.apiCliente.edit(cliente).subscribe(response =>{
      if(response.exito === 1){
          this.dialogRef.close();
          this.snackBAr.open('Cliente Editado con exito', '', {
              duration: 2000
          });
      }
  });
  }


  AddCliente(){
    const cliente: Cliente = { nombre: this.nombres, id:0 };
    this.apiCliente.add(cliente).subscribe(response =>{
        if(response.exito === 1){
            this.dialogRef.close();
            this.snackBAr.open('Cliente insertado con exito', '', {
                duration: 2000
            });
        }
    });
}
  ngOnInit(): void {
  }

}
