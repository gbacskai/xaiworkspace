import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div class="toast-container" role="status" aria-live="polite">
      @for (t of toast.toasts(); track t.id) {
        <div class="toast-pill" [class]="'toast-pill--' + t.type">
          {{ t.message }}
          <button class="toast-dismiss" (click)="toast.dismiss(t.id)" aria-label="Dismiss">&times;</button>
        </div>
      }
    </div>
  `,
  styles: `
    .toast-container {
      position: fixed;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      pointer-events: none;
    }

    .toast-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 18px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      color: #fff;
      animation: toastIn 0.25s ease;
      pointer-events: auto;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .toast-pill--success { background: #34c759; }
    .toast-pill--error { background: #e53935; }
    .toast-pill--info { background: var(--tg-theme-button-color, #2678b6); }

    .toast-dismiss {
      background: none;
      border: none;
      color: inherit;
      font-size: 16px;
      line-height: 1;
      cursor: pointer;
      padding: 0 2px;
      opacity: 0.7;

      &:hover { opacity: 1; }
    }

    @keyframes toastIn {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,
})
export class ToastComponent {
  toast = inject(ToastService);
}
