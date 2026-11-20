export type ImportRowStatus = 'valid' | 'invalid';

export interface ImportRow extends Record<string, unknown> {
  rowIndex: number; // 1-based data row
  status: ImportRowStatus;
  beneficiary: string;
  mobile: string;
  product: string;
  agency: string;
  source: string;
  beneficiaryStatus: string;
  errors: string[];
  /** Column keys whose values should be highlighted as errors in the preview. */
  errorFields: string[];
}

export interface ImportValidationSummary {
  totalRows: number;
  validCount: number;
  invalidCount: number;
  headerErrors: string[];
}

export interface ImportParseResult {
  fileName: string;
  fileSize: number;
  rows: ImportRow[];
  summary: ImportValidationSummary;
}

export interface ImportRequirement {
  number: number;
  label: string;
  hint?: string;
}

export const IMPORT_REQUIREMENTS: ImportRequirement[] = [
  { number: 1, label: 'اسم المستفيد' },
  { number: 2, label: 'رقم الجوال' },
  { number: 3, label: 'حالة المستفيد' },
  { number: 4, label: 'الخدمة' },
  { number: 5, label: 'مصدر الطلب' },
  { number: 6, label: 'الوكالة', hint: '(إن وجد)' },
];
