import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Direccion } from 'src/app/interfaces/direccion';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-editar-dir',
  templateUrl: './editar-dir.component.html',
  styleUrls: ['./editar-dir.component.css']
})
export class EditarDirComponent implements OnInit {
  dataSource:any=[];
  id:number = 0;
  dir: Direccion = {
    idDireccion: 0,
    idUser: 1,
    nombreCompleto: '',
    calleNumero: '',
    codigoPostal: '',
    telefono: ''
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

  constructor(
    private direccion: ProyectoApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 3){
      this.router.navigate(['/home']);
    }
    this.obtenerIdDireccion();
  }

  obtenerIdDireccion() {
    const idDireccion = this.route.snapshot.params['id'];
    this.dir.idDireccion = Number(idDireccion);
    this.id = Number(idDireccion);
    console.log(this.id);

    this.direccion.obtenerDireccion(this.id).subscribe({
      next: (response: Direccion[]) => {
        this.dataSource = response;
        this.dir.nombreCompleto = this.dataSource.nombreCompleto;
        this.dir.calleNumero = this.dataSource.calleNumero;
        this.dir.codigoPostal = this.dataSource.codigoPostal;
        this.dir.telefono = this.dataSource.telefono;
        this.dir.idUser = this.dataSource.idUser;
      },
      error: (error) => console.log(error)
    });
  }

  editar() {
    this.direccion.editarDireccion(this.dir).subscribe(
      () => {
        console.log('Direccion editada correctamente');
        this.router.navigate(['verDirecciones']);
      },
      error => {
        console.error('Error al editar la direccion:', error);
      }
    );
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
