import type { ChatLLMModel, ChatLLMResponse } from './types'

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
      // text: '',
      // message: {
      //   role: Role.Assistant,
      //   content: '',
      // },
      choices: [],
      usage: {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
      },
    }
  }
}
