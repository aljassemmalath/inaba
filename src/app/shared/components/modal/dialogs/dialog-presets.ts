import { Dialog } from '@angular/cdk/dialog';
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

  return {
    // 1,2 Assign
    assignOrder: () => dialog.open(AssignOrderDialogComponent, panel),
    assignOrderSuccess: () => success({ title: 'تم إسناد الطلب بنجاح' }),
    // 3,4 Cancel assignment
    cancelAssignment: () => reason({ title: 'إلغاء إسناد الطلب', description: 'سيتم إلغاء الإسناد الحالي وإعادة الطلب إلى «بانتظار الإسناد».', reasonLabel: 'سبب الإلغاء', reasonPlaceholder: 'اكتب السبب..', confirmLabel: 'تأكيد إلغاء الإسناد' }),
    cancelAssignmentSuccess: () => success({ title: 'تم إلغاء إسناد الطلب بنجاح' }),
    // 5,6 Cancel execution
    cancelExecution: () => reason({ title: 'إلغاء تنفيذ الطلب', description: 'سيعود الطلب إلى «بانتظار الإسناد» مع الاحتفاظ بسجل التنفيذ والأدلة السابقة.', reasonLabel: 'سبب إلغاء التنفيذ', reasonPlaceholder: 'اكتب السبب..', confirmLabel: 'تأكيد إلغاء التنفيذ' }),
    cancelExecutionSuccess: () => success({ title: 'تم إلغاء تنفيذ الطلب بنجاح' }),
    // 7,8 Remind
    remindExecutor: () => confirm({ title: 'إشعار المنفذ', description: 'هل أنت متأكد من إعادة إشعار المنفذ بالطلب المسند إليه؟', confirmLabel: 'إشعار المنفذ' }),
    remindExecutorSuccess: () => success({ title: 'تم إشعار المنفذ بنجاح' }),
    // 9,10 Edit
    editOrder: () => dialog.open(EditOrderDialogComponent, panel),
    editOrderSuccess: () => success({ title: 'تم حفظ التعديلات بنجاح' }),
    // 11,12 Note
    addInternalNote: () => reason({ title: 'إضافة ملاحظة داخلية', description: '', reasonLabel: 'إضافة ملاحظة داخلية', reasonPlaceholder: 'قم بكتابة الملاحظة...', confirmLabel: 'حفظ', size: 'small' }),
    addInternalNoteSuccess: () => success({ title: 'تم إضافة الملاحظة بنجاح' }),
    // 13,14 Delete
    deleteOrder: () => reason({ title: 'هل أنت متأكد من حذف الطلب؟', description: 'سيُحذف هذا الطلب من القوائم والتقارير، وينتقل إلى «الطلبات المحذوفة» مع تسجيل سبب الحذف واسم المسؤول عنه ووقت الحذف.', reasonLabel: 'سبب الحذف', reasonPlaceholder: 'اكتب السبب..', confirmLabel: 'تأكيد حذف الطلب', note: 'يمكن حذف الطلبات غير المسندة فقط.' }),
    deleteOrderSuccess: () => success({ title: 'تم حذف الطلب بنجاح' }),
    // 15,16,17 Issue follow-up
    startIssueFollowup: () => dialog.open(StartIssueFollowupDialogComponent, panel),
    resolveIssue: () => reason({ title: 'حل المشكلة', description: '', reasonLabel: 'ملاحظة الحل', reasonPlaceholder: 'اكتب ما تم عمله ونتيجة المتابعة...', confirmLabel: 'تأكيد حل المشكلة' }),
    issueFollowupStarted: () => success({ title: 'تم بدء متابعة المشكلة' }), // 17
    // 18,19 Freeze
    freezeVideoDeletion: () => reason({ title: 'تجميد حذف الفيديو', description: 'لن يُحذف دليل الفيديو تلقائيًا خلال فترة التجميد.', reasonLabel: 'سبب التجميد', reasonPlaceholder: 'اكتب السبب..', confirmLabel: 'تأكيد التجميد' }),
    freezeVideoDeletionSuccess: () => success({ title: 'تم تجميد حذف الفيديو بنجاح' }),
    // 20,21,22
    orderCreationSuccess: () => dialog.open(OrderCreationSuccessDialogComponent, panel),
    importOrdersPreview: () => dialog.open(ImportOrdersPreviewDialogComponent, panel),
    duplicateFileWarning: () => dialog.open(DuplicateFileWarningDialogComponent, panel),
  };
}
