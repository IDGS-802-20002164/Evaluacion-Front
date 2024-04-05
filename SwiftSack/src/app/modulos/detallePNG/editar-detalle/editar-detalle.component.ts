import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MateriaPSS, DetalleProductoSS, DetalleCompleto } from 'src/app/interfaces/swiftsack';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-editar-detalle',
  templateUrl: './editar-detalle.component.html',
  styleUrls: ['./editar-detalle.component.css']
})
export class EditarDetalleComponent implements OnInit{
  id: number =0;
  dataSource: any = []
  dataSource1: any =  []
  regMateria: MateriaPSS = {
    id: 0,
    nombre: '',
    cantidad: 0,
    unidad_medida: '',
    costo: 0,
    idProveedor: 0,
    estatus: false
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

  regDetalleProducto: DetalleProductoSS = {
    id: 0,
    id_materia: 0,
    cantidad: 0,
    id_producto: 0
  };


  constructor(
    public materiaPss:ProyectoApiService,
    private router: Router,
    private route: ActivatedRoute
    ){}

    editar() {
      this.materiaPss.editarDetalle(this.regDetalleProducto).subscribe(
        () => {
          console.log('Detalle editado correctamente');
          this.router.navigate(['/verDetalle',  this.regDetalleProducto.id_producto]);
        },
        error => {
          console.error('Error al editar el detalle del producto:', error);
        }
      );
    }

  actualizarTabla(){
    const idP = this.route.snapshot.params['id'];
      this.regDetalleProducto.id = Number(idP);
      this.id = Number(idP);
      this.materiaPss.obtenerDetalle(idP).subscribe({
        next: (response: DetalleProductoSS[]) => {
        this.dataSource=response;
        this.regDetalleProducto.id = this.id;
        this.regDetalleProducto.id_materia = this.dataSource.id_materia;
        this.regDetalleProducto.id_producto = this.dataSource.id_producto;
        this.regDetalleProducto.cantidad = this.dataSource.cantidad;
        this.obtenerMateria( this.regDetalleProducto.id_materia);
        },
        error: error=>console.log(error)
      }


    );

  }

obtenerMateria(id: number){
  console.log(id)
  this.materiaPss.obtenerMP(id).subscribe({
    next: (materia: MateriaPSS[]) => {
      this.dataSource1 = materia;
      console.log(materia)
      this.regMateria.id = id;
      this.regMateria.nombre = this.dataSource1.nombre;
      this.regMateria.unidad_medida = this.dataSource1.unidad_medida;

    }
  }
  );
}

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 1 && this.usuario.roleId != 2){
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
