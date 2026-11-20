import { Component, computed, Inject, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { finalize } from 'rxjs';
import { PageBannerComponent } from '../../../shared/components/page-banner/page-banner.component';
import { ProgressStepperComponent, StepItem } from '../../../shared/components/progress-stepper/progress-stepper.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { SimpleConfirmDialogComponent } from '../../../shared/components/modal/dialogs/simple-confirm.dialog';
import { ConfirmSuccessDialogComponent } from '../../../shared/components/modal/dialogs/confirm-success.dialog';
import { NewOrderService } from './new-order.service';
import {
  AGENCY_OPTIONS,
  BENEFICIARY_STATUS_OPTIONS,
  NEW_ORDER_FINANCIAL_MOCK,
  NEW_ORDER_STAGES,
  NewOrderStage,
  NewOrderValue,
  RequestSourceType,
  SERVICE_OPTIONS,
} from './new-order.models';

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal modalType="center" modalSize="medium" [title]="data.title" [showCloseButton]="true">
      <ol modal-body class="stages-list">
        @for (stage of data.stages; track stage.number) {
          <li class="stage-row">
            <span class="stage-number">{{ stage.number }}</span>
            <span class="stage-name">{{ stage.name }}</span>
          </li>
        }
      </ol>
      <ng-container modal-actions>
        <button type="button" class="btn btn-brand" (click)="ref.close()">إغلاق</button>
      </ng-container>
    </app-modal>
  `,
  styles: [`
    .stages-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; width: 100%; }
    .stage-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); }
    .stage-number { width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0; border: 1px solid var(--border-subtle); font-size: 12px; font-weight: 700; }
    .stage-name { font-size: var(--font-size-body-md); color: var(--text-primary); font-weight: 500; }
  `],
})
class StagesDialogComponent {
  constructor(
    public ref: DialogRef,
    @Inject(DIALOG_DATA) public data: { title: string; stages: NewOrderStage[] },
  ) {}
}

@Component({
  selector: 'app-new-order',
  imports: [ReactiveFormsModule, PageBannerComponent, ProgressStepperComponent, FormSectionComponent, FormFieldComponent],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss',
})
export class NewOrderComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly dialog = inject(Dialog);
  private readonly service = inject(NewOrderService);

  readonly step = signal<1 | 2>(1);
  readonly submitted = signal(false);
  readonly submitting = signal(false);
  readonly steps = computed<StepItem[]>(() => {
    const current = this.step();
    return [
      { number: 1, name: 'بيانات الطلب', status: current === 1 ? 'in-progress' : 'completed', statusLabel: current === 1 ? 'جارٍ التنفيذ' : 'مكتمل' },
      { number: 2, name: 'مراجعة الطلب', status: current === 2 ? 'in-progress' : 'pending', statusLabel: current === 2 ? 'جارٍ التنفيذ' : 'قيد الانتظار' },
    ];
  });
  readonly agencyOptions = AGENCY_OPTIONS;
  readonly statusOptions = BENEFICIARY_STATUS_OPTIONS;
  readonly serviceOptions = SERVICE_OPTIONS;
  readonly financial = NEW_ORDER_FINANCIAL_MOCK;
  readonly stages = NEW_ORDER_STAGES;

  readonly form = this.fb.nonNullable.group({
    sourceType: [null as RequestSourceType | null, Validators.required],
    agency: [''],
    individualSearch: [''],
    beneficiaryStatus: ['', Validators.required],
    beneficiaryName: ['', [Validators.required, Validators.minLength(2)]],
    mobile: ['', [Validators.required, Validators.pattern(/^[0-9+\s-]{8,15}$/)]],
    specialRequest: [''],
    service: ['', Validators.required],
  });

  constructor() {
    this.form.controls.sourceType.valueChanges.subscribe((v) => this.applySourceValidators(v));
  }

  private applySourceValidators(source: RequestSourceType | null): void {
    const agency = this.form.controls.agency;
    const ind = this.form.controls.individualSearch;
    agency.clearValidators();
    ind.clearValidators();
    if (source === 'agency') agency.setValidators([Validators.required]);
    if (source === 'individual') ind.setValidators([Validators.required, Validators.minLength(2)]);
    agency.updateValueAndValidity({ emitEvent: false });
    ind.updateValueAndValidity({ emitEvent: false });
  }

  readonly review = computed<NewOrderValue>(() => this.form.getRawValue());

  sourceLabel(v: RequestSourceType | null): string {
    return v === 'agency' ? 'وكالة / مكتب حج وعمرة' : v === 'individual' ? 'فرد مباشر' : '—';
  }

  err(controlName: keyof typeof this.form.controls, messages: Record<string, string>): string {
    const c = this.form.controls[controlName];
    if (!c || !(c.touched || this.submitted()) || !c.errors) return '';
    for (const key of Object.keys(messages)) if (c.errors[key]) return messages[key];
    return 'قيمة غير صالحة.';
  }

  next(): void {
    this.submitted.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.step.set(2);
  }

  back(): void {
    this.step.set(1);
  }

  openStages(): void {
    this.dialog.open(StagesDialogComponent, {
      panelClass: 'app-modal-panel',
      data: { title: 'مراحل التنفيذ', stages: this.stages },
    });
  }

  cancel(): void {
    if (!this.form.dirty) {
      this.router.navigate(['/operations/requests']);
      return;
    }
    const ref = this.dialog.open(SimpleConfirmDialogComponent, {
      panelClass: 'app-modal-panel',
      data: {
        title: 'إلغاء الطلب',
        description: 'لديك بيانات غير محفوظة. هل تريد إلغاء الطلب والعودة إلى قائمة الطلبات؟',
        confirmLabel: 'إلغاء الطلب',
        cancelLabel: 'متابعة التحرير',
      },
    });
    ref.closed.subscribe((ok) => {
      if (ok) this.router.navigate(['/operations/requests']);
    });
  }

  submit(): void {
    if (this.submitting() || this.form.invalid) return;
    this.submitting.set(true);
    this.service
      .submit(this.form.getRawValue())
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe((res) => {
        const ref = this.dialog.open(ConfirmSuccessDialogComponent, {
          panelClass: 'app-modal-panel',
          data: { title: 'تم إنشاء الطلب بنجاح', description: `رقم الطلب: ${res.orderNumber}`, closeLabel: 'العودة إلى قائمة الطلبات' },
        });
        ref.closed.subscribe(() => this.router.navigate(['/operations/requests']));
      });
  }
}
