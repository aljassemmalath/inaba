export interface DashboardStat {
  title: string;
  value: string;
  iconKey?: string;
  modifierClass: string;
}

export type AlertTone = 'gold' | 'info' | 'error';

export interface DashboardAlert {
  count: number;
  title: string;
  description: string;
  tone: AlertTone;
}

export interface FinancialSummaryItem {
  label: string;
  value: string;
  iconKey?: string;
  iconSrc?: string;
  modifierClass: string;
  isNetProfit?: boolean;
  showRiyal?: boolean;
}

export interface MonthlyOrdersGroup {
  month: string;
  seriesA: number;
  seriesB: number;
}

export type ProductTone = 'teal' | 'mint' | 'gold';

export interface ProductShare {
  percent: number;
  label: string;
  modifierClass: string;
  color: string;
  tone: ProductTone;
}

export interface LatestOrderRow extends Record<string, unknown> {
  id: string;
  orderNumber: string;
  beneficiary: string;
  product: string;
  status: string;
  statusTone: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export const DASHBOARD_STATS: DashboardStat[] = [
  { title: 'إجمالي الطلبات', value: '1,284', modifierClass: 'stat-card-total' },
  { title: 'طلبات بانتظار الإسناد', value: '17', modifierClass: 'stat-card-pending' },
  { title: 'طلبات مكتملة', value: '942', modifierClass: 'stat-card-completed' },
  { title: 'طلبات قيد التنفيذ', value: '286', modifierClass: 'stat-card-in-progress' },
  { title: 'مشاكل مفتوحة', value: '9', modifierClass: 'stat-card-issues' },
];

export const DASHBOARD_ALERTS: DashboardAlert[] = [
  { count: 17, title: 'طلب بانتظار الإسناد', description: 'لم يتم اختيار منفذ لها بعد', tone: 'gold' },
  { count: 6, title: 'طلبات متأخرة عن الموعد', description: 'تجاوزت المدة المحددة دون تحديث حالة', tone: 'info' },
  { count: 4, title: 'مستندات بانتظار المراجعة', description: 'تحتاج إلى تحقق قبل اعتماد الطلب', tone: 'error' },
];

export const FINANCIAL_SUMMARY: FinancialSummaryItem[] = [
  { label: 'المبيعات', value: '248,500', modifierClass: 'finance-sales', iconSrc: 'assets/images/svg/Buttons/sales.svg', showRiyal: true },
  { label: 'مستحقات المنفذين', value: '173,200', modifierClass: 'finance-dues', iconSrc: 'assets/images/svg/Buttons/executors earnings.svg', showRiyal: true },
  { label: 'صافي الربح', value: '75,300', modifierClass: 'finance-profit', isNetProfit: true, iconSrc: 'assets/images/svg/Buttons/net profit.svg' },
];

export const MONTHLY_ORDERS: MonthlyOrdersGroup[] = [
  { month: 'ديسمبر', seriesA: 42, seriesB: 28 },
  { month: 'نوفمبر', seriesA: 55, seriesB: 34 },
  { month: 'أكتوبر', seriesA: 48, seriesB: 31 },
  { month: 'سبتمبر', seriesA: 61, seriesB: 39 },
  { month: 'أغسطس', seriesA: 52, seriesB: 36 },
  { month: 'يوليو', seriesA: 47, seriesB: 29 },
  { month: 'يونيو', seriesA: 58, seriesB: 41 },
  { month: 'مايو', seriesA: 63, seriesB: 44 },
  { month: 'أبريل', seriesA: 50, seriesB: 33 },
  { month: 'مارس', seriesA: 66, seriesB: 46 },
  { month: 'فبراير', seriesA: 44, seriesB: 27 },
  { month: 'يناير', seriesA: 39, seriesB: 24 },
];

export const PRODUCT_SHARES: ProductShare[] = [
  { percent: 55, label: 'عمرة بالإنابة', modifierClass: 'product-umrah', color: 'var(--action-primary-default)', tone: 'teal' },
  { percent: 20, label: 'حج مفرد', modifierClass: 'product-hajj', color: 'var(--mint-500)', tone: 'mint' },
  { percent: 20, label: 'طواف بالإنابة', modifierClass: 'product-tawaf', color: 'var(--gold-500)', tone: 'gold' },
];

export const ORDERS_BY_PRODUCT_TOTAL = 320;

export const LATEST_ORDERS: LatestOrderRow[] = [
  { id: '1', orderNumber: 'ORD-7842', beneficiary: 'عبدالله محمد', product: 'عمرة بالإنابة', status: 'قيد التنفيذ', statusTone: 'info' },
  { id: '2', orderNumber: 'ORD-7841', beneficiary: 'سلمان العتيبي', product: 'حج مفرد', status: 'مكتمل', statusTone: 'success' },
  { id: '3', orderNumber: 'ORD-7840', beneficiary: 'فهد القحطاني', product: 'طواف بالإنابة', status: 'بانتظار الإسناد', statusTone: 'warning' },
  { id: '4', orderNumber: 'ORD-7839', beneficiary: 'ناصر الدوسري', product: 'عمرة بالإنابة', status: 'قيد التنفيذ', statusTone: 'info' },
  { id: '5', orderNumber: 'ORD-7838', beneficiary: 'خالد الحربي', product: 'عمرة بالإنابة', status: 'ملغي', statusTone: 'error' },
];
