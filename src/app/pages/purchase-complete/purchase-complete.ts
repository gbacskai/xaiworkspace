import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { TelegramService } from '../../services/telegram.service';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-purchase-complete',
  standalone: true,
  templateUrl: './purchase-complete.html',
  styleUrl: './purchase-complete.scss',
})
export class PurchaseCompletePage implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private tg = inject(TelegramService);
  i18n = inject(I18nService);

  sessionId = '';

  private backHandler = () => {
    this.tg.haptic();
    this.router.navigate(['/']);
  };

  ngOnInit() {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      this.sessionId = params['session_id'] || '';
    });
    this.tg.showBackButton(this.backHandler);
  }

  ngOnDestroy() {
    this.tg.hideBackButton();
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
