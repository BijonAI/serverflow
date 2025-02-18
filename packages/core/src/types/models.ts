import type { Message, Tool, Usage } from './common'

export interface BaseModel {
  model: string
  temperature?: number
  maxTokens?: number
  stream?: boolean
  tools?: Tool[]
  responseFormat?: string
  seed?: number
}

export interface LLMModel extends BaseModel {
  topP?: number
  frequencyPenalty?: number
  presencePenalty?: number
  stop?: string[]
  n?: number
  logitBias?: Record<string, number>
  user?: string
}

export interface EmbeddingModel extends BaseModel {
  input: string
}

export interface ChatLLMModel extends LLMModel {
  messages: Message[]
}

export interface BaseResponse {
  id?: string
  created?: number
  usage?: Usage
}

export interface EmbeddingResponse extends BaseResponse {
  data: string[]
}

export interface LLMResponse extends BaseResponse {

}

export interface ChatLLMResponse extends LLMResponse {
  output: string
}

export interface ErrorResponse {
  message: string
  type: string
  code: string
  param?: string
}
