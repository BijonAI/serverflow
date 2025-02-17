export enum Role {
  System = 'system',
  User = 'user',
  Assistant = 'assistant',
  Tool = 'tool',
}

export type Content = string
export interface Message {
  role: Role
  content: Content
}

export interface BaseModel {
  temperature?: number
  maxTokens?: number
  model: string
}

export interface LLMModel extends BaseModel {
  topP?: number
  frequencyPenalty?: number
  presencePenalty?: number
  stop?: string[]
}

export interface ChatLLMModel extends LLMModel {
  messages: Message[]
}

export interface BaseResponse {
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

export interface LLMResponse extends BaseResponse {
  // text: string
}

export interface ChatLLMResponse extends LLMResponse {
  choices: {
    message: Message
    finish_reason: string
  }[]
}
