import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'operations' },
      {
        path: 'operations',
        loadChildren: () =>
          import('./features/operations/operations.routes').then((m) => m.OPERATIONS_ROUTES),
      },
      {
        path: 'people-organizations',
        loadChildren: () =>
          import('./features/people-organizations/people-organizations.routes').then(
            (m) => m.PEOPLE_ORGANIZATIONS_ROUTES,
          ),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('./features/services/services.routes').then((m) => m.SERVICES_ROUTES),
      },
      {
        path: 'finance-reports',
        loadChildren: () =>
          import('./features/finance-reports/finance-reports.routes').then(
            (m) => m.FINANCE_REPORTS_ROUTES,
          ),
      },
      {
        path: 'system',
        loadChildren: () => import('./features/system/system.routes').then((m) => m.SYSTEM_ROUTES),
      },
    ],
  },
  { path: '**', redirectTo: 'operations' },
];
