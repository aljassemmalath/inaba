import { Routes } from '@angular/router';

export const SYSTEM_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'audit-log' },
  { path: 'audit-log', loadComponent: () => import('./audit-log/pages/audit-log/audit-log').then((m) => m.AuditLogPageComponent), title: 'سجل التدقيق' },
  { path: 'admin-accounts', loadComponent: () => import('./admin-accounts/pages/admin-accounts/admin-accounts').then((m) => m.AdminAccountsPageComponent), title: 'الحسابات الإدارية' },
];