import type { ChatLLMModel, ChatLLMResponse } from '@serverflow/core'
import { BaseProvider, convertMessages } from '@serverflow/core'

export class OpenAIProvider extends BaseProvider {
  static getProviderName() {
    return 'openai'
  }

  static validateModel(model: string): boolean {
    return model.startsWith('gpt-')
  }

  async chat(key: string, options: ChatLLMModel): Promise<ChatLLMResponse> {
    const body = {
      model: options.model,
      messages: convertMessages(options.messages),
      temperature: options.temperature,
      max_tokens: options.maxTokens,
      top_p: options.topP,
      frequency_penalty: options.frequencyPenalty,
      presence_penalty: options.presencePenalty,
      stream: options.stream,
    }
  }
}
