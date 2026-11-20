import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { FilterToolbarComponent } from '../../../../shared/components/filter-toolbar/filter-toolbar.component';
import { PageBannerComponent } from '../../../../shared/components/page-banner/page-banner.component';
import { RequestCardComponent } from '../../components/request-card/request-card.component';
import { SummaryContainerComponent } from '../../../../shared/components/summary-container/summary-container.component';
import { SummaryItemComponent } from '../../../../shared/components/summary-item/summary-item.component';
import { openInabaDialogs, GenericFormDialogComponent } from '../../../../shared/components/modal/dialogs';
import { NEEDS_ACTION_REQUESTS, REQUEST_STATUS_OPTIONS, REQUEST_TYPE_OPTIONS } from '../../data/mock-requests';
import { NeedsActionRequest, RequestAction } from '../../models/request.model';

interface NaStat {
  title: string;
  value: string | number;
  iconKey?: string;
  iconSrc?: string;
  modifierClass: string;
}

@Component({
  selector: 'app-needs-action-page',
  imports: [FormsModule, FilterToolbarComponent, PageBannerComponent, SummaryContainerComponent, SummaryItemComponent, RequestCardComponent],
  templateUrl: './needs-action.component.html',
  styleUrl: './needs-action.component.scss',
})
export class NeedsActionComponent {
  private readonly dialog = inject(Dialog);
  private readonly router = inject(Router);
  private readonly dialogs = openInabaDialogs(this.dialog);

  readonly requests = NEEDS_ACTION_REQUESTS;
  readonly statusOptions = REQUEST_STATUS_OPTIONS;
  readonly typeOptions = REQUEST_TYPE_OPTIONS;

  readonly search = signal('');
  readonly statusFilter = signal('all');
  readonly typeFilter = signal('all');
  readonly filterOpen = signal(false);
  readonly exportOpen = signal(false);
  readonly lastAction = signal<string | null>(null);

  readonly stats: NaStat[] = [
    { title: 'إجمالي الحالات', value: 28, iconSrc: 'assets/images/svg/Need%20Action/all.svg', modifierClass: 'na-stat-total' },
    { title: 'بانتظار الإسناد', value: 17, iconSrc: 'assets/images/svg/Need%20Action/waiting%20executer.svg', modifierClass: 'na-stat-pending-assignment' },
    { title: 'بانتظار الإشعار', value: 6, iconSrc: 'assets/images/svg/Need%20Action/waiting.svg', modifierClass: 'na-stat-pending-notify' },
    { title: 'مشاكل وأدلة', value: 3, iconSrc: 'assets/images/svg/Need%20Action/problems.svg', modifierClass: 'na-stat-issues-evidence' },
    { title: 'فشل رفع أو معالجة ملف', value: 2, iconSrc: 'assets/images/svg/Need%20Action/file-remove.svg', modifierClass: 'na-stat-file-failures' },
  ];

  readonly filteredRequests = computed(() => {
    const q = this.search().trim().toLowerCase();
    const status = this.statusFilter();
    const type = this.typeFilter();
    return this.requests.filter((r) => {
      const matchesQuery =
        !q ||
        r.requestNumber.toLowerCase().includes(q) ||
        r.beneficiaryName.toLowerCase().includes(q) ||
        r.beneficiaryEmail.toLowerCase().includes(q);
      const matchesStatus = status === 'all' || r.status === status;
      const matchesType = type === 'all' || r.requestType === type;
      return matchesQuery && matchesStatus && matchesType;
    });
  });

  toggleFilter(): void {
    this.filterOpen.update((v) => !v);
    this.exportOpen.set(false);
  }

  toggleExport(): void {
    this.exportOpen.update((v) => !v);
    this.filterOpen.set(false);
  }

  onSearch(value: string): void {
    this.search.set(value);
  }

  onStatusChange(value: string): void {
    this.statusFilter.set(value);
  }

  onTypeChange(value: string): void {
    this.typeFilter.set(value);
  }

  resetFilters(): void {
    this.statusFilter.set('all');
    this.typeFilter.set('all');
    this.search.set('');
  }

  showRequests(): void {
    document.getElementById('needs-action-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  refresh(): void {
    this.lastAction.set('تم تحديث القائمة.');
    setTimeout(() => this.lastAction.set(null), 2000);
  }

  handleAction(event: { request: NeedsActionRequest; action: RequestAction }): void {
    const { request, action } = event;
    this.lastAction.set(`${action.label}: الطلب ${request.requestNumber}`);
    setTimeout(() => this.lastAction.set(null), 2500);

    switch (action.key) {
      case 'view':
        this.router.navigate(['/operations/requests', request.requestNumber]);
        break;
      case 'reassign':
        this.dialogs.assignOrder();
        break;
      case 'resend':
        this.dialogs.remindExecutor();
        break;
      case 'follow-issue':
        this.dialogs.startIssueFollowup();
        break;
      case 'retry-upload':
        this.dialog.open(GenericFormDialogComponent, {
          panelClass: 'app-modal-panel',
          data: {
            title: 'إعادة محاولة الرفع',
            description: 'أدخل تفاصيل إعادة محاولة رفع/معالجة الملف. (لن يتم الحفظ بدون تكامل خلفي)',
            context: { label: 'رقم الطلب', value: request.requestNumber },
            submitLabel: 'إرسال',
            fields: [
              { key: 'note', label: 'ملاحظة', type: 'textarea', placeholder: 'اكتب تفاصيل الإجراء أو سبب إعادة المحاولة', required: true },
            ],
            note: 'واجهة فقط — بانتظار تكامل العملية الخلفية.',
          },
        });
        break;
      case 'review-file':
        this.dialog.open(GenericFormDialogComponent, {
          panelClass: 'app-modal-panel',
          data: {
            title: 'مراجعة الملف',
            description: 'سجّل ملاحظات مراجعة الملف والتنبيه. (لن يتم الحفظ بدون تكامل خلفي)',
            context: { label: 'رقم الطلب', value: request.requestNumber },
            submitLabel: 'حفظ المراجعة',
            fields: [
              { key: 'decision', label: 'نتيجة المراجعة', type: 'select', options: [{ value: 'accept', label: 'قبول' }, { value: 'reject', label: 'رفض' }, { value: 'needs-fix', label: 'يحتاج تعديل' }], required: true },
              { key: 'notes', label: 'ملاحظات', type: 'textarea', placeholder: 'اكتب ملاحظات المراجعة' },
            ],
            note: 'واجهة فقط — بانتظار تكامل العملية الخلفية.',
          },
        });
        break;
      default:
        break;
    }
  }
}
