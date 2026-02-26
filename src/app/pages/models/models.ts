import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TelegramService } from '../../services/telegram.service';
import { I18nService } from '../../i18n/i18n.service';
import { BackButtonComponent } from '../../components/back-button/back-button';

interface ModelInfo {
  id: string;
  name: string;
  description: string;
  bestFor: string;
  example: string;
  benefit: string;
}

export interface ProviderGroup {
  provider: string;
  description: string;
  models: ModelInfo[];
}

const PROVIDER_GROUPS: ProviderGroup[] = [
  {
    provider: 'Anthropic',
    description: 'Claude models — direct API',
    models: [
      {
        id: 'claude-sonnet-4-6',
        name: 'Claude Sonnet 4.6',
        description: 'Balanced — fast responses with strong reasoning',
        bestFor: 'Everyday tasks: emails, summaries, Q&A',
        example: 'Summarise this article and list 3 key takeaways',
        benefit: 'Best balance of speed, cost, and capability',
      },
      {
        id: 'claude-opus-4-6',
        name: 'Claude Opus 4.6',
        description: 'Most capable for deep analysis and complex tasks',
        bestFor: 'Research, long documents, multi-step reasoning',
        example: 'Analyse this contract and flag all liability clauses',
        benefit: 'Highest accuracy on complex, nuanced problems',
      },
      {
        id: 'claude-haiku-4-5',
        name: 'Claude Haiku 4.5',
        description: 'Lightweight and ultra-fast for simple interactions',
        bestFor: 'Quick lookups, translations, simple formatting',
        example: 'Convert this list to a markdown table',
        benefit: 'Fastest responses, lowest token cost',
      },
    ],
  },
  {
    provider: 'OpenAI',
    description: 'GPT and reasoning models',
    models: [
      {
        id: 'gpt-4o',
        name: 'GPT-4o',
        description: 'Versatile with strong structured-output capabilities',
        bestFor: 'JSON generation, data extraction, function calls',
        example: 'Extract all dates and amounts from this invoice as JSON',
        benefit: 'Excellent at producing clean, structured output',
      },
      {
        id: 'gpt-4o-mini',
        name: 'GPT-4o Mini',
        description: 'Fast and cost-efficient for straightforward tasks',
        bestFor: 'Quick summaries, simple Q&A, light formatting',
        example: 'Rewrite this paragraph in a more formal tone',
        benefit: 'Low cost with solid general performance',
      },
      {
        id: 'o3-mini',
        name: 'o3-mini',
        description: 'Reasoning model for complex logical problems',
        bestFor: 'Math, logic puzzles, multi-step code reasoning',
        example: 'Prove that the sum of two even numbers is always even',
        benefit: 'Strong chain-of-thought reasoning at moderate cost',
      },
    ],
  },
  {
    provider: 'Google',
    description: 'Gemini models — large context, multimodal',
    models: [
      {
        id: 'gemini-2.5-pro',
        name: 'Gemini 2.5 Pro',
        description: 'Advanced reasoning with massive context window',
        bestFor: 'Long documents, complex analysis, multimodal input',
        example: 'Read this 200-page PDF and create an executive summary',
        benefit: 'Handles the largest context windows available',
      },
      {
        id: 'gemini-2.0-flash',
        name: 'Gemini 2.0 Flash',
        description: 'Fast and cost-efficient for high-throughput tasks',
        bestFor: 'Quick responses, batch processing, simple queries',
        example: 'Classify these 50 support tickets by category',
        benefit: 'Very low cost with fast response times',
      },
    ],
  },
  {
    provider: 'Mistral',
    description: 'European AI — multilingual, EU-hosted',
    models: [
      {
        id: 'mistral-large-latest',
        name: 'Mistral Large',
        description: 'Flagship model with strong multilingual support',
        bestFor: 'Multilingual content, enterprise tasks, European compliance',
        example: 'Translate this legal document from German to English',
        benefit: 'Top-tier multilingual and European language performance',
      },
      {
        id: 'mistral-small-latest',
        name: 'Mistral Small',
        description: 'Fast and efficient for everyday tasks',
        bestFor: 'Quick responses, simple generation, cost-sensitive workloads',
        example: 'Draft a short reply to this customer email',
        benefit: 'Very low cost with EU data compliance',
      },
      {
        id: 'codestral-latest',
        name: 'Codestral',
        description: 'Specialised for code generation and review',
        bestFor: 'Writing code, debugging, code explanations',
        example: 'Refactor this function to use async/await instead of callbacks',
        benefit: 'Purpose-built for programming tasks',
      },
    ],
  },
  {
    provider: 'Groq',
    description: 'Open-source models — ultra-fast inference',
    models: [
      {
        id: 'llama-3.3-70b-versatile',
        name: 'Llama 3.3 70B',
        description: "Meta's flagship open-source model on fast hardware",
        bestFor: 'General tasks where speed and low cost matter most',
        example: 'Summarise the key points of this meeting transcript',
        benefit: 'Near-instant responses at a fraction of the cost',
      },
      {
        id: 'mixtral-8x7b-32768',
        name: 'Mixtral 8x7B',
        description: 'Mixture-of-experts with 32K context window',
        bestFor: 'Balanced speed and quality, longer context tasks',
        example: 'Compare these two product specs and highlight differences',
        benefit: 'Good quality with 32K context at very low cost',
      },
      {
        id: 'gemma2-9b-it',
        name: 'Gemma 2 9B',
        description: "Google's lightweight open model for simple tasks",
        bestFor: 'Simple formatting, quick lookups, basic generation',
        example: 'Fix the grammar and punctuation in this paragraph',
        benefit: 'Lowest cost option available',
      },
    ],
  },
  {
    provider: 'Amazon Bedrock',
    description: 'AWS-hosted models — Claude, Nova, Llama, Titan',
    models: [
      {
        id: 'bedrock-claude-opus-4.6',
        name: 'Bedrock Claude Opus 4.6',
        description: 'Claude Opus routed through AWS infrastructure',
        bestFor: 'Complex tasks requiring AWS data residency',
        example: 'Analyse this compliance report and list all findings',
        benefit: 'Top-tier Claude via AWS with enterprise compliance',
      },
      {
        id: 'bedrock-claude-sonnet-4.6',
        name: 'Bedrock Claude Sonnet 4.6',
        description: 'Claude Sonnet routed through AWS infrastructure',
        bestFor: 'Everyday tasks with AWS data residency requirements',
        example: 'Summarise this quarterly earnings call transcript',
        benefit: 'Balanced Claude model via AWS',
      },
      {
        id: 'bedrock-claude-haiku-4.5',
        name: 'Bedrock Claude Haiku 4.5',
        description: 'Claude Haiku routed through AWS infrastructure',
        bestFor: 'Quick tasks with AWS data residency requirements',
        example: 'Extract the key dates from this email thread',
        benefit: 'Fast, low-cost Claude via AWS',
      },
      {
        id: 'nova-premier',
        name: 'Nova Premier',
        description: "Amazon's most capable model for complex tasks",
        bestFor: 'Complex reasoning, agentic workflows, enterprise use',
        example: 'Build a step-by-step plan to migrate this database',
        benefit: 'Strong reasoning with native AWS integration',
      },
      {
        id: 'nova-pro',
        name: 'Nova Pro',
        description: 'Balanced Amazon model for general-purpose use',
        bestFor: 'General tasks, document processing, Q&A',
        example: 'Create a summary of this technical specification',
        benefit: 'Good all-round performance at moderate cost',
      },
      {
        id: 'nova-lite',
        name: 'Nova Lite',
        description: 'Fast and cost-efficient for simple workloads',
        bestFor: 'Quick answers, simple formatting, high volume',
        example: 'Reformat this data as a bulleted list',
        benefit: 'Very low cost with fast responses',
      },
      {
        id: 'nova-micro',
        name: 'Nova Micro',
        description: 'Ultra-lightweight for the simplest tasks',
        bestFor: 'Text classification, entity extraction, basic Q&A',
        example: 'Is this review positive, negative, or neutral?',
        benefit: 'Lowest cost Amazon model',
      },
      {
        id: 'bedrock-llama-4-maverick',
        name: 'Llama 4 Maverick',
        description: "Meta's latest mixture-of-experts via Bedrock",
        bestFor: 'Creative writing, brainstorming, general reasoning',
        example: 'Write three different taglines for this product launch',
        benefit: 'Strong open-source model with AWS hosting',
      },
      {
        id: 'bedrock-llama-4-scout',
        name: 'Llama 4 Scout',
        description: "Meta's efficient model with large context on Bedrock",
        bestFor: 'Long-context tasks, document analysis at low cost',
        example: 'Find all action items mentioned across these meeting notes',
        benefit: 'Large context window at low cost via AWS',
      },
      {
        id: 'titan-text-large',
        name: 'Titan Text Large',
        description: "Amazon's general-purpose text generation model",
        bestFor: 'Basic text generation, summarisation, paraphrasing',
        example: 'Paraphrase this paragraph in simpler language',
        benefit: 'Native AWS model with straightforward pricing',
      },
    ],
  },
];

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
