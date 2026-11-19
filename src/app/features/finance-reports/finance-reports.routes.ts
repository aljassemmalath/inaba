import { Routes } from '@angular/router';

export const FINANCE_REPORTS_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dues' },
  {
    path: 'dues',
    children: [
      { path: '', loadComponent: () => import('./dues/pages/dues/dues').then((m) => m.DuesPageComponent), title: 'المستحقات' },
      { path: ':id', loadComponent: () => import('./dues/pages/entitlements-details/entitlements-details.component').then((m) => m.EntitlementsDetailsComponent), title: 'تفاصيل المستحقات' },
    ],
  },
  { path: 'reports/:key', loadComponent: () => import('./reports/pages/report-view/report-view').then((m) => m.ReportViewPageComponent), title: 'عرض التقرير' },
  { path: 'reports', loadComponent: () => import('./reports/pages/reports/reports').then((m) => m.ReportsPageComponent), title: 'التقارير' },
];