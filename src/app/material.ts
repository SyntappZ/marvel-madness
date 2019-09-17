import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list'


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatGridListModule],
  exports: [MatButtonModule, MatCheckboxModule, MatGridListModule],
})
export class MaterialModule { }