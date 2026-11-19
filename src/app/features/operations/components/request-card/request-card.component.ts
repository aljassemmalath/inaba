import { Component, input, output } from '@angular/core';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge';
import { NeedsActionRequest, RequestAction } from '../../models/request.model';

@Component({
  selector: 'app-request-card',
  imports: [AppButtonComponent, StatusBadgeComponent],
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.scss',
})
export class RequestCardComponent {
  readonly request = input.required<NeedsActionRequest>();
  readonly action = output<{ request: NeedsActionRequest; action: RequestAction }>();

  onAction(req: NeedsActionRequest, act: RequestAction): void {
    this.action.emit({ request: req, action: act });
  }

  isViewAction(act: RequestAction): boolean {
    return act.key === 'view' || act.label === 'عرض الطلب';
  }
}
