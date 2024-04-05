import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoSS } from 'src/app/interfaces/swiftsack';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  dataSource:any=[];
  id:number = 0;
  regProducto: ProductoSS = {
    id:0,
    nombre:'',
    descripcion: '',
    costo:0,
    foto:'',
    tipo_producto:'',
    receta:'',
    stock: 0
  }
  fotoPreviewUrl: string | null = null;


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
    private productoss: ProyectoApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 1 && this.usuario.roleId != 2){
      this.router.navigate(['/home']);
    }
    this.obtenerId();
  }

  obtenerFoto(){
    if(this.regProducto.foto)
      this.fotoPreviewUrl = `data:image/png;base64,${this.regProducto.foto}`;

  }

  obtenerId() {
    const idP = this.route.snapshot.params['id'];
    this.regProducto.id = Number(idP);
    this.id = Number(idP);
    this.productoss.obtenerProducto(this.id).subscribe({
      next: (response: ProductoSS[]) => {
        this.dataSource = response;
          this.regProducto.nombre = this.dataSource.nombre;
          this.regProducto.descripcion = this.dataSource.descripcion;
          this.regProducto.tipo_producto = this.dataSource.tipo_producto;
          this.regProducto.foto = this.dataSource.foto;
          this.regProducto.receta = this.dataSource.receta;
          this.regProducto.stock = this.dataSource.stock;
          this.regProducto.costo = this.dataSource.costo;
          this.obtenerFoto();

      },
      error: (error) => console.log(error)
    });
  }


  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Mostrar vista previa de la foto
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotoPreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      // Convertir la imagen a base64 y asignarla a regProducto.foto
      this.convertToBase64(file).then(base64 => {
        this.regProducto.foto = base64;
      });
    }
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64 = e.target.result.split(',')[1];
        resolve(base64);
      };
      reader.readAsDataURL(file);
    });
  }

  editar() {
    if (this.regProducto.costo >= 1) {
      this.productoss.editarProducto(this.regProducto).subscribe(
        () => {
          console.log('Producto editado correctamente');
          this.router.navigate(['verProductos']);
        },
        error => {
          console.error('Error al editar el producto:', error);
        }
      );
    } else {
      window.alert('El costo no puede ser negativo.');
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

}
