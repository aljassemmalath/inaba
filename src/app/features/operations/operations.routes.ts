import { Routes } from '@angular/router';

export const OPERATIONS_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () =>
      import('../dashboard/pages/home/home.component').then((m) => m.HomeComponent),
    title: 'الصفحة الرئيسية',
  },
  {
    path: 'action',
    loadComponent: () =>
      import('./pages/needs-action/needs-action.component').then((m) => m.NeedsActionComponent),
    title: 'يحتاج إجراء',
  },
  {
    path: 'requests',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/requests-list/requests-list.component').then((m) => m.RequestsListComponent),
        title: 'قائمة الطلبات',
      },
      {
        path: 'new',
        loadComponent: () =>
          import('../requests/new-order/new-order.component').then((m) => m.NewOrderComponent),
        title: 'إضافة طلب جديد',
      },
      {
        path: 'import',
        loadComponent: () =>
          import('../requests/import-orders/import-orders.component').then((m) => m.ImportOrdersComponent),
        title: 'استيراد الطلبات',
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/request-details/request-details.component').then((m) => m.RequestDetailsComponent),
        title: 'تفاصيل الطلب',
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'stages' },
          { path: 'stages', loadComponent: () => import('./pages/request-details/tabs/stages-tab.component').then((m) => m.RdStagesTabComponent), title: 'مراحل وأدلة' },
          { path: 'timeline', loadComponent: () => import('./pages/request-details/tabs/timeline-tab.component').then((m) => m.RdTimelineTabComponent), title: 'الجدول الزمني' },
          { path: 'assignments', loadComponent: () => import('./pages/request-details/tabs/assignments-tab.component').then((m) => m.RdAssignmentsTabComponent), title: 'سجل الإسناد' },
          { path: 'notes', loadComponent: () => import('./pages/request-details/tabs/notes-tab.component').then((m) => m.RdNotesTabComponent), title: 'ملاحظات داخلية' },
          { path: 'issues', loadComponent: () => import('./pages/request-details/tabs/issues-tab.component').then((m) => m.RdIssuesTabComponent), title: 'المشاكل المرتبطة' },
        ],
      },
    ],
  },
  {
    path: 'issues',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/problems/problems.component').then((m) => m.ProblemsComponent),
        title: 'المشاكل',
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/problem-details/problem-details.component').then((m) => m.ProblemDetailsComponent),
        title: 'تفاصيل المشكلة',
      },
    ],
  },
  {
    path: ':tab',
    loadComponent: () =>
      import('./pages/operations/operations').then((m) => m.OperationsPageComponent),
    title: 'العمليات',
  },
];
