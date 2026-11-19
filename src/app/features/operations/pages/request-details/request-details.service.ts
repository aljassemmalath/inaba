import { Injectable, signal } from '@angular/core';
import { RequestDetails } from '../../models/request-details.model';
import { getRequestDetails } from '../../data/mock-request-details';

@Injectable()
export class RequestDetailsService {
  readonly details = signal<RequestDetails | null>(null);
  load(id: string): void {
    this.details.set(getRequestDetails(id));
  }
}
