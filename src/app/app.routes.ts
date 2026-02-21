import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { ArticlePage } from './pages/article/article';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'article/:id', component: ArticlePage },
  { path: '**', redirectTo: '' },
];
