import { Component, inject, OnInit, OnDestroy, computed, signal, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TelegramService } from '../../services/telegram.service';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { ToastService } from '../../services/toast.service';
import { I18nService, LOCALE_LABELS } from '../../i18n/i18n.service';
import { FullArticle, SupportedLocale, SUPPORTED_LOCALES } from '../../i18n/i18n.types';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage implements OnInit, OnDestroy {
  private router = inject(Router);
  private chat = inject(ChatService);
  tg = inject(TelegramService);
  auth = inject(AuthService);
  i18n = inject(I18nService);
  private toast = inject(ToastService);
  private linkTimers: ReturnType<typeof setTimeout>[] = [];

  linkingProvider = signal<string | null>(null);

  private authFailedEffect = effect(() => {
    this.auth.authFailed(); // track the signal
    this.linkingProvider.set(null);
  }, { allowSignalWrites: true });

  locales = SUPPORTED_LOCALES;
  localeLabels = LOCALE_LABELS;
  langOpen = signal(false);
  isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  linkedProviders = computed(() => {
    const list: { key: string; label: string }[] = [];
    if (this.auth.webUser()) list.push({ key: 'telegram', label: 'Telegram' });
    if (this.auth.googleUser()) list.push({ key: 'google', label: 'Google' });
    if (this.auth.githubUser()) list.push({ key: 'github', label: 'GitHub' });
    if (this.auth.linkedinUser()) list.push({ key: 'linkedin', label: 'LinkedIn' });
    return list;
  });

  essentials = computed(() => this.i18n.articles().filter(a => a.category === 'essentials'));
  features = computed(() => this.i18n.articles().filter(a => a.category === 'features'));
  guides = computed(() => this.i18n.articles().filter(a => a.category === 'guides'));

  waitlistEmail = signal('');
  waitlistLoading = signal(false);
  waitlistSubmitted = signal(false);

  ngOnInit() {
    this.tg.hideBackButton();
  }

  ngOnDestroy() {
    this.linkTimers.forEach(t => clearTimeout(t));
  }

  private pollUntil(check: () => boolean, onSuccess: () => void, maxAttempts = 60) {
    let attempts = 0;
    const poll = () => {
      if (check()) { onSuccess(); return; }
      if (++attempts >= maxAttempts) { this.linkingProvider.set(null); return; }
      this.linkTimers.push(setTimeout(poll, 500));
    };
    this.linkTimers.push(setTimeout(poll, 1000));
  }

  open(article: FullArticle) {
    this.tg.haptic();
    this.router.navigate(['/article', article.id]);
  }

  toggleLang() {
    this.langOpen.update(v => !v);
  }

  selectLang(loc: SupportedLocale) {
    this.tg.haptic();
    this.i18n.setLocale(loc);
    this.langOpen.set(false);
  }

  onLangKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.langOpen.set(false);
      return;
    }
    if (!this.langOpen()) return;
    const idx = this.locales.indexOf(this.i18n.locale());
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = (idx + 1) % this.locales.length;
      this.selectLang(this.locales[next]);
      this.langOpen.set(true);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prev = (idx - 1 + this.locales.length) % this.locales.length;
      this.selectLang(this.locales[prev]);
      this.langOpen.set(true);
    }
  }

  loginWithTelegram() {
    this.tg.haptic();
    this.linkingProvider.set('telegram');
    this.auth.openTelegramLogin();
    this.startLinkingTimeout();
  }

  loginWithGoogle() {
    this.tg.haptic();
    this.linkingProvider.set('google');
    this.auth.loginWithGoogle();
    this.startLinkingTimeout();
  }

  loginWithGithub() {
    this.tg.haptic();
    this.linkingProvider.set('github');
    this.auth.loginWithGithub();
    this.startLinkingTimeout();
  }

  loginWithLinkedin() {
    this.tg.haptic();
    this.linkingProvider.set('linkedin');
    this.auth.loginWithLinkedin();
    this.startLinkingTimeout();
  }

  private startLinkingTimeout(): void {
    const timer = setTimeout(() => {
      if (this.linkingProvider()) {
        this.toast.show('Popup may be blocked. Check your browser settings.', 'error', 5000);
        this.linkingProvider.set(null);
      }
    }, 30000);
    this.linkTimers.push(timer);
  }

  linkTelegram() {
    this.tg.haptic();
    this.linkingProvider.set('telegram');
    this.auth.openTelegramLogin();
    this.pollUntil(
      () => !!this.auth.webUser(),
      () => { this.linkingProvider.set(null); this.chat.sendLinkProvider('telegram', { ...this.auth.webUser()! }); },
    );
    this.startLinkingTimeout();
  }

  linkGoogle() {
    this.tg.haptic();
    this.linkingProvider.set('google');
    this.auth.loginWithGoogle();
    this.pollUntil(
      () => !!this.auth.getGoogleAuthPayload(),
      () => { this.linkingProvider.set(null); this.chat.sendLinkProvider('google', { code: this.auth.getGoogleAuthPayload()!.code }); },
    );
    this.startLinkingTimeout();
  }

  linkGithub() {
    this.tg.haptic();
    this.linkingProvider.set('github');
    this.auth.loginWithGithub();
    this.pollUntil(
      () => !!this.auth.githubUser(),
      () => { this.linkingProvider.set(null); this.chat.sendLinkProvider('github', { code: this.auth.githubUser()!.code }); },
    );
    this.startLinkingTimeout();
  }

  linkLinkedin() {
    this.tg.haptic();
    this.linkingProvider.set('linkedin');
    this.auth.loginWithLinkedin();
    this.pollUntil(
      () => !!this.auth.linkedinUser(),
      () => { this.linkingProvider.set(null); this.chat.sendLinkProvider('linkedin', { code: this.auth.linkedinUser()!.code }); },
    );
    this.startLinkingTimeout();
  }

  private getUtmSource(): string {
    const params = new URLSearchParams(window.location.search);
    const parts = [
      params.get('utm_source'),
      params.get('utm_medium'),
      params.get('utm_campaign'),
    ].filter(Boolean);
    return parts.length ? parts.join('/') : 'website';
  }

  async submitWaitlist(event: Event) {
    event.preventDefault();
    const email = this.waitlistEmail().trim();
    if (!email) return;
    this.waitlistLoading.set(true);
    try {
      const res = await fetch(`${environment.routerUrl}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: this.getUtmSource() }),
      });
      if (res.ok) {
        this.waitlistSubmitted.set(true);
      } else {
        this.toast.show('Something went wrong. Please try again.', 'error');
      }
    } catch {
      this.toast.show('Network error. Please try again.', 'error');
    } finally {
      this.waitlistLoading.set(false);
    }
  }

  logoutProvider(provider: string) {
    this.auth.logoutProvider(provider);
  }
}
