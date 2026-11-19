export interface NavChild {
  label: string;
  route: string;
  /** Reserved for future icon asset key; placeholder rendered for now. */
  iconKey?: string;
  exact?: boolean;
}

/** Section headings are non-clickable visual groupings; children are always visible nav links. */
export interface NavSection {
  label: string;
  children: NavChild[];
}

export const APP_NAVIGATION: NavSection[] = [
  {
    label: 'العمليات',
    children: [
      { label: 'الصفحة الرئيسية', route: '/operations/home', iconKey: 'home' },
      { label: 'يحتاج إجراء', route: '/operations/action', iconKey: 'action' },
      { label: 'الطلبات', route: '/operations/requests', iconKey: 'requests' },
      { label: 'المشاكل', route: '/operations/issues', iconKey: 'issues' },
    ],
  },
  {
    label: 'الأشخاص والجهات',
    children: [
      { label: 'المنفذون', route: '/people-organizations/executors', iconKey: 'executors' },
      { label: 'الوكالات', route: '/people-organizations/agencies', iconKey: 'agencies' },
      { label: 'المشرفون', route: '/people-organizations/supervisors', iconKey: 'supervisors' },
      { label: 'العملاء', route: '/people-organizations/clients', iconKey: 'clients' },
    ],
  },
  {
    label: 'الخدمات',
    children: [
      { label: 'المنتجات', route: '/services/products', iconKey: 'products' },
      { label: 'المستفيدون', route: '/services/beneficiaries', iconKey: 'beneficiaries' },
    ],
  },
  {
    label: 'المالية والتقارير',
    children: [
      { label: 'المستحقات', route: '/finance-reports/dues', iconKey: 'dues' },
      { label: 'التقارير', route: '/finance-reports/reports', iconKey: 'reports' },
    ],
  },
  {
    label: 'النظام',
    children: [
      { label: 'سجل التدقيق', route: '/system/audit-log', iconKey: 'audit-log' },
      { label: 'الحسابات الإدارية', route: '/system/admin-accounts', iconKey: 'admin-accounts' },
    ],
  },
];