import { Component, input } from '@angular/core';

export interface TimelineEvent {
  title: string;
  dateTime: string;
  description: string;
  actor: string;
  role: string;
}

@Component({
  selector: 'app-timeline',
  template: `
    <div class="timeline" role="list">
      @for (ev of events(); track ev.title + ev.dateTime) {
        <article class="timeline-item" role="listitem">
          <div class="timeline-marker" aria-hidden="true"></div>
          <div class="timeline-content">
            <div class="timeline-head">
              <h4 class="timeline-title">{{ ev.title }}</h4>
              <span class="timeline-time" dir="ltr">{{ ev.dateTime }}</span>
            </div>
            <p class="timeline-desc">{{ ev.description }}</p>
            <div class="timeline-meta">{{ ev.actor }} — {{ ev.role }}</div>
          </div>
        </article>
      }
    </div>
  `,
  styles: [`
    .timeline { position: relative; padding-inline-start: 22px; }
    .timeline::before { content: ""; position: absolute; inset-inline-start: 5px; top: 8px; bottom: 8px; width: 2px; background: var(--border-default); }
    .timeline-item { position: relative; padding: 0 0 18px 0; display: block; }
    .timeline-item:last-child { padding-bottom: 0; }
    .timeline-marker {
      position: absolute; inset-inline-start: -22px; top: 4px; width: 12px; height: 12px; border-radius: 50%;
      background: #fff; border: 2px solid var(--action-primary-default); box-sizing: border-box;
    }
    .timeline-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
    .timeline-title { margin: 0; font-size: var(--font-size-body-md); font-weight: 600; color: var(--text-primary); }
    .timeline-time { font-size: var(--font-size-body-sm); color: var(--text-tertiary); }
    .timeline-desc { margin: 4px 0 0; font-size: var(--font-size-body-sm); color: var(--text-secondary); }
    .timeline-meta { margin-top: 4px; font-size: 12px; color: var(--text-tertiary); }
  `],
})
export class TimelineComponent {
  readonly events = input.required<TimelineEvent[]>();
}
