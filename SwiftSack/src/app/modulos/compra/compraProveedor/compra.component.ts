import { Component } from '@angular/core';
import { MateriaPSS, ProveedorSS } from 'src/app/interfaces/swiftsack';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { Compra, DetalleCompra } from 'src/app/interfaces/compra';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent {
  dataSource:any = [];
  total:number= 0;
  idCompra:number = 0;

  proveedores: ProveedorSS[] = [];
  materias: MateriaPSS[] = [];
  setMaterias:DetalleCompra[] = [];
  compra:Compra = {
    idCompra:0,
    fecha: new Date (),
    iduser: 0,
    idProveedor: 0,
    folio: '',
    estatus: 1,
  };

  regMateriaPss: MateriaPSS = {
    id: 0,
    nombre: '',
    cantidad: 0,
    unidad_medida: '',
    costo: 0,
    idProveedor: 0,
    estatus: true
  };

  setMateria:DetalleCompra = {
    id: 0,
    idCompra:0,
    idProducto:0,
    cantidad:0,
    precio:0,
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
    private materiapss: ProyectoApiService, 
    private proveedoress: ProyectoApiService,
    private router: Router) {
   }

  obtenerProveedores() {
    this.proveedoress.getProveedor().subscribe(
      {
        next: response => {
          this.proveedores = response; // Asigna directamente la respuesta a proveedores
        },
        error: error => console.log(error)
      }
    );
  }

  obtenerMateriaProveedor(idProveedor:number) {
    this.materiapss.getMateriaProveedor(idProveedor).subscribe(
      {
        next: response => {
          this.materias = response;
        },
        error: error => console.log(error)
      }
    );
  }

  obtenerMateria(idMateria: number) {
    const materiaEncontrada = this.materias.find(materia => materia.id === idMateria);
  
    if (materiaEncontrada) {
      this.regMateriaPss.nombre = materiaEncontrada.nombre;
    } else {
      console.log(`No se encontró una materia con id ${idMateria}`);
    }
  }
  
  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 1 && this.usuario.roleId != 2){
      this.router.navigate(['/home']);
    }
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
  
  setMateriaCompra() {
    const newRowData = {
        nombre: this.regMateriaPss.nombre,
        cantidad: this.setMateria.cantidad,
        precio: this.setMateria.precio,
        subtotal: this.setMateria.precio * this.setMateria.cantidad
    };

    this.dataSource.push(newRowData);

    this.calcularTotal();
    this.setMateria.idProducto = this.regMateriaPss.id;
    this.setMaterias.push(this.setMateria);
    console.log(this.setMaterias);
  }

  calcularTotal(){
    for (let i = 0; i < this.dataSource.length; i++) {
      this.total =+ this.dataSource[i].subtotal;
    }
  }


  insertarCompra() {
    const uniqueFolio: string = uuidv4();

    let compra:Compra = {
      idCompra:0,
      fecha: new Date (),
      iduser: this.usuario.id,
      idProveedor: this.regMateriaPss.idProveedor,
      folio: uniqueFolio,
      estatus: 1,
    };

    this.materiapss.addCompra(compra).subscribe(
      {
        next: response => {
          this.compra = response;
          this.insertDetalle(this.compra.idCompra);
          console.log('Orden de compra agregada correctamente');
        },
        error: (e) => console.error(e),
        complete: () => console.info('Compra completada')
      });

  }

  insertDetalle(idCompra: number) {
    this.setMaterias.forEach(element => {
      element.idCompra = idCompra;
      console.log(element);
      this.materiapss.addDetalleCompra(element).subscribe({
        next: () => {
          console.log('Detalle de compra agregado correctamente');
        },
        error: (e) => console.error(e),
        complete: () => console.info('Solicitud completada')
      });
    });
    console.log('Detalles de compra agregados correctamente');
    this.router.navigate(['verMateriaPrima']);
}


}
