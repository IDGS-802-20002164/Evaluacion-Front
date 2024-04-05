import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ProductoSS } from 'src/app/interfaces/swiftsack';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent  {
  dataSource: ProductoSS[] = [];

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

  constructor(private productoss: ProyectoApiService,
    private router: Router
    ) { }

  agregar() {
    if (this.regProducto.costo >= 1) {
      this.productoss.agregarProducto(this.regProducto).subscribe({
        next: () => {
          console.log('Producto agregada correctamente');
          // Realizar la redirección después de que se complete la solicitud
          this.router.navigate(['verProductos']);
        },
        error: (e) => console.error(e),
        complete: () => console.info('Solicitud completada')
      });
    } else {
      window.alert('El costo no puede ser negativo.');
    }
      
    this.regProducto = {
      id:0,
      nombre:'',
      descripcion: '',
      costo:0,
      foto:'',
      tipo_producto:'',
      receta:'',
      stock: 0
    };
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

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 1 && this.usuario.roleId != 2){
      this.router.navigate(['/home']);
    }
  }

}
