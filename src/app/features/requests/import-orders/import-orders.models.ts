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

export const IMPORT_REQUIRED_CHECKLIST = [
  'الخدمة',
  'اسم المستفيد',
  'رقم الجوال (إن وجد)',
  'الوكالة',
  'حالة المستفيد',
];
