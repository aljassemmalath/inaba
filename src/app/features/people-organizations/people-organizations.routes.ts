import { Routes } from '@angular/router';

export const PEOPLE_ORGANIZATIONS_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'executors' },
  {
    path: 'executors',
    children: [
      { path: '', loadComponent: () => import('./executors/pages/executors/executors').then((m) => m.ExecutorsPageComponent), title: 'المنفذون' },
      { path: ':id', loadComponent: () => import('./executors/pages/executor-details/executor-details.component').then((m) => m.ExecutorDetailsComponent), title: 'تفاصيل المنفذ' },
    ],
  },
  {
    path: 'agencies',
    children: [
      { path: '', loadComponent: () => import('./agencies/pages/agencies/agencies').then((m) => m.AgenciesPageComponent), title: 'الوكالات' },
      { path: ':id', loadComponent: () => import('./agencies/pages/agency-details/agency-details.component').then((m) => m.AgencyDetailsComponent), title: 'تفاصيل المكتب' },
    ],
  },
  { path: 'supervisors', loadComponent: () => import('./supervisors/pages/supervisors/supervisors').then((m) => m.SupervisorsPageComponent), title: 'المشرفون' },
  { path: 'clients', loadComponent: () => import('./clients/pages/clients/clients').then((m) => m.ClientsPageComponent), title: 'العملاء' },
];