import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { marked } from 'marked';
import { TelegramService } from '../../services/telegram.service';
import { ARTICLES } from '../../data/articles';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article.html',
  styleUrl: './article.scss',
})
export class ArticlePage implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tg = inject(TelegramService);

  title = signal('');
  subtitle = signal('');
  icon = signal('');
  html = signal('');

  private backHandler = () => {
    this.tg.haptic();
    this.router.navigate(['/']);
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const article = ARTICLES.find(a => a.id === id);

    if (!article) {
      this.router.navigate(['/']);
      return;
    }

    this.title.set(article.title);
    this.subtitle.set(article.subtitle);
    this.icon.set(article.icon);
    this.html.set(marked.parse(article.content.trim()) as string);

    this.tg.showBackButton(this.backHandler);
  }

  ngOnDestroy() {
    this.tg.hideBackButton();
  }
}
