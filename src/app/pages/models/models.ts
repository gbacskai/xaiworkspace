import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TelegramService } from '../../services/telegram.service';
import { I18nService } from '../../i18n/i18n.service';
import { UiStrings } from '../../i18n/i18n.types';
import { BackButtonComponent } from '../../components/back-button/back-button';

interface ModelInfo {
  id: string;
  name: string;
}

export interface ProviderGroup {
  provider: string;
  providerKey: string;
  models: ModelInfo[];
}

const PROVIDER_GROUPS: ProviderGroup[] = [
  {
    provider: 'Anthropic',
    providerKey: 'anthropic',
    models: [
      { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6' },
      { id: 'claude-opus-4-6', name: 'Claude Opus 4.6' },
      { id: 'claude-haiku-4-5', name: 'Claude Haiku 4.5' },
    ],
  },
  {
    provider: 'OpenAI',
    providerKey: 'openai',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o' },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
      { id: 'o3-mini', name: 'o3-mini' },
    ],
  },
  {
    provider: 'Google',
    providerKey: 'google',
    models: [
      { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
      { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
    ],
  },
  {
    provider: 'Mistral',
    providerKey: 'mistral',
    models: [
      { id: 'mistral-large-latest', name: 'Mistral Large' },
      { id: 'mistral-small-latest', name: 'Mistral Small' },
      { id: 'codestral-latest', name: 'Codestral' },
    ],
  },
  {
    provider: 'Groq',
    providerKey: 'groq',
    models: [
      { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B' },
      { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B' },
      { id: 'gemma2-9b-it', name: 'Gemma 2 9B' },
    ],
  },
  {
    provider: 'Amazon Bedrock',
    providerKey: 'amazon-bedrock',
    models: [
      { id: 'bedrock-claude-opus-4.6', name: 'Bedrock Claude Opus 4.6' },
      { id: 'bedrock-claude-sonnet-4.6', name: 'Bedrock Claude Sonnet 4.6' },
      { id: 'bedrock-claude-haiku-4.5', name: 'Bedrock Claude Haiku 4.5' },
      { id: 'nova-premier', name: 'Nova Premier' },
      { id: 'nova-pro', name: 'Nova Pro' },
      { id: 'nova-lite', name: 'Nova Lite' },
      { id: 'nova-micro', name: 'Nova Micro' },
      { id: 'bedrock-llama-4-maverick', name: 'Llama 4 Maverick' },
      { id: 'bedrock-llama-4-scout', name: 'Llama 4 Scout' },
      { id: 'titan-text-large', name: 'Titan Text Large' },
    ],
  },
];

const BEDROCK_VISIBLE = 3;

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [BackButtonComponent],
  templateUrl: './models.html',
  styleUrl: './models.scss',
})
export class ModelsPage implements OnInit, OnDestroy {
  private router = inject(Router);
  private tg = inject(TelegramService);
  i18n = inject(I18nService);

  providerGroups = PROVIDER_GROUPS;
  bedrockExpanded = signal(false);

  mt(key: string): string {
    return this.i18n.t(key as keyof UiStrings);
  }

  toggleBedrock(): void {
    this.bedrockExpanded.update(v => !v);
  }

  visibleModels(group: ProviderGroup): ModelInfo[] {
    if (group.providerKey !== 'amazon-bedrock' || this.bedrockExpanded()) {
      return group.models;
    }
    return group.models.slice(0, BEDROCK_VISIBLE);
  }

  bedrockHiddenCount(): number {
    const bedrock = this.providerGroups.find(g => g.providerKey === 'amazon-bedrock');
    return bedrock ? bedrock.models.length - BEDROCK_VISIBLE : 0;
  }

  private backHandler = () => {
    this.tg.haptic();
    this.router.navigate(['/']);
  };

  ngOnInit() {
    this.tg.showBackButton(this.backHandler);
  }

  ngOnDestroy() {
    this.tg.hideBackButton();
  }
}
