import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetail } from './blog-detail';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, BlogDetail, RouterModule.forChild([{ path: '', component: BlogDetail }])],
})
export class BlogDetailModule {}
