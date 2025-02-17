import type { ChatLLMModel, ChatLLMResponse } from '@serverflow/core'
import { BaseProvider, structMessages } from '@serverflow/core'

export class OpenAIProvider extends BaseProvider {
  getProviderName() {
    return 'openai'
  }

  getModels() {
    return [
      'gpt-4o',
      'gpt-4o-mini',
      'gpt-4',
      'gpt-3.5-turbo',
    ]
  }

  async chat(key: string, options: ChatLLMModel): Promise<ChatLLMResponse> {
    const req = {
      model: options.model,
      messages: structMessages(options.messages),
      temperature: options.temperature,
      max_tokens: options.maxTokens,
      top_p: options.topP,
      frequency_penalty: options.frequencyPenalty,
      presence_penalty: options.presencePenalty,
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(req),
    })

    const data = await response.json()

    return {
      choices: data.choices.map((choice: any) => ({
        message: choice.message,
        finish_reason: choice.finish_reason,
      })),
    }
  }
}
