import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modulos/loginNG/login/login.component'; // Ajusta la ruta según la ubicación de tu archivo
import { ModificarComponent } from './modulos/usuarioNG/modificar/modificar.component'; // Importa el componente de modificación
import { RegistrarComponent } from './modulos/usuarioNG/registrar/registrar.component'; // Importa el componente de modificación

import { FinanzasComponent } from './modulos/finanzas/finanzas.component';

import { ProductosComponent } from './modulos/productosNg/productos/productos.component';
import { AgregarProductoComponent } from './modulos/productosNg/agregar-producto/agregar-producto.component';
import { AgregarStockComponent } from './modulos/productosNg/agregar-stock/agregar-stock.component';
import { EditarProductoComponent } from './modulos/productosNg/editar-producto/editar-producto.component';

import { DetalleComponent } from './modulos/detallePNG/detalle/detalle.component';
import { AgregarDetalleComponent } from './modulos/detallePNG/agregar-detalle/agregar-detalle.component';
import { EditarDetalleComponent } from './modulos/detallePNG/editar-detalle/editar-detalle.component';

import { AgregarComponent } from './modulos/proveedoresNg/agregar/agregar.component';
import { ProveedoresComponent } from './modulos/proveedoresNg/proveedores/proveedores.component';
import { EditarComponent } from './modulos/proveedoresNg/editar/editar.component';
import { MateriaPComponent } from './modulos/materiaPNg/materiaP/materia-p/materia-p.component';
import { EditarMPComponent } from './modulos/materiaPNg/editar/editar/editar.component';
import { AgregarMPComponent } from './modulos/materiaPNg/agregar/agregar/agregar.component';

import { TarjetasComponent } from './modulos/tarjetas/tarjetas/tarjetas.component';
import { AgregarTarComponent } from './modulos/tarjetas/agregar-tar/agregar-tar.component';
import { EditarTarComponent } from './modulos/tarjetas/editar-tar/editar-tar.component';
import { DireccionComponent } from './modulos/direccion/direcciones/direccion.component';
import { AgregarDirComponent } from './modulos/direccion/agregar-dir/agregar-dir.component';
import { EditarDirComponent } from './modulos/direccion/editar-dir/editar-dir.component';
import { HomeComponent } from './home/home.component';
import { PreviewComponent } from './modulos/carrito/preview/preview.component';
import { GotopayComponent } from './modulos/carrito/gotopay/gotopay.component';
import { CompraComponent } from './modulos/compra/compraProveedor/compra.component';

import { ProductosCComponent } from './modulos/productosC/productosC/productosC.component';
import { DetalleClienteComponent } from './modulos/productosC/detalle-cliente/detalle-cliente.component';
import { PedidosCComponent } from './modulos/pedidos/pedidos-c/pedidos-c.component';
import { PedidosMainCComponent } from './modulos/pedidos/pedidos-main-c/pedidos-main-c.component';
import { PedidosComponent } from './modulos/pedidos/pedidos/pedidos.component';
import { DetallePedidoComponent } from './modulos/pedidos/detalle-pedido/detalle-pedido.component';

const routes: Routes = [
  {path: '',redirectTo: '/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path:'finanzas',component: FinanzasComponent},
  {path:'Agregar', component: AgregarComponent},
  {path: 'verProveedores',component: ProveedoresComponent },
  {path: 'Editar/:id',component: EditarComponent },
  {path: 'verMateriaPrima',component: MateriaPComponent },
  {path: 'EditarMP/:id',component: EditarMPComponent },
  {path:'AgregarMP', component: AgregarMPComponent},
  {path: 'verTarjetas', component: TarjetasComponent},
  {path: 'AgregarTar', component: AgregarTarComponent},
  {path: 'EditarTar/:id', component: EditarTarComponent},
  {path: 'verDirecciones', component: DireccionComponent},
  {path: 'AgregarDir', component: AgregarDirComponent},
  {path: 'login', component: LoginComponent }, // Agrega esta línea para la ruta de inicio de sesión
  {path: 'modificar', component: ModificarComponent }, // Agrega esta línea para la ruta de modificación
  {path: 'registrar', component: RegistrarComponent },
  {path: 'PreviewCar', component: PreviewComponent},
  {path: 'GoToPay', component: GotopayComponent},

  {path: 'EditarDir/:id', component: EditarDirComponent},
  {path: 'verProductos', component: ProductosComponent},
  {path: 'AgregarProd', component: AgregarProductoComponent},
  {path: 'AgregarStock', component: AgregarStockComponent},
  {path: 'EditarProd/:id', component: EditarProductoComponent},
  {path: 'verDetalle/:id', component: DetalleComponent},
  {path: 'AgregarDetalle/:id', component: AgregarDetalleComponent},
  {path: 'EditarDetalle/:id', component: EditarDetalleComponent},
  {path: 'SurtirMP', component: CompraComponent},

  {path: 'verProductosC', component: ProductosCComponent},
  {path: 'verDetalleProducto/:id', component: DetalleClienteComponent},
  {path: 'MisPedidos', component:PedidosMainCComponent},
  {path: 'verDetallePedidoC/:id', component:PedidosCComponent},
  {path: 'Pedidos', component:PedidosComponent},
  {path: 'VerDetallePedido/:id', component:DetallePedidoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
