import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBlog } from './create-blog';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, CreateBlog, RouterModule.forChild([{ path: '', component: CreateBlog }])],
})
export class CreateBlogModule {}
