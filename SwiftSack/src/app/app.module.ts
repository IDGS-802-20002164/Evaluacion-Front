import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProveedoresComponent } from './modulos/proveedoresNg/proveedores/proveedores.component';
import { AgregarComponent } from './modulos/proveedoresNg/agregar/agregar.component';
import { EditarComponent } from './modulos/proveedoresNg/editar/editar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FinanzasComponent } from './modulos/finanzas/finanzas.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MaterialModule } from './material/material.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProveedoresFilterPipe } from './proveedores-filter.pipe';
import { MateriaPComponent } from './modulos/materiaPNg/materiaP/materia-p/materia-p.component';
import { MateriaPFilterPipe } from './materiaP-filter.pipe';
import { EditarMPComponent } from './modulos/materiaPNg/editar/editar/editar.component';
import { AgregarMPComponent } from './modulos/materiaPNg/agregar/agregar/agregar.component';

import { BrowserModule } from '@angular/platform-browser';

import { TarjetasMModule } from './modulos/tarjetas/tarjetas-m/tarjetas-m.module';
import { DireccionMModule } from './modulos/direccion/direccion-m/direccion-m.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './modulos/loginNG/login/login.component';
import { RegistrarComponent } from './modulos/usuarioNG/registrar/registrar.component';
import { ModificarComponent } from './modulos/usuarioNG/modificar/modificar.component';

import { ProductosComponent } from './modulos/productosNg/productos/productos.component';
import { ProductosFilterPipe } from './productos-filter.pipe';
import { EditarProductoComponent } from './modulos/productosNg/editar-producto/editar-producto.component';
import { AgregarProductoComponent } from './modulos/productosNg/agregar-producto/agregar-producto.component';
import { DetalleComponent } from './modulos/detallePNG/detalle/detalle.component';
import { AgregarDetalleComponent } from './modulos/detallePNG/agregar-detalle/agregar-detalle.component';
import { EditarDetalleComponent } from './modulos/detallePNG/editar-detalle/editar-detalle.component';
import { AgregarStockComponent } from './modulos/productosNg/agregar-stock/agregar-stock.component';

import { direccionFilterPipe } from './direccion-filter.pipe';
import { tarjetaFilterPipe } from './tarjeta-filter.pipe';

import { CarritoMModule } from './modulos/carrito/carrito-m/carrito-m.module';
import { CompraMModule } from './modulos/compra/compra-m/compra-m.module';

import { ProductosMModule } from './modulos/productosC/productos-m/productos-m.module';
import { PedidosMModule } from './modulos/pedidos/pedidos-m/pedidos-m.module';

@NgModule({
  declarations: [
    AppComponent,
    FinanzasComponent,
    MenuComponent,
    ProveedoresComponent,
    AgregarComponent,
    EditarComponent,
    ProveedoresFilterPipe,
    ProductosFilterPipe,
    MateriaPComponent,
    MateriaPFilterPipe,
    EditarMPComponent,
    AgregarMPComponent,
    HomeComponent,
    LoginComponent,
    RegistrarComponent,
    ModificarComponent,
    ProductosComponent,
    EditarProductoComponent,
    AgregarProductoComponent,
    DetalleComponent,
    AgregarDetalleComponent,
    EditarDetalleComponent,
    AgregarStockComponent,
    direccionFilterPipe,
    tarjetaFilterPipe
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    TarjetasMModule,
    DireccionMModule,
    CarritoMModule,
    CompraMModule,
    ProductosMModule,
    PedidosMModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
