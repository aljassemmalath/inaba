import { DueRow } from '../models/due.model';

export const DUES_SUMMARY = [
  { label: 'إجمالي المستحقات', value: '₪ 173,200', modifierClass: 'dues-total', iconSrc: '/assets/images/svg/Dues/all.svg' },
  { label: 'مستحقات الشهر الحالي', value: '₪ 48,750', modifierClass: 'dues-month', iconSrc: '/assets/images/svg/Dues/calendar.svg' },
  { label: 'جاهزة للدفع الخارجي', value: '₪ 31,400', modifierClass: 'dues-ready', iconSrc: '/assets/images/svg/Dues/checkmark-circle.svg' },
  { label: 'التسويات', value: '₪ 2,150', modifierClass: 'dues-adjustments', iconSrc: '/assets/images/svg/Dues/balance-scale.svg' },
];

export const DUES_MOCK: DueRow[] = [
  {
    id: 'd1', executor: 'سعد المالكي', productStage: 'عمرة بالإنابة / مكتمل', baseAmount: '₪ 450', netAdjustments: '₪ 0', finalDue: '₪ 450', completedOrders: 12,
    settlements: [{ id: 's1', amount: '₪ 0', type: 'لا توجد تسويات' }],
  },
  {
    id: 'd2', executor: 'ماجد الحربي', productStage: 'حج مفرد / مكتمل', baseAmount: '₪ 850', netAdjustments: '- ₪ 50', finalDue: '₪ 800', completedOrders: 8,
    settlements: [
      { id: 's1', amount: '- ₪ 50', type: 'خصم تأخير' },
    ],
  },
  {
    id: 'd3', executor: 'خالد الدوسري', productStage: 'طواف بالإنابة / مكتمل', baseAmount: '₪ 120', netAdjustments: '₪ 0', finalDue: '₪ 120', completedOrders: 5,
    settlements: [{ id: 's1', amount: '₪ 0', type: 'لا توجد تسويات' }],
  },
  {
    id: 'd4', executor: 'عمر القحطاني', productStage: 'عمرة بالإنابة / مكتمل', baseAmount: '₪ 450', netAdjustments: '+ ₪ 30', finalDue: '₪ 480', completedOrders: 10,
    settlements: [
      { id: 's1', amount: '+ ₪ 30', type: 'مكافأة أداء' },
    ],
  },
  {
    id: 'd5', executor: 'فهد العتيبي', productStage: 'عمرة بالإنابة / مكتمل', baseAmount: '₪ 450', netAdjustments: '₪ 0', finalDue: '₪ 450', completedOrders: 6,
    settlements: [{ id: 's1', amount: '₪ 0', type: 'لا توجد تسويات' }],
  },
];
