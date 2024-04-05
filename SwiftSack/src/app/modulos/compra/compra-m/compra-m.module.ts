import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { CommonModule } from '@angular/common';
import { CompraComponent } from '../compraProveedor/compra.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CompraComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MatInputModule,
    NgFor,
    MatSelectModule,
    MatFormFieldModule,
    RouterModule
  ],
  exports: [
    CompraComponent
  ]
})
export class CompraMModule { }
