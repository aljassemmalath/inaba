export type RequestSourceType = 'agency' | 'individual';

export interface NewOrderValue {
  sourceType: RequestSourceType | null;
  agency: string;
  individualSearch: string;
  beneficiaryStatus: string;
  beneficiaryName: string;
  mobile: string;
  specialRequest: string;
  service: string;
}

export interface NewOrderFinancialReview {
  profit: string;
  executorDue: string;
  expectedDuration: string;
  salePrice: string;
}

export interface NewOrderStage {
  number: number;
  name: string;
}

export const NEW_ORDER_STAGES: NewOrderStage[] = [
  { number: 1, name: 'الإحرام' },
  { number: 2, name: 'الطواف' },
  { number: 3, name: 'السعي' },
  { number: 4, name: 'الحلق' },
];

export const NEW_ORDER_FINANCIAL_MOCK: NewOrderFinancialReview = {
  profit: '100',
  executorDue: '200',
  expectedDuration: '24 ساعة',
  salePrice: '350',
};

export const BENEFICIARY_STATUS_OPTIONS = [
  { value: '', label: 'اختر حالة المستفيد' },
  { value: 'حي', label: 'حي' },
  { value: 'متوفى', label: 'متوفى' },
  { value: 'مريض', label: 'مريض' },
];

export const AGENCY_OPTIONS = [
  { value: '', label: 'اختر الوكالة' },
  { value: 'مناسك', label: 'مناسك' },
  { value: 'رفاه', label: 'رفاه' },
  { value: 'نسك', label: 'نسك' },
];

export const SERVICE_OPTIONS = [
  { value: '', label: 'اختر الخدمة' },
  { value: 'عمرة بالإنابة', label: 'عمرة بالإنابة' },
  { value: 'حج بالإنابة', label: 'حج بالإنابة' },
  { value: 'زيارة بالإنابة', label: 'زيارة بالإنابة' },
];
