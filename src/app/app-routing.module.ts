import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'see-data',
    loadChildren: () => import('./pages/see-data/see-data/see-data.module').then( m => m.SeeDataPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sing-up',
    loadChildren: () => import('./pages/auth/login/sing-up/sing-up.module').then( m => m.SingUpPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
