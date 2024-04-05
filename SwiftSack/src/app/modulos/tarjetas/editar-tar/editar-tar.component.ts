import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tarjeta } from 'src/app/interfaces/tarjeta';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-editar-tar',
  templateUrl: './editar-tar.component.html',
  styleUrls: ['./editar-tar.component.css']
})
export class EditarTarComponent {
  dataSource:any=[];
  id:number = 0; 
  tar: Tarjeta = {
    idTarjeta:0, 
    idUser:0,
    numeroTarjeta:'',
    numTarEncryp:'',
    nombreTarjeta:'',
    mesVencimiento:'',
    annioVencimiento:'',
    ccv:'',
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
    private tarjeta: ProyectoApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 3){
      this.router.navigate(['/home']);
    }	
    this.obtenerIdTarjeta();
  }

  obtenerIdTarjeta() {
    const idTarjeta = this.route.snapshot.params['id'];
    this.tar.idTarjeta = Number(idTarjeta);
    this.id = Number(idTarjeta);
    console.log(this.id);
    
    this.tarjeta.obtenerTarjeta(this.id).subscribe({
      next: (response: Tarjeta[]) => {
        this.dataSource = response;
        this.tar.idUser = this.dataSource.idTarjeta;       
        this.tar.numeroTarjeta = this.dataSource.numeroTarjeta;
        this.tar.nombreTarjeta = this.dataSource.nombreTarjeta;
        this.tar.mesVencimiento = this.dataSource.mesVencimiento;
        this.tar.annioVencimiento = this.dataSource.annioVencimiento;        
      },
      error: (error) => console.log(error)
    });
  }

  editar() {
    this.tarjeta.editarTarjeta(this.tar).subscribe(
      () => {
        console.log('Tarjeta editada correctamente');
        this.router.navigate(['verTarjetas']);
      },
      error => {
        console.error('Error al editar la tarjeta:', error);
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
