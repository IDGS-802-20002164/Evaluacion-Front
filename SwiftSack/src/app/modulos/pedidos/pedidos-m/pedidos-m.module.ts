import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosCComponent } from '../pedidos-c/pedidos-c.component';
import { PedidosComponent } from '../pedidos/pedidos.component';
import { PedidosMainCComponent } from '../pedidos-main-c/pedidos-main-c.component';
import { DetallePedidoComponent } from '../detalle-pedido/detalle-pedido.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    PedidosCComponent,
    PedidosComponent,
    PedidosMainCComponent,
    DetallePedidoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule
  ],
  exports: [
    PedidosCComponent,
    PedidosComponent,
    PedidosMainCComponent,
    DetallePedidoComponent
  ]
})
export class PedidosMModule { }
