import { Component } from '@angular/core';
import { UsuarioMod, UsuarioRegistro } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  role:number = 3;
  usuarioRegistro: UsuarioRegistro = {
    name: '',
    email: '',
    password: '',
    telefono: '',
    active: true,
    confirmed_at: new Date().toISOString(), // Puedes ajustar esto según tus necesidades
    roleId: 0
  };

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

  constructor(private proyectoApiService: ProyectoApiService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 0 && this.usuario.roleId != 1){
      this.router.navigate(['/home']);
    }
    if(this.usuario.roleId == 1){
      this.role = 2;
    }
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

  onSubmit() {
    this.usuarioRegistro.roleId = this.role;
    this.proyectoApiService.register(this.usuarioRegistro).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        // Realizar acciones adicionales si es necesario, como redirigir a otra página
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error en el registro:', error);
      }
    );
  }
}