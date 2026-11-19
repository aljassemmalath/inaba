import { Routes } from '@angular/router';

export const SERVICES_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  {
    path: 'products',
    children: [
      { path: '', loadComponent: () => import('./products/pages/products/products').then((m) => m.ProductsPageComponent), title: 'المنتجات' },
      { path: ':id', loadComponent: () => import('./products/pages/product-details/product-details.component').then((m) => m.ProductDetailsComponent), title: 'تفاصيل المنتج' },
    ],
  },
  { path: 'beneficiaries', loadComponent: () => import('./beneficiaries/pages/beneficiaries/beneficiaries').then((m) => m.BeneficiariesPageComponent), title: 'المستفيدون' },
];