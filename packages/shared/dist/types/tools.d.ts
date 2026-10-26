/**
 * AI Tool & Conversation Engine Types
 */
import { NormalizedProduct, CartOperationResult } from './commerce.js';
export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant' | 'system' | 'tool';
    content: string;
    timestamp: number;
    toolCallId?: string;
    toolName?: string;
    toolResult?: unknown;
}
export interface QuickReplyOption {
    label: string;
    actionText: string;
    category?: 'product' | 'faq' | 'calculator' | 'support';
}
export interface ChatResponse {
    conversationId: string;
    message: string;
    role: 'assistant';
    productCards?: NormalizedProduct[];
    quickReplies?: QuickReplyOption[];
    cartAction?: CartOperationResult | {
        type: string;
        productId?: string;
        item?: any;
        title?: string;
    };
    toolExecuted?: {
        toolName: string;
        params: Record<string, unknown>;
        resultSummary: string;
    };
    languageDetected?: string;
}
export interface TileCalculatorParams {
    lengthFeet?: number;
    widthFeet?: number;
    totalAreaSqFt?: number;
    tileSizeInches?: {
        length: number;
        width: number;
    };
    wastagePercent?: number;
    selectedProductId?: string;
    boxCoverageSqFt?: number;
    boxPrice?: number;
}
export interface TileCalculatorResult {
    roomAreaSqFt: number;
    wastageSqFt: number;
    totalRequiredAreaSqFt: number;
    tilesNeeded: number;
    boxesNeeded: number;
    boxCoverageSqFt: number;
    estimatedTotalCost?: number;
    currency?: string;
    formattedEstimatedCost?: string;
    breakdown: string;
}
export interface ShoeSizeFinderParams {
    footLengthCm?: number;
    footLengthInches?: number;
    currentBrandSize?: string;
    targetGender?: 'men' | 'women' | 'kids';
}
export interface ShoeSizeFinderResult {
    recommendedEuSize: number;
    recommendedUsSize: number;
    recommendedUkSize: number;
    footLengthCm: number;
    fitTips: string;
}
//# sourceMappingURL=tools.d.ts.map