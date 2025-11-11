import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'blogs',
    loadComponent: () => import('./pages/blog-list/blog-list').then((m) => m.BlogList),
  },
  {
    path: 'blog/:id',
    loadComponent: () => import('./pages/blog-detail/blog-detail').then((m) => m.BlogDetail),
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/create-blog/create-blog').then((m) => m.CreateBlog),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
