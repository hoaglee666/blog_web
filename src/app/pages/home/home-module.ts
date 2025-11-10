import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './home';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, Home, RouterModule.forChild([{ path: '', component: Home }])],
})
export class HomeModule {}
