import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { ArticlePage } from './pages/article/article';
import { PrivacyPage } from './pages/privacy/privacy';
import { TermsPage } from './pages/terms/terms';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'article/:id', component: ArticlePage },
  { path: 'privacy', component: PrivacyPage },
  { path: 'terms', component: TermsPage },
  { path: '**', redirectTo: '' },
];
