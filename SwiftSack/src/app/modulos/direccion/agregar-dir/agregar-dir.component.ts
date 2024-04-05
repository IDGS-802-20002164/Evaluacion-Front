import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Direccion } from 'src/app/interfaces/direccion';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-agregar-dir',
  templateUrl: './agregar-dir.component.html',
  styleUrls: ['./agregar-dir.component.css']
})
export class AgregarDirComponent {
  usuario: UsuarioMod = {
    id: 0,
    name: '0',
    email: '0',
    password: '0',
    telefono: '0',
    active: false,
    confirmed_at: '0',
    roleId: 0,
  };

  dir: Direccion = {
    idDireccion: 0,
    idUser: 1,
    nombreCompleto: '',
    calleNumero: '',
    codigoPostal: '',
    telefono: ''
  };

  constructor(private direccion: ProyectoApiService, private router: Router) { }

  agregar() {
    this.obtenerUsuario();
    this.dir.idUser = this.usuario.id;
    this.direccion.addDireccion(this.dir).subscribe({
      next: () => {
        console.log('Direccion agregada correctamente');
        this.router.navigate(['verDirecciones']);
      },
      error: (e) => console.error(e),
      complete: () => console.info('Solicitud completada')
    });
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 3){
      this.router.navigate(['/home']);
    }	
  }

  obtenerUsuario() {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      this.usuario = JSON.parse(userData);
      console.log('Usuario: ' + this.usuario.name + ' recuperado');
    } else {
      console.log('El objeto no fue encontrado en sessionStorage.');
    }
  }
}
