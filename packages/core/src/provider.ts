import type {
  AudioTranscriptionModel,
  AudioTranscriptionResponse,
  ChatLLMModel,
  ChatLLMResponse,
  ErrorResponse,
  ImageGenerationModel,
  ImageGenerationResponse,
} from './types'

export class BaseProvider {
  getProviderName(): string {
    return 'base'
  }

  getModels(): string[] {
    return []
  }

  async validate(_key: string): Promise<{ valid: boolean, message?: string }> {
    return { valid: true }
  }

  async chat(_key: string, _options: ChatLLMModel): Promise<ChatLLMResponse> {
    return {
      choices: [],
      usage: {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
      },
    }
  }

  async generateImage(_key: string, _options: ImageGenerationModel): Promise<ImageGenerationResponse> {
    return {
      created: Date.now(),
      data: [],
    }
  }

  async transcribeAudio(_key: string, _options: AudioTranscriptionModel): Promise<AudioTranscriptionResponse> {
    return {
      text: '',
    }
  }

  protected handleError(error: any): ErrorResponse {
    return {
      error: {
        message: error.message || 'Unknown error',
        type: error.type || 'internal_error',
        code: error.code || 'unknown',
        param: error.param,
      },
    }
  }
}
