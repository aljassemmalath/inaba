import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { finalize } from 'rxjs';
import { PageBannerComponent } from '../../../shared/components/page-banner/page-banner.component';
import { FormStepperComponent, StepperStep } from '../../../shared/components/form-stepper/form-stepper.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { SimpleConfirmDialogComponent } from '../../../shared/components/modal/dialogs/simple-confirm.dialog';
import { ConfirmSuccessDialogComponent } from '../../../shared/components/modal/dialogs/confirm-success.dialog';
import { NewOrderService } from './new-order.service';
import {
  AGENCY_OPTIONS,
  BENEFICIARY_STATUS_OPTIONS,
  NEW_ORDER_FINANCIAL_MOCK,
  NewOrderValue,
  RequestSourceType,
  SERVICE_OPTIONS,
} from './new-order.models';

@Component({
  selector: 'app-new-order',
  imports: [ReactiveFormsModule, PageBannerComponent, FormStepperComponent, FormSectionComponent, FormFieldComponent],
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
  readonly steps: StepperStep[] = [
    { number: 1, title: 'بيانات الطلب' },
    { number: 2, title: 'مراجعة الطلب' },
  ];
  readonly agencyOptions = AGENCY_OPTIONS;
  readonly statusOptions = BENEFICIARY_STATUS_OPTIONS;
  readonly serviceOptions = SERVICE_OPTIONS;
  readonly financial = NEW_ORDER_FINANCIAL_MOCK;

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
