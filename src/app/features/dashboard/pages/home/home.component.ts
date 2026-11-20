import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertCardComponent } from '../../../../shared/components/alert-card/alert-card.component';
import { ContentCardComponent } from '../../../../shared/components/content-card/content-card.component';
import { DataTableColumn, DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { FinancialSummaryCardComponent } from '../../../../shared/components/financial-summary-card/financial-summary-card.component';
import { IconPlaceholderComponent } from '../../../../shared/components/icon-placeholder/icon-placeholder.component';
import { PageBannerComponent } from '../../../../shared/components/page-banner/page-banner.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge';
import { MonthlyOrdersChartComponent } from '../../components/monthly-orders-chart/monthly-orders-chart.component';
import { OrdersByProductChartComponent } from '../../components/orders-by-product-chart/orders-by-product-chart.component';
import {
  DASHBOARD_ALERTS,
  FINANCIAL_SUMMARY,
  LATEST_ORDERS,
  LatestOrderRow,
  MONTHLY_ORDERS,
  ORDERS_BY_PRODUCT_TOTAL,
  PRODUCT_SHARES,
} from '../../data/dashboard.data';

interface HomeStatCard {
  title: string;
  value: string;
  modifierClass: string;
  iconSrc: string;
}

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    PageBannerComponent,
    ContentCardComponent,
    AlertCardComponent,
    FinancialSummaryCardComponent,
    IconPlaceholderComponent,
    MonthlyOrdersChartComponent,
    OrdersByProductChartComponent,
    DataTableComponent,
    StatusBadgeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly stats: HomeStatCard[] = [
    { title: 'إجمالي الطلبات', value: '1,284', modifierClass: 'home-stat--total', iconSrc: 'assets/images/svg/Home-page/total-requests.svg' },
    { title: 'طلبات بانتظار الإسناد', value: '17', modifierClass: 'home-stat--pending', iconSrc: 'assets/images/svg/Home-page/requests-awaiting-assignment.svg' },
    { title: 'طلبات مكتملة', value: '942', modifierClass: 'home-stat--completed', iconSrc: 'assets/images/svg/Home-page/completed-requests.svg' },
    { title: 'طلبات قيد التنفيذ', value: '286', modifierClass: 'home-stat--in-progress', iconSrc: 'assets/images/svg/Home-page/requests-in-progress.svg' },
    { title: 'مشاكل مفتوحة', value: '9', modifierClass: 'home-stat--issues', iconSrc: 'assets/images/svg/Home-page/open-issues.svg' },
  ];
  readonly alerts = [...DASHBOARD_ALERTS, ...DASHBOARD_ALERTS];
  readonly financial = FINANCIAL_SUMMARY;
  readonly monthlyOrders = MONTHLY_ORDERS;
  readonly productShares = PRODUCT_SHARES;
  readonly productTotal = ORDERS_BY_PRODUCT_TOTAL;
  readonly latestOrders = LATEST_ORDERS;

  readonly latestColumns: DataTableColumn<LatestOrderRow>[] = [
    { key: 'orderNumber', header: 'رقم الطلب' },
    { key: 'beneficiary', header: 'المستفيد' },
    { key: 'product', header: 'المنتج' },
    { key: 'status', header: 'الحالة' },
  ];
}
