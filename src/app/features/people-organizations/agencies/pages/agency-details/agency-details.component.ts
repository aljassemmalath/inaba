import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageBannerComponent } from '../../../../../shared/components/page-banner/page-banner.component';
import { StatusBadgeComponent, BadgeTone } from '../../../../../shared/components/status-badge/status-badge';
import { DataTableComponent, DataTableColumn } from '../../../../../shared/components/data-table/data-table.component';
import { IconPlaceholderComponent } from '../../../../../shared/components/icon-placeholder/icon-placeholder.component';
import { AGENCIES_MOCK } from '../../data/mock-agencies';
import { AgencyRow } from '../../models/agency.model';

interface AgencyOrderRow extends Record<string, unknown> {
  id: string;
  requestNumber: string;
  beneficiary: string;
  product: string;
  status: string;
  statusTone: BadgeTone;
  requestDate: string;
}

@Component({
  selector: 'app-agency-details-page',
  imports: [PageBannerComponent, StatusBadgeComponent, DataTableComponent, IconPlaceholderComponent],
  templateUrl: './agency-details.component.html',
  styleUrl: './agency-details.component.scss',
})
export class AgencyDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly agency = signal<AgencyRow | null>(null);
  readonly orders = signal<AgencyOrderRow[]>([]);

  readonly orderColumns: DataTableColumn<AgencyOrderRow>[] = [
    { key: 'actions', header: 'الإجراءات', width: '90px' },
    { key: 'requestDate', header: 'تاريخ الطلب' },
    { key: 'status', header: 'الحالة' },
    { key: 'product', header: 'المنتج' },
    { key: 'beneficiary', header: 'المستفيد' },
    { key: 'requestNumber', header: 'رقم الطلب' },
  ];

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((p) => {
      const id = p.get('id') ?? '';
      const a = AGENCIES_MOCK.find((x) => x.id === id) ?? AGENCIES_MOCK[0];
      this.agency.set(a ?? null);
      this.orders.set(this.buildOrders(a?.id ?? 'a1'));
    });
  }

  private buildOrders(agencyId: string): AgencyOrderRow[] {
    const base: AgencyOrderRow[] = [
      { id: '4783287', requestNumber: '4783287', beneficiary: 'فاطمة أحمد', product: 'عمرة بالإنابة', status: 'قيد التنفيذ', statusTone: 'info', requestDate: '2025/10/01' },
      { id: '4783286', requestNumber: '4783286', beneficiary: 'سلمان العتيبي', product: 'حج مفرد', status: 'مكتمل', statusTone: 'success', requestDate: '2025/09/28' },
      { id: '4783280', requestNumber: '4783280', beneficiary: 'سارة الحربي', product: 'عمرة بالإنابة', status: 'مكتمل', statusTone: 'success', requestDate: '2025/09/20' },
      { id: '4783284', requestNumber: '4783284', beneficiary: 'خالد الدوسري', product: 'طواف بالإنابة', status: 'مُسند', statusTone: 'info', requestDate: '2025/10/05' },
    ];
    // keep stable ids but differentiate slightly by agency if needed; structure preserved
    return base;
  }

  openOrder(row: AgencyOrderRow): void {
    this.router.navigate(['/operations/requests', row.id]);
  }
}