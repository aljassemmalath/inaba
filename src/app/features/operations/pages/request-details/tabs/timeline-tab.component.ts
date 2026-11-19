import { Component, inject } from '@angular/core';
import { TimelineComponent } from '../../../../../shared/components/timeline/timeline.component';
import { RequestDetailsService } from '../request-details.service';

@Component({
  selector: 'app-rd-timeline-tab',
  imports: [TimelineComponent],
  template: `
    @if (state.details(); as d) {
      <div class="content-card-body">
        <h3 style="margin:0 0 16px;font-size:16px;font-weight:600;color:var(--teal-500);">الجدول الزمني</h3>
        <app-timeline [events]="d.timeline" />
      </div>
    }
  `,
})
export class RdTimelineTabComponent {
  readonly state = inject(RequestDetailsService);
}
