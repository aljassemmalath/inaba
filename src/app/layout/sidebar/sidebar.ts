import { AfterViewInit, Component, DestroyRef, ElementRef, inject, input, output, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_NAVIGATION } from '../../core/models/navigation.model';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, UserProfileComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent implements AfterViewInit {
  readonly mobileOpen = input(false);
  readonly closeMobile = output<void>();
  readonly logout = output<void>();
  readonly sections = APP_NAVIGATION;
  readonly hasOverflowBelow = signal(false);

  private readonly navScroll = viewChild<ElementRef<HTMLElement>>('navScroll');
  private readonly destroyRef = inject(DestroyRef);
  private resizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    queueMicrotask(() => this.updateOverflow());
    const el = this.navScroll()?.nativeElement;
    if (el && typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.updateOverflow());
      this.resizeObserver.observe(el);
      // Observe content size changes too
      if (el.firstElementChild) this.resizeObserver.observe(el.firstElementChild);
    }
    window.addEventListener('resize', this.updateOverflow);
    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
      window.removeEventListener('resize', this.updateOverflow);
    });
  }

  private readonly updateOverflow = (): void => {
    const el = this.navScroll()?.nativeElement;
    if (!el) { this.hasOverflowBelow.set(false); return; }
    const hasMore = el.scrollHeight - el.scrollTop - el.clientHeight > 1;
    this.hasOverflowBelow.set(hasMore);
  };

  onNavScroll(): void {
    this.updateOverflow();
  }

  onNavigate(): void {
    this.closeMobile.emit();
  }
}
