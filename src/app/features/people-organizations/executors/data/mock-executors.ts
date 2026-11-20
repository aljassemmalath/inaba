import { ExecutorRow } from '../models/executor.model';

export const EXECUTORS_SUMMARY = [
  { label: 'إجمالي المنفذين', value: 48, hint: '', modifierClass: 'exec-total', iconSrc: 'assets/images/svg/Executers/all.svg' },
  { label: 'مُتاح', value: 19, hint: '(يمكن إسناد طلب جديد)', modifierClass: 'exec-available', iconSrc: 'assets/images/svg/Executers/available.svg' },
  { label: 'مشغول', value: 22, hint: '(لديه طلب جارٍ)', modifierClass: 'exec-busy', iconSrc: 'assets/images/svg/Executers/busy.svg' },
  { label: 'خارج الدوام', value: 5, hint: '(غير متاح للإسناد)', modifierClass: 'exec-offduty', iconSrc: 'assets/images/svg/Executers/off.svg' },
  { label: 'معطل', value: 2, hint: '(لا يستطيع الدخول)', modifierClass: 'exec-disabled', iconSrc: 'assets/images/svg/Executers/disabled.svg' },
];

export const EXECUTORS_MOCK: ExecutorRow[] = [
  { id: 'e1', executor: 'سعد المالكي', supervisor: 'أحمد السالم', dutyStatus: 'مشغول', dutyTone: 'warning', currentRequest: '#4783287', completed: 34, dues: '₪ 4,250' },
  { id: 'e2', executor: 'ماجد الحربي', supervisor: 'سارة الحربي', dutyStatus: 'مُتاح', dutyTone: 'success', currentRequest: '—', completed: 28, dues: '₪ 3,100' },
  { id: 'e3', executor: 'خالد الدوسري', supervisor: 'أحمد السالم', dutyStatus: 'خارج الدوام', dutyTone: 'neutral', currentRequest: '—', completed: 41, dues: '₪ 5,600' },
  { id: 'e4', executor: 'عمر القحطاني', supervisor: 'نورة القحطاني', dutyStatus: 'مشغول', dutyTone: 'warning', currentRequest: '#4783282', completed: 19, dues: '₪ 2,450' },
  { id: 'e5', executor: 'فهد العتيبي', supervisor: 'سارة الحربي', dutyStatus: 'معطل', dutyTone: 'error', currentRequest: '—', completed: 12, dues: '₪ 900' },
];
