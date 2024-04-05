import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarTarComponent } from 'src/app/modulos/tarjetas/agregar-tar/agregar-tar.component';
import { EditarTarComponent } from 'src/app/modulos/tarjetas/editar-tar/editar-tar.component';
import { TarjetasComponent } from 'src/app/modulos/tarjetas/tarjetas/tarjetas.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AgregarTarComponent,
    EditarTarComponent,
    TarjetasComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  exports: [
    AgregarTarComponent,
    EditarTarComponent,
    TarjetasComponent,
  ]
})
export class TarjetasMModule { }
