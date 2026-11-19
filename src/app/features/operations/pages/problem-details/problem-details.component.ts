import { Component, Inject, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DIALOG_DATA, Dialog, DialogRef } from '@angular/cdk/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageBannerComponent } from '../../../../shared/components/page-banner/page-banner.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { IconPlaceholderComponent } from '../../../../shared/components/icon-placeholder/icon-placeholder.component';
import { getProblemDetails } from '../../data/mock-problem-details';
import { ProblemDetails } from '../../models/problem-details.model';

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal modalType="center" modalSize="small" [title]="'معاينة المرفق'" [showCloseButton]="true">
      <div modal-body class="p-2" style="text-align:center;">
        <span class="icon-placeholder icon-placeholder--xl" aria-hidden="true"><img class="icon-placeholder__image is-visible" src="/assets/images/svg/Buttons/view.svg" alt="" /></span>
        <p style="margin:12px 0 0; font-weight:500;">{{ data.fileName }}</p>
        <p style="margin:4px 0 0; color:var(--text-secondary); font-size:13px;">معاينة الملف غير متاحة حاليًا (لا يوجد رابط مرفق).</p>
      </div>
      <ng-container modal-actions>
        <button type="button" class="btn btn-brand" (click)="ref.close()">إغلاق</button>
      </ng-container>
    </app-modal>
  `,
})
class AttachmentPreviewDialogComponent {
  constructor(public ref: DialogRef, @Inject(DIALOG_DATA) public data: { fileName: string }) {}
}

@Component({
  selector: 'app-problem-details-page',
  imports: [PageBannerComponent, StatusBadgeComponent, IconPlaceholderComponent],
  templateUrl: './problem-details.component.html',
  styleUrl: './problem-details.component.scss',
})
export class ProblemDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(Dialog);

  readonly details = signal<ProblemDetails | null>(null);

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((p) => {
      const id = p.get('id') ?? 'p1';
      this.details.set(getProblemDetails(id));
    });
  }

  openRequest(): void {
    const d = this.details();
    if (!d) return;
    this.router.navigate(['/operations/requests', d.relatedRequest.id]);
  }

  previewAttachment(): void {
    const d = this.details();
    if (!d) return;
    this.dialog.open(AttachmentPreviewDialogComponent, {
      panelClass: 'app-modal-panel',
      data: { fileName: d.attachmentName },
    });
  }
}