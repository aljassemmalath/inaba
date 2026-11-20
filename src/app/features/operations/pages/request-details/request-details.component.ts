import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { IconPlaceholderComponent } from '../../../../shared/components/icon-placeholder/icon-placeholder.component';
import { PageBannerComponent } from '../../../../shared/components/page-banner/page-banner.component';
import { ProgressStepperComponent } from '../../../../shared/components/progress-stepper/progress-stepper.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge';
import { openInabaDialogs } from '../../../../shared/components/modal/dialogs/dialog-presets';
import { RequestDetailsService } from './request-details.service';

export interface OrderActionItem {
  key: string;
  label: string;
  icon: string | null;
}

export interface OrderActionsConfig {
  primary: { key: string; label: string; icon: string } | null;
  menu: OrderActionItem[];
}

const ICON = {
  addUser: 'assets/images/svg/Buttons/user%20add.svg',
  addNotification: 'assets/images/svg/Buttons/notification.svg',
  edit: 'assets/images/svg/Buttons/edit-02.svg',
  note: 'assets/images/svg/Buttons/comment-add-01.svg',
  delete: 'assets/images/svg/Buttons/delete-02.svg',
  reassign: 'assets/images/svg/Buttons/reassign.svg',
  unassign: 'assets/images/svg/Buttons/unassign.svg',
  freeze: 'assets/images/svg/Buttons/video-off.svg',
  arrowDown: 'assets/images/svg/Buttons/arrow%20down.svg',
};

@Component({
  selector: 'app-request-details-page',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    PageBannerComponent,
    ProgressStepperComponent,
    StatusBadgeComponent,
    IconPlaceholderComponent,
  ],
  providers: [RequestDetailsService],
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.scss',
})
export class RequestDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(Dialog);
  private readonly dialogs = openInabaDialogs(this.dialog);
  readonly state = inject(RequestDetailsService);
  readonly actionsMenuOpen = signal(false);
  readonly arrowDownIcon = ICON.arrowDown;

  readonly actionsConfig = computed<OrderActionsConfig | null>(() => {
    const d = this.state.details();
    if (!d) return null;
    const status = d.status;
    const indicators = d.indicators ?? [];
    const has = (label: string) => indicators.includes(label);

    if (status === 'بانتظار الإسناد' && indicators.length === 0) {
      return {
        primary: { key: 'assign', label: 'إسناد', icon: ICON.addUser },
        menu: [
          { key: 'edit', label: 'تعديل', icon: ICON.edit },
          { key: 'add-note', label: 'إضافة ملاحظة', icon: ICON.note },
          { key: 'delete', label: 'حذف', icon: ICON.delete },
        ],
      };
    }
    if (status === 'بانتظار الإسناد' && has('رفض المنفذ') && indicators.length === 1) {
      return {
        primary: { key: 'assign', label: 'إسناد', icon: ICON.addUser },
        menu: [
          { key: 'edit', label: 'تعديل', icon: ICON.edit },
          { key: 'add-note', label: 'إضافة ملاحظة', icon: ICON.note },
        ],
      };
    }
    if (status === 'بانتظار الإسناد' && has('تنفيذ سابق ملغي')) {
      return {
        primary: { key: 'assign', label: 'إسناد', icon: ICON.addUser },
        menu: [
          { key: 'edit', label: 'تعديل', icon: ICON.edit },
          { key: 'add-note', label: 'إضافة ملاحظة', icon: ICON.note },
          { key: 'freeze-video', label: 'تجميد حذف الفيديو', icon: ICON.freeze },
        ],
      };
    }
    if (status === 'مُسند' && has('بانتظار رد المنفذ') && has('لم يشاهد الإشعار')) {
      return {
        primary: { key: 'remind', label: 'تذكير المنفذ', icon: ICON.addNotification },
        menu: [
          { key: 'reassign', label: 'إعادة الإسناد', icon: ICON.reassign },
          { key: 'cancel-assignment', label: 'إلغاء الإسناد', icon: ICON.unassign },
          { key: 'add-note', label: 'إضافة ملاحظة', icon: ICON.note },
        ],
      };
    }
    if (status === 'قيد التنفيذ') {
      return {
        primary: null,
        menu: [
          { key: 'reassign', label: 'إعادة الإسناد', icon: ICON.reassign },
          { key: 'cancel-assignment', label: 'إلغاء الإسناد', icon: ICON.unassign },
          { key: 'add-note', label: 'إضافة ملاحظة', icon: ICON.note },
          { key: 'freeze-video', label: 'تجميد حذف الفيديو', icon: ICON.freeze },
        ],
      };
    }
    if (status === 'مُكتمل') {
      return {
        primary: null,
        menu: [
          { key: 'cancel-execution', label: 'إلغاء التنفيذ', icon: ICON.unassign },
          { key: 'add-note', label: 'إضافة ملاحظة', icon: ICON.note },
          { key: 'freeze-video', label: 'تجميد حذف الفيديو', icon: ICON.freeze },
        ],
      };
    }
    return {
      primary: null,
      menu: [{ key: 'add-note', label: 'إضافة ملاحظة', icon: ICON.note }],
    };
  });

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((p) => {
      this.actionsMenuOpen.set(false);
      this.state.load(p.get('id') ?? '4783287');
    });
  }

  toggleActionsMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.actionsMenuOpen.update((v) => !v);
  }

  @HostListener('document:click')
  closeActionsMenu(): void {
    this.actionsMenuOpen.set(false);
  }

  onAction(actionKey: string): void {
    this.actionsMenuOpen.set(false);
    switch (actionKey) {
      case 'assign':
      case 'reassign':
        this.dialogs.assignOrder();
        break;
      case 'remind':
        this.dialogs.remindExecutor();
        break;
      case 'edit':
        this.dialogs.editOrder();
        break;
      case 'add-note':
        this.dialogs.addInternalNote();
        break;
      case 'delete':
        this.dialogs.deleteOrder();
        break;
      case 'cancel-assignment':
        this.dialogs.cancelAssignment();
        break;
      case 'cancel-execution':
        this.dialogs.cancelExecution();
        break;
      case 'freeze-video':
        this.dialogs.freezeVideoDeletion();
        break;
      default:
        break;
    }
  }
}
