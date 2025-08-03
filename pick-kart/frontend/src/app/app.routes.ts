import { Routes } from '@angular/router';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { roleGuard } from './core/guard/role/role.guard';
import { HomeComponent } from './components/home/home.component';
import { UnauthorizedComponent } from './components/helper/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: 'userManagement',
    component: UserManagementComponent,
    canActivate: [roleGuard(['Admin'])],
  },
  {
    path: 'productManagement',
    component: ProductManagementComponent,
    canActivate: [roleGuard(['Admin', 'Seller'])],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
