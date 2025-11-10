import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogList } from './blog-list';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, BlogList, RouterModule.forChild([{ path: '', component: BlogList }])],
})
export class BlogListModule {}
