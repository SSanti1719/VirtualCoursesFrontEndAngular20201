import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class StudentsModule { }
