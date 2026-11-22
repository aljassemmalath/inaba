import { AgenciesReportRow, EntitlementsReportRow, ExecutorsReportRow, OrdersReportRow, ProductsReportRow, ProfitsReportRow, ReportCard, SupervisorsReportRow } from '../models/report.model';

export const REPORTS_CARDS: ReportCard[] = [
  { key: 'requests', title: 'تقرير الطلبات', description: 'متابعة حجم الطلبات وحالاتها ومعدلات الإنجاز خلال فترة محددة.', category: 'التشغيل', categoryTone: 'primary', iconSrc: 'assets/images/svg/Reports/orders.svg' },
  { key: 'products', title: 'تقرير المنتجات', description: 'متابعة أداء المنتجات والخدمات من حيث عدد الطلبات والمبيعات وصافي الربح لكل منتج.', category: 'التشغيل', categoryTone: 'primary', iconSrc: 'assets/images/svg/Reports/products.svg' },
  { key: 'executors', title: 'تقرير المنفذين', description: 'متابعة الأداء التشغيلي للمنفذين ومؤشرات الإنجاز والتأخير والرفض.', category: 'الأداء', categoryTone: 'warning', iconSrc: 'assets/images/svg/Reports/executers.svg' },
  { key: 'supervisors', title: 'تقرير المشرفين', description: 'متابعة حجم الفريق التابع لكل مشرف وملخص أداء المنفذين المرتبطين به.', category: 'الأداء', categoryTone: 'warning', iconSrc: 'assets/images/svg/Reports/supervisors.svg' },
  { key: 'agencies', title: 'تقرير الوكالات', description: 'متابعة نشاط الوكالات وعدد طلباتها وحالات الإنجاز خلال الفترة.', category: 'الشركاء', categoryTone: 'success', iconSrc: 'assets/images/svg/Reports/agencies.svg' },
  { key: 'dues', title: 'تقرير المستحقات', description: 'ملخص المستحقات المرتبطة بالطلبات والمنفذين وحركة التسويات.', category: 'الماليات', categoryTone: 'info', iconSrc: 'assets/images/svg/Reports/dues.svg' },
  { key: 'profits', title: 'تقرير الأرباح', description: 'ملخص الإيرادات والتكاليف وصافي الربح على مستوى الفترة والمنتجات.', category: 'الماليات', categoryTone: 'info', iconSrc: 'assets/images/svg/Reports/profit.svg' },
];

export const ORDERS_REPORT_ROWS: OrdersReportRow[] = [
  { id: '4783287', createdAt: '2025/10/01', source: 'تطبيق الجوال', currentExecutor: 'سعد المالكي', status: 'قيد التنفيذ', statusTone: 'info', product: 'عمرة بالإنابة', beneficiary: 'فاطمة أحمد', requestNumber: '4783287' },
  { id: '4783286', createdAt: '2025/09/28', source: 'موقع الويب', currentExecutor: '—', status: 'بانتظار الإسناد', statusTone: 'warning', product: 'حج مفرد', beneficiary: 'سلمان العتيبي', requestNumber: '4783286' },
  { id: '4783280', createdAt: '2025/09/20', source: 'خدمة العملاء', currentExecutor: 'خالد الدوسري', status: 'مكتمل', statusTone: 'success', product: 'عمرة بالإنابة', beneficiary: 'سارة الحربي', requestNumber: '4783280' },
  { id: '4783284', createdAt: '2025/10/05', source: 'تطبيق الجوال', currentExecutor: 'عمر القحطاني', status: 'مُسند', statusTone: 'info', product: 'عمرة بالإنابة', beneficiary: 'خالد الدوسري', requestNumber: '4783284' },
];

export const PRODUCTS_REPORT_ROWS: ProductsReportRow[] = [
  { id: 'p1', product: 'عمرة بالإنابة', totalOrders: 420, completedOrders: 380, delayedOrders: 12, totalSales: '₪ 147,000', executorDues: '₪ 84,000', profit: '₪ 63,000', salePrice: '₪ 350', expectedDuration: '6 ساعات', activeStatus: 'نشط' },
  { id: 'p2', product: 'حج مفرد', totalOrders: 150, completedOrders: 120, delayedOrders: 8, totalSales: '₪ 180,000', executorDues: '₪ 127,500', profit: '₪ 52,500', salePrice: '₪ 1,200', expectedDuration: '3 أيام', activeStatus: 'نشط' },
  { id: 'p3', product: 'طواف بالإنابة', totalOrders: 260, completedOrders: 240, delayedOrders: 5, totalSales: '₪ 52,000', executorDues: '₪ 31,200', profit: '₪ 20,800', salePrice: '₪ 200', expectedDuration: '3 ساعات', activeStatus: 'نشط' },
];

export const EXECUTORS_REPORT_ROWS: ExecutorsReportRow[] = [
  { id: 'e1', executor: 'سعد المالكي', dutyStatus: 'مشغول', dutyTone: 'warning', completedOrders: 34, delayedOrders: 2, avgExecutionTime: '5س 20د', assignmentRejections: 1, netDues: '₪ 4,250' },
  { id: 'e2', executor: 'ماجد الحربي', dutyStatus: 'مُتاح', dutyTone: 'success', completedOrders: 28, delayedOrders: 1, avgExecutionTime: '6س 05د', assignmentRejections: 0, netDues: '₪ 3,100' },
  { id: 'e3', executor: 'خالد الدوسري', dutyStatus: 'خارج الدوام', dutyTone: 'neutral', completedOrders: 41, delayedOrders: 3, avgExecutionTime: '5س 50د', assignmentRejections: 2, netDues: '₪ 5,600' },
];

export const SUPERVISORS_REPORT_ROWS: SupervisorsReportRow[] = [
  { id: 's1', supervisor: 'أحمد السالم', linkedExecutors: 8, completed: 120, delayed: 6, avgExecutionTime: '5س 40د' },
  { id: 's2', supervisor: 'سارة الحربي', linkedExecutors: 6, completed: 95, delayed: 3, avgExecutionTime: '6س 10د' },
  { id: 's3', supervisor: 'نورة القحطاني', linkedExecutors: 5, completed: 78, delayed: 4, avgExecutionTime: '5س 55د' },
];

export const AGENCIES_REPORT_ROWS: AgenciesReportRow[] = [
  { id: 'a1', agency: 'وكالة النقل السريع', totalOrders: 124, completedOrders: 98, inProgressOrders: 18, delayedOrders: 8, status: 'نشطة', statusTone: 'success' },
  { id: 'a2', agency: 'وكالة المدار', totalOrders: 86, completedOrders: 70, inProgressOrders: 9, delayedOrders: 7, status: 'نشطة', statusTone: 'success' },
  { id: 'a3', agency: 'الوكالة الوطنية', totalOrders: 53, completedOrders: 40, inProgressOrders: 0, delayedOrders: 13, status: 'معلقة', statusTone: 'warning' },
];

export const ENTITLEMENTS_REPORT_ROWS: EntitlementsReportRow[] = [
  { id: 'd1', executor: 'سعد المالكي', completedOrders: 12, orderDues: '₪ 5,400', netAdjustments: '₪ 0', finalTotal: '₪ 5,400' },
  { id: 'd2', executor: 'ماجد الحربي', completedOrders: 8, orderDues: '₪ 6,800', netAdjustments: '- ₪ 50', finalTotal: '₪ 6,750' },
  { id: 'd4', executor: 'عمر القحطاني', completedOrders: 10, orderDues: '₪ 4,500', netAdjustments: '+ ₪ 30', finalTotal: '₪ 4,530' },
];

export const PROFITS_REPORT_ROWS: ProfitsReportRow[] = [
  { id: 'p1', product: 'عمرة بالإنابة', completedOrders: 380, totalSales: '₪ 133,000', executorDues: '₪ 76,000', profit: '₪ 57,000' },
  { id: 'p2', product: 'حج مفرد', completedOrders: 120, totalSales: '₪ 144,000', executorDues: '₪ 102,000', profit: '₪ 42,000' },
  { id: 'p3', product: 'طواف بالإنابة', completedOrders: 240, totalSales: '₪ 48,000', executorDues: '₪ 28,800', profit: '₪ 19,200' },
];

export const REPORT_META: Record<string, { title: string; description: string }> = {
  requests: { title: 'تقرير الطلبات', description: 'متابعة الطلبات وحالاتها ومصادرها خلال الفترة المحددة.' },
  products: { title: 'تقرير المنتجات', description: 'متابعة أداء المنتجات والمبيعات والمستحقات والأرباح.' },
  executors: { title: 'تقرير المنفذين', description: 'متابعة أداء المنفذين وحالات الدوام والإنجاز والمستحقات.' },
  supervisors: { title: 'تقرير المشرفين', description: 'متابعة المشرفين وأعداد المنفذين والإنجاز والتأخير.' },
  agencies: { title: 'تقرير الوكالات', description: 'متابعة أداء الوكالات وحالات الطلبات المرتبطة بها.' },
  dues: { title: 'تقرير المستحقات', description: 'ملخص مستحقات المنفذين والتسويات والإجمالي النهائي.' },
  profits: { title: 'تقرير الأرباح', description: 'ملخص المبيعات ومستحقات المنفذين والأرباح حسب المنتج.' },
};