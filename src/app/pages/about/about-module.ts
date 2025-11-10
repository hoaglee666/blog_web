import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { About } from './about';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, About, RouterModule.forChild([{ path: '', component: About }])],
})
export class AboutModule {}
