import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import * as XLSX from 'xlsx';
import { ImportParseResult, ImportRow, ImportValidationSummary } from './import-orders.models';

export interface ImportConfirmResult {
  imported: number;
  skipped: number;
}

@Injectable({ providedIn: 'root' })
export class ImportOrdersService {
  async parseFile(file: File): Promise<ImportParseResult> {
    const buffer = await file.arrayBuffer();
    const wb = XLSX.read(buffer, { type: 'array' });
    const sheetName = wb.SheetNames[0];
    const sheet = sheetName ? wb.Sheets[sheetName] : undefined;
    const json: Record<string, unknown>[] = sheet ? XLSX.utils.sheet_to_json(sheet, { defval: '' }) : [];

    const headerErrors: string[] = [];
    if (!sheet) headerErrors.push('تعذر قراءة ورقة العمل من الملف. تأكد من استخدام قالب Excel الصحيح.');
    if (sheet && json.length === 0) headerErrors.push('لا توجد صفوف بيانات في الملف.');

    const rows: ImportRow[] = json.map((raw, idx) => this.mapRow(raw, idx + 1));
    const validCount = rows.filter((r) => r.status === 'valid').length;
    const summary: ImportValidationSummary = {
      totalRows: rows.length,
      validCount,
      invalidCount: rows.length - validCount,
      headerErrors,
    };
    return { fileName: file.name, fileSize: file.size, rows, summary };
  }

  /** Seeded preview used by the UI: 48 valid rows and the 3 requested error examples. */
  previewFile(file: File): ImportParseResult {
    const names = [
      'أحمد محمد', 'خالد العتيبي', 'منى الحربي', 'سارة القحطاني',
      'عبدالله الغامدي', 'نورة الشمري', 'محمد الصالح', 'فاطمة الزهراء',
      'عمر الدوسري', 'ريم المطيري', 'يوسف الحارثي', 'هند العسيري',
    ];
    const products = ['عمرة بالإنابة', 'حج بالإنابة', 'زيارة بالإنابة', 'صدقة جارية'];
    const sources = ['وكالة / مكتب حج وعمرة', 'طلب مباشر'];
    const statuses = ['حي', 'حي', 'مريض'];

    const rows: ImportRow[] = [];
    for (let rowIndex = 1; rowIndex <= 51; rowIndex += 1) {
      if (rowIndex === 2) {
        rows.push({
          rowIndex,
          status: 'invalid',
          beneficiary: 'خالد العتيبي',
          mobile: '+966 50343',
          product: 'عمرة بالإنابة',
          agency: 'مناسك',
          source: 'وكالة / مكتب حج وعمرة',
          beneficiaryStatus: 'حي',
          errors: ['رقم جوال غير صالح'],
          errorFields: ['mobile'],
        });
        continue;
      }
      if (rowIndex === 4) {
        rows.push({
          rowIndex,
          status: 'invalid',
          beneficiary: '',
          mobile: '',
          product: '',
          agency: 'رفاه',
          source: 'وكالة / مكتب حج وعمرة',
          beneficiaryStatus: '',
          errors: ['حالة المستفيد فارغة', 'اسم المستفيد فارغ', 'رقم الجوال فارغ', 'الخدمة فارغة'],
          errorFields: ['beneficiaryStatus', 'beneficiary', 'mobile', 'product'],
        });
        continue;
      }
      if (rowIndex === 6) {
        rows.push({
          rowIndex,
          status: 'invalid',
          beneficiary: 'سارة القحطاني',
          mobile: '+966 512345678',
          product: 'حج بالإنابة',
          agency: '',
          source: '',
          beneficiaryStatus: 'حي',
          errors: ['مصدر الطلب فارغ'],
          errorFields: ['source'],
        });
        continue;
      }

      rows.push({
        rowIndex,
        status: 'valid',
        beneficiary: names[(rowIndex - 1) % names.length],
        mobile: `+966 5${String(1000000 + rowIndex).padStart(8, '0')}`,
        product: products[(rowIndex - 1) % products.length],
        agency: 'مناسك',
        source: sources[(rowIndex - 1) % sources.length],
        beneficiaryStatus: statuses[(rowIndex - 1) % statuses.length],
        errors: [],
        errorFields: [],
      });
    }

    return {
      fileName: file.name,
      fileSize: file.size,
      rows,
      summary: { totalRows: 51, validCount: 48, invalidCount: 3, headerErrors: [] },
    };
  }

  private mapRow(raw: Record<string, unknown>, rowIndex: number): ImportRow {
    const pick = (...keys: string[]): string => {
      for (const k of Object.keys(raw)) {
        const nk = this.norm(k);
        if (keys.some((kk) => nk.includes(this.norm(kk)))) return String(raw[k] ?? '').trim();
      }
      return '';
    };
    const beneficiary = pick('اسم المستفيد', 'المستفيد', 'beneficiary', 'name');
    const mobile = pick('رقم الجوال', 'الجوال', 'mobile', 'phone');
    const product = pick('الخدمة', 'المنتج', 'product', 'service');
    const agency = pick('الوكالة', 'agency');
    const source = pick('مصدر الطلب', 'المصدر', 'source');
    const beneficiaryStatus = pick('حالة المستفيد', 'الحالة', 'status');

    const errors: string[] = [];
    const errorFields: string[] = [];
    if (!product) { errors.push('الخدمة مطلوبة.'); errorFields.push('product'); }
    if (!beneficiary) { errors.push('اسم المستفيد مطلوب.'); errorFields.push('beneficiary'); }
    if (!beneficiaryStatus) { errors.push('حالة المستفيد مفقودة.'); errorFields.push('beneficiaryStatus'); }
    if (mobile && !/^[0-9+\s()-]{8,20}$/.test(mobile)) { errors.push('رقم جوال غير صالح.'); errorFields.push('mobile'); }
    if (!agency && !source) { errors.push('بيانات غير متوافقة مع القالب (الوكالة/مصدر الطلب).'); errorFields.push('source'); }

    return {
      rowIndex,
      status: errors.length ? 'invalid' : 'valid',
      beneficiary,
      mobile,
      product,
      agency,
      source: source || (agency ? 'وكالة / مكتب حج وعمرة' : ''),
      beneficiaryStatus,
      errors,
      errorFields,
    };
  }

  private norm(s: string): string {
    return s.replace(/\s+/g, '').toLowerCase();
  }

  downloadErrorReport(result: ImportParseResult): void {
    const invalid = result.rows.filter((r) => r.status === 'invalid');
    const header = ['رقم الصف', 'المستفيد', 'الجوال', 'الخدمة', 'الوكالة', 'مصدر الطلب', 'حالة المستفيد', 'رسائل التحقق'];
    const lines = invalid.map((r) =>
      [r.rowIndex, r.beneficiary, r.mobile, r.product, r.agency, r.source, r.beneficiaryStatus, r.errors.join(' | ')]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(','),
    );
    const csv = '\ufeff' + [header.join(','), ...lines].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'تقرير-أخطاء-الاستيراد.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  downloadTemplate(): void {
    const rows = [{ 'الخدمة': 'عمرة بالإنابة', 'اسم المستفيد': 'مثال', 'رقم الجوال': '512345678', 'الوكالة': 'مناسك', 'حالة المستفيد': 'حي', 'مصدر الطلب': 'وكالة / مكتب حج وعمرة' }];
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'الطلبات');
    XLSX.writeFile(wb, 'قالب-استيراد-الطلبات.xlsx');
  }

  /** Mock confirm: imports only valid rows. Replace with API integration. */
  confirmImport(result: ImportParseResult): Observable<ImportConfirmResult> {
    const imported = result.summary.validCount;
    const skipped = result.summary.invalidCount;
    return of({ imported, skipped }).pipe(delay(500));
  }
}
