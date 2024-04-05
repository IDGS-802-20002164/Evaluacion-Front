import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriaPSS, ProveedorSS } from 'src/app/interfaces/swiftsack';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarMPComponent implements OnInit {
  dataSource:any=[];
  id:number = 0; 
  proveedores: ProveedorSS[] = [];
  regMateriaP: MateriaPSS = {
    id:0,
    nombre:'',
    cantidad:0,
    unidad_medida:'',
    costo:0,
    idProveedor:0,
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
    private materiaPss: ProyectoApiService,
    private router: Router,
    private route: ActivatedRoute,
    private proveedoress: ProyectoApiService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 1 && this.usuario.roleId != 2){
      this.router.navigate(['/home']);
    }
    this.obtenerIdAlumno();
    this.obtenerProveedores();
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
    const idMateria = this.route.snapshot.params['id'];
    this.regMateriaP.id = Number(idMateria);
    this.id = Number(idMateria);
    console.log(this.id);
    
    this.materiaPss.obtenerMP(this.id).subscribe({
      next: (response: MateriaPSS[]) => {
        this.dataSource = response;       
          this.regMateriaP.nombre = this.dataSource.nombre;
          this.regMateriaP.cantidad = this.dataSource.cantidad;
          this.regMateriaP.unidad_medida = this.dataSource.unidad_medida;
          this.regMateriaP.costo = this.dataSource.costo;
        
      },
      error: (error) => console.log(error)
    });
  }
  
  obtenerProveedores() {
    this.proveedoress.getProveedor().subscribe(
      {
        next: response => {
          this.dataSource = response;
          this.proveedores = response; // Asigna directamente la respuesta a proveedores
        },
        error: error => console.log(error)
      }
    );
  }
  

  editar() {
    this.materiaPss.editarMateria(this.regMateriaP).subscribe(
      () => {
        console.log('Materia Prima editado correctamente');
        this.router.navigate(['verMateriaPrima']);
      },
      error => {
        console.error('Error al editar la materia prima:', error);
      }
    );
  }

}
