import { Component, inject } from '@angular/core';
import { RequestDetailsService } from '../request-details.service';

@Component({
  selector: 'app-rd-notes-tab',
  template: `
    @if (state.details(); as d) {
      <div class="content-card-body">
        <h3 style="margin:0 0 16px;font-size:16px;font-weight:600;color:var(--teal-500);">ملاحظات داخلية</h3>
        <div class="notes-list">
          @for (note of d.notes; track note.id) {
            <article class="content-card-body note-card">
              <div class="note-head"><strong>{{ note.author }}</strong><span dir="ltr">{{ note.dateTime }}</span></div>
              <p class="note-content">{{ note.content }}</p>
            </article>
          } @empty {
            <p style="color:var(--text-secondary);margin:0;">لا توجد ملاحظات داخلية.</p>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .notes-list { display:flex; flex-direction:column; gap:12px; }
    .note-card { box-shadow:none; border:1px solid var(--border-default); }
    .note-head { display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:8px; }
    .note-head span { color:var(--text-tertiary); font-size:var(--font-size-body-sm); }
    .note-content { margin:0; color:var(--text-secondary); font-size:var(--font-size-body-md); line-height:1.6; }
  `],
})
export class RdNotesTabComponent {
  readonly state = inject(RequestDetailsService);
}
