import type {
  ChatLLMModel,
  ChatLLMResponse,
  EmbeddingModel,
  EmbeddingResponse,
  ErrorResponse,
} from './types'

export class BaseProvider {
  static getProviderName(): string {
    return 'base'
  }

  static validateModel(_model: string): boolean {
    return false
  }

  async validate(_key: string): Promise<{ valid: boolean, message?: string }> {
    return { valid: true }
  }

  async chat(_key: string, _options: ChatLLMModel): Promise<ChatLLMResponse> {
    return {
      output: '',
    }
  }

  async embedding(_key: string, _options: EmbeddingModel): Promise<EmbeddingResponse> {
    return {
      data: [],
    }
  }

  protected handleError(error: any): ErrorResponse {
    return {
      message: error.message || 'Unknown error',
      type: error.type || 'internal_error',
      code: error.code || 'unknown',
      param: error.param,
    }
  }
}
