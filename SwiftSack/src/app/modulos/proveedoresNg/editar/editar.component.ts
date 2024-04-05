import { Component, OnInit } from '@angular/core';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProveedorSS } from 'src/app/interfaces/swiftsack';
import { UsuarioMod } from 'src/app/interfaces/usuario';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  dataSource:any=[];
  id:number = 0; 
  regProveedor: ProveedorSS = {
    id:0,
    nombre:'',
    empresa:'',
    telefono:'',
    rfc:'',
    email:'',
    estatus:true
  }

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
    private proveedorss: ProyectoApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 1){
      this.router.navigate(['/home']);
    }
    this.obtenerIdAlumno();
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

  obtenerIdAlumno() {
    const idProveedor = this.route.snapshot.params['id'];
    this.regProveedor.id = Number(idProveedor);
    this.id = Number(idProveedor);
    console.log(this.id);
    
    this.proveedorss.obtenerProveedor(this.id).subscribe({
      next: (response: ProveedorSS[]) => {
        this.dataSource = response;       
        this.regProveedor.nombre = this.dataSource.nombre;
        this.regProveedor.empresa = this.dataSource.empresa;
        this.regProveedor.telefono = this.dataSource.telefono;
        this.regProveedor.rfc = this.dataSource.rfc;
        this.regProveedor.email = this.dataSource.email;
        
      },
      error: (error) => console.log(error)
    });
  }

  editar() {
    this.proveedorss.editarProveedor(this.regProveedor).subscribe(
      () => {
        console.log('Proveedor editado correctamente');
        this.router.navigate(['verProveedores']);
      },
      error => {
        console.error('Error al editar el proveedor:', error);
      }
    );
  }
}
