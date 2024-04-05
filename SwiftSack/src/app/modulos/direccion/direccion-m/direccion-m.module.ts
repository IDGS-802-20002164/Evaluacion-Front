import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarDirComponent } from 'src/app/modulos/direccion/agregar-dir/agregar-dir.component';
import { EditarDirComponent } from 'src/app/modulos/direccion/editar-dir/editar-dir.component';
import { DireccionComponent } from 'src/app/modulos/direccion/direcciones/direccion.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AgregarDirComponent,
    EditarDirComponent,
    DireccionComponent
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
    AgregarDirComponent,
    EditarDirComponent,
    DireccionComponent
  ]
})
export class DireccionMModule { }
