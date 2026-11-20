import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { AssignOrderDialogComponent } from './assign-order.dialog';
import { ConfirmSuccessDialogComponent, ConfirmSuccessData } from './confirm-success.dialog';
import { DuplicateFileWarningDialogComponent } from './duplicate-file-warning.dialog';
import { EditOrderDialogComponent } from './edit-order.dialog';
import { ImportOrdersPreviewDialogComponent } from './import-orders-preview.dialog';
import { OrderCreationSuccessDialogComponent } from './order-creation-success.dialog';
import { ReasonActionDialogComponent, ReasonActionData } from './reason-action.dialog';
import { SimpleConfirmDialogComponent, SimpleConfirmData } from './simple-confirm.dialog';
import { StartIssueFollowupDialogComponent } from './start-issue-followup.dialog';

const panel = { panelClass: 'app-modal-panel', autoFocus: 'first-tabbable', restoreFocus: true };

/** Convenience openers for the 22 Inaba modals (PDF pp.1-31). Content structures match the spec. */
export function openInabaDialogs(dialog: Dialog) {
  const success = (data: ConfirmSuccessData) => dialog.open(ConfirmSuccessDialogComponent, { ...panel, data });
  const confirm = (data: SimpleConfirmData) => dialog.open(SimpleConfirmDialogComponent, { ...panel, data });
  const reason = (data: ReasonActionData) => dialog.open(ReasonActionDialogComponent, { ...panel, data });

  const chainSuccess = <R, C>(ref: DialogRef<R, C>, openSuccess: () => void): DialogRef<R, C> => {
    ref.closed.subscribe((result) => {
      if (result) openSuccess();
    });
    return ref;
  };

  const successOpeners = {
    assignOrderSuccess: () => success({ title: 'تم إسناد الطلب بنجاح' }),
    cancelAssignmentSuccess: () => success({ title: 'تم إلغاء إسناد الطلب بنجاح' }),
    cancelExecutionSuccess: () => success({ title: 'تم إلغاء تنفيذ الطلب بنجاح' }),
    remindExecutorSuccess: () => success({ title: 'تم إشعار المنفذ بنجاح' }),
    editOrderSuccess: () => success({ title: 'تم حفظ التعديلات بنجاح' }),
    addInternalNoteSuccess: () => success({ title: 'تم إضافة الملاحظة بنجاح' }),
    deleteOrderSuccess: () => success({ title: 'تم حذف الطلب بنجاح' }),
    issueFollowupStarted: () => success({ title: 'تم بدء متابعة المشكلة' }),
    freezeVideoDeletionSuccess: () => success({ title: 'تم تجميد حذف الفيديو بنجاح' }),
  };

  return {
    // 1,2 Assign
    assignOrder: () =>
      chainSuccess(dialog.open(AssignOrderDialogComponent, panel), successOpeners.assignOrderSuccess),
    assignOrderSuccess: successOpeners.assignOrderSuccess,
    // 3,4 Cancel assignment
    cancelAssignment: () =>
      chainSuccess(
        reason({
          title: 'إلغاء إسناد الطلب',
          description: 'سيتم إلغاء الإسناد الحالي وإعادة الطلب إلى «بانتظار الإسناد».',
          reasonLabel: 'سبب الإلغاء',
          reasonPlaceholder: 'اكتب السبب..',
          confirmLabel: 'تأكيد إلغاء الإسناد',
        }),
        successOpeners.cancelAssignmentSuccess,
      ),
    cancelAssignmentSuccess: successOpeners.cancelAssignmentSuccess,
    // 5,6 Cancel execution
    cancelExecution: () =>
      chainSuccess(
        reason({
          title: 'إلغاء تنفيذ الطلب',
          description: 'سيعود الطلب إلى «بانتظار الإسناد» مع الاحتفاظ بسجل التنفيذ والأدلة السابقة.',
          reasonLabel: 'سبب إلغاء التنفيذ',
          reasonPlaceholder: 'اكتب السبب..',
          confirmLabel: 'تأكيد إلغاء التنفيذ',
        }),
        successOpeners.cancelExecutionSuccess,
      ),
    cancelExecutionSuccess: successOpeners.cancelExecutionSuccess,
    // 7,8 Remind
    remindExecutor: () =>
      chainSuccess(
        confirm({
          title: 'إشعار المنفذ',
          description: 'هل أنت متأكد من إعادة إشعار المنفذ بالطلب المسند إليه؟',
          confirmLabel: 'إشعار المنفذ',
        }),
        successOpeners.remindExecutorSuccess,
      ),
    remindExecutorSuccess: successOpeners.remindExecutorSuccess,
    // 9,10 Edit
    editOrder: () => chainSuccess(dialog.open(EditOrderDialogComponent, panel), successOpeners.editOrderSuccess),
    editOrderSuccess: successOpeners.editOrderSuccess,
    // 11,12 Note
    addInternalNote: () =>
      chainSuccess(
        reason({
          title: 'إضافة ملاحظة داخلية',
          description: '',
          reasonLabel: 'إضافة ملاحظة داخلية',
          reasonPlaceholder: 'قم بكتابة الملاحظة...',
          confirmLabel: 'حفظ',
          size: 'small',
        }),
        successOpeners.addInternalNoteSuccess,
      ),
    addInternalNoteSuccess: successOpeners.addInternalNoteSuccess,
    // 13,14 Delete
    deleteOrder: () =>
      chainSuccess(
        reason({
          title: 'هل أنت متأكد من حذف الطلب؟',
          description:
            'سيُحذف هذا الطلب من القوائم والتقارير، وينتقل إلى «الطلبات المحذوفة» مع تسجيل سبب الحذف واسم المسؤول عنه ووقت الحذف.',
          reasonLabel: 'سبب الحذف',
          reasonPlaceholder: 'اكتب السبب..',
          confirmLabel: 'تأكيد حذف الطلب',
          note: 'يمكن حذف الطلبات غير المُسندة فقط',
        }),
        successOpeners.deleteOrderSuccess,
      ),
    deleteOrderSuccess: successOpeners.deleteOrderSuccess,
    // 15,16,17 Issue follow-up
    startIssueFollowup: () =>
      chainSuccess(
        dialog.open(StartIssueFollowupDialogComponent, panel),
        successOpeners.issueFollowupStarted,
      ),
    resolveIssue: () =>
      reason({
        title: 'حل المشكلة',
        description: '',
        reasonLabel: 'ملاحظة الحل',
        reasonPlaceholder: 'اكتب ما تم عمله ونتيجة المتابعة...',
        confirmLabel: 'تأكيد حل المشكلة',
      }),
    issueFollowupStarted: successOpeners.issueFollowupStarted,
    // 18,19 Freeze
    freezeVideoDeletion: () =>
      chainSuccess(
        reason({
          title: 'تجميد حذف الفيديو',
          description: 'لن يُحذف دليل الفيديو تلقائيًا خلال فترة التجميد.',
          reasonLabel: 'سبب التجميد',
          reasonPlaceholder: 'اكتب السبب..',
          confirmLabel: 'تأكيد التجميد',
        }),
        successOpeners.freezeVideoDeletionSuccess,
      ),
    freezeVideoDeletionSuccess: successOpeners.freezeVideoDeletionSuccess,
    // 20,21,22
    orderCreationSuccess: () => dialog.open(OrderCreationSuccessDialogComponent, panel),
    importOrdersPreview: () => dialog.open(ImportOrdersPreviewDialogComponent, panel),
    duplicateFileWarning: () => dialog.open(DuplicateFileWarningDialogComponent, panel),
  };
}
