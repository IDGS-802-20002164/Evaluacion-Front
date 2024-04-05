import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviewComponent } from '../preview/preview.component';
import { GotopayComponent } from '../gotopay/gotopay.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    PreviewComponent,
    GotopayComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatRadioModule
  ],
  exports: [
    PreviewComponent,
    GotopayComponent,
  ]
})
export class CarritoMModule { }
