import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tarjeta } from 'src/app/interfaces/tarjeta';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent {
  tarjetas:Tarjeta[]=[];
  usuario:UsuarioMod = {
    id: 0,
    name: '0',
    email: '0',
    password: '0',
    telefono: '0',
    active: false,
    confirmed_at: '0',
    roleId: 0,
  };

  constructor(public tar:ProyectoApiService, private router: Router){}
 
  tarjetaObject:Tarjeta[]=[
    {
      idTarjeta: 1, 
      idUser: 1, 
      numeroTarjeta: "4152 3136 2121 0900",
      numTarEncryp: "**** **** **** 0900",
      nombreTarjeta: "LUIS GERMAN VARGAS",
      mesVencimiento: "12",
      annioVencimiento: "24",
      ccv:"123",
    },
  ]

  eliminarTarjeta(id:number){
    
      this.tar.eliminarTarjeta(id).subscribe(
        () => {
          console.log('Tarjeta eliminada correctamente');
          this.actualizarTabla();
        },
        error => {
          console.error('Error al eliminar tarjeta', error);
        }
      );
    
  }

  actualizarTabla(){
    this.tar.getTarjeta(this.usuario.id).subscribe(
      {
        next: response=>{
      this.tarjetas=response;
    },
    error: error=>console.log(error)
  }
    );
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 3){
      this.router.navigate(['/home']);
    }	
    this.actualizarTabla();
  }

  obtenerUsuario(){
    const userData = sessionStorage.getItem('userData');
    
    if (userData) {
      this.usuario = JSON.parse(userData);
      console.log('Usuario: ' + this.usuario.name + ' recuperado');
    } else {
      console.log('El objeto no fue encontrado en sessionStorage.');
    }
  }
}
