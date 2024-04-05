import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

import { MatExpansionModule } from '@angular/material/expansion';
 
@NgModule({
    declarations:[],
    imports:[
      CommonModule
    ],
    exports:[
      MatButtonModule,
      NgFor,
      MatDividerModule,
      MatTableModule,
      MatSidenavModule,
      MatToolbarModule,
      MatListModule,
      MatIconModule ,
      MatExpansionModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule,
      MatSelectModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class MaterialModule{}