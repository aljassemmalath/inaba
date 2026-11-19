import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { NewOrderValue } from './new-order.models';

export interface NewOrderSubmitResult {
  success: boolean;
  orderNumber: string;
}

/** Mock submission; replace implementation with API integration while keeping this interface. */
@Injectable({ providedIn: 'root' })
export class NewOrderService {
  submit(value: NewOrderValue): Observable<NewOrderSubmitResult> {
    return of({ success: true, orderNumber: String(Math.floor(100000 + Math.random() * 900000)) }).pipe(delay(400));
  }
}
