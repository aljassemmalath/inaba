import { OperationRow, OperationTab } from '../models/operations.model';

export const OPERATIONS_MOCK: Record<OperationTab, OperationRow[]> = {
  action: [
    { id: '1', reference: 'ACT-1024', title: 'مراجعة مستندات وكالة النقل', entity: 'وكالة النقل السريع', assignee: 'سارة الحربي', date: '1447/11/08', statusLabel: 'بانتظار المراجعة', statusTone: 'warning', priorityLabel: 'عالية', priorityTone: 'error' },
    { id: '2', reference: 'ACT-1025', title: 'اعتماد تحديث بيانات منفذ', entity: 'محمد العتيبي', assignee: 'أحمد السالم', date: '1447/11/07', statusLabel: 'يحتاج إجراء', statusTone: 'info', priorityLabel: 'متوسطة', priorityTone: 'warning' },
    { id: '3', reference: 'ACT-1026', title: 'التحقق من مستحقات متأخرة', entity: 'قسم المالية', assignee: 'نورة القحطاني', date: '1447/11/07', statusLabel: 'قيد المعالجة', statusTone: 'info', priorityLabel: 'عالية', priorityTone: 'error' },
    { id: '4', reference: 'ACT-1027', title: 'موافقة على طلب تسجيل عميل', entity: 'شركة آفاق', assignee: 'سارة الحربي', date: '1447/11/06', statusLabel: 'بانتظار الاعتماد', statusTone: 'warning', priorityLabel: 'منخفضة', priorityTone: 'neutral' },
    { id: '5', reference: 'ACT-1028', title: 'مراجعة شكوى خدمة مستفيد', entity: 'خدمة التوصيل', assignee: 'خالد المالكي', date: '1447/11/06', statusLabel: 'يحتاج إجراء', statusTone: 'info', priorityLabel: 'متوسطة', priorityTone: 'warning' },
    { id: '6', reference: 'ACT-1029', title: 'تأكيد اكتمال الربط التشغيلي', entity: 'الوكالة الوطنية', assignee: 'أحمد السالم', date: '1447/11/05', statusLabel: 'بانتظار الرد', statusTone: 'warning', priorityLabel: 'عالية', priorityTone: 'error' },
  ],
  requests: [
    { id: '1', reference: 'REQ-2041', title: 'طلب تفعيل حساب منفذ جديد', entity: 'عبدالله الغامدي', assignee: 'سارة الحربي', date: '1447/11/08', statusLabel: 'جديد', statusTone: 'info', priorityLabel: 'متوسطة', priorityTone: 'warning' },
    { id: '2', reference: 'REQ-2042', title: 'طلب تحديث بيانات وكالة', entity: 'وكالة المدار', assignee: 'نورة القحطاني', date: '1447/11/08', statusLabel: 'قيد المراجعة', statusTone: 'warning', priorityLabel: 'منخفضة', priorityTone: 'neutral' },
    { id: '3', reference: 'REQ-2043', title: 'طلب إضافة منتج خدمة', entity: 'إدارة الخدمات', assignee: 'خالد المالكي', date: '1447/11/07', statusLabel: 'مكتمل', statusTone: 'success', priorityLabel: 'متوسطة', priorityTone: 'warning' },
    { id: '4', reference: 'REQ-2044', title: 'طلب صلاحيات مشرف منطقة', entity: 'فهد الدوسري', assignee: 'أحمد السالم', date: '1447/11/07', statusLabel: 'قيد الاعتماد', statusTone: 'warning', priorityLabel: 'عالية', priorityTone: 'error' },
    { id: '5', reference: 'REQ-2045', title: 'طلب تعديل مستفيد', entity: 'مستفيدو الرياض', assignee: 'سارة الحربي', date: '1447/11/06', statusLabel: 'مرفوض', statusTone: 'error', priorityLabel: 'منخفضة', priorityTone: 'neutral' },
    { id: '6', reference: 'REQ-2046', title: 'طلب تقرير تشغيلي شهري', entity: 'إدارة العمليات', assignee: 'نورة القحطاني', date: '1447/11/05', statusLabel: 'مكتمل', statusTone: 'success', priorityLabel: 'متوسطة', priorityTone: 'warning' },
    { id: '7', reference: 'REQ-2047', title: 'طلب ربط عميل جديد', entity: 'شركة مسار', assignee: 'خالد المالكي', date: '1447/11/05', statusLabel: 'جديد', statusTone: 'info', priorityLabel: 'عالية', priorityTone: 'error' },
  ],
  issues: [
    { id: '1', reference: 'ISS-3011', title: 'تأخر مزامنة حالات الطلبات', entity: 'نظام التكامل', assignee: 'فريق التقنية', date: '1447/11/08', statusLabel: 'مفتوحة', statusTone: 'error', priorityLabel: 'حرجة', priorityTone: 'error' },
    { id: '2', reference: 'ISS-3012', title: 'خطأ في عرض بيانات المستحقات', entity: 'وحدة المالية', assignee: 'نورة القحطاني', date: '1447/11/07', statusLabel: 'قيد المعالجة', statusTone: 'warning', priorityLabel: 'عالية', priorityTone: 'error' },
    { id: '3', reference: 'ISS-3013', title: 'تعذر إشعار بعض المشرفين', entity: 'خدمة الإشعارات', assignee: 'أحمد السالم', date: '1447/11/07', statusLabel: 'قيد التحقق', statusTone: 'info', priorityLabel: 'متوسطة', priorityTone: 'warning' },
    { id: '4', reference: 'ISS-3014', title: 'ازدواجية في سجلات الوكالات', entity: 'إدارة الوكالات', assignee: 'سارة الحربي', date: '1447/11/06', statusLabel: 'تم الحل', statusTone: 'success', priorityLabel: 'متوسطة', priorityTone: 'warning' },
    { id: '5', reference: 'ISS-3015', title: 'بطء في تحميل صفحة التقارير', entity: 'وحدة التقارير', assignee: 'فريق التقنية', date: '1447/11/05', statusLabel: 'مفتوحة', statusTone: 'error', priorityLabel: 'منخفضة', priorityTone: 'neutral' },
  ],
};

export const TAB_LABELS: Record<OperationTab, string> = {
  action: 'يحتاج إجراء',
  requests: 'الطلبات',
  issues: 'المشاكل',
};
