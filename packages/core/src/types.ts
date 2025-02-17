export enum Role {
  System = 'system',
  User = 'user',
  Assistant = 'assistant',
  Tool = 'tool',
}

export enum ContentType {
  Text = 'text',
  Image = 'image',
  Audio = 'audio',
  Video = 'video',
}

export interface BaseContent {
  type: ContentType
  text?: string
}

export interface ImageContent extends BaseContent {
  type: ContentType.Image
  url?: string
  base64?: string
  width?: number
  height?: number
}

export interface AudioContent extends BaseContent {
  type: ContentType.Audio
  url?: string
  base64?: string
  duration?: number
}

export interface VideoContent extends BaseContent {
  type: ContentType.Video
  url?: string
  base64?: string
  duration?: number
}

export type Content = string | BaseContent | ImageContent | AudioContent | VideoContent

export interface Message {
  role: Role
  content: Content
  name?: string
  function_call?: {
    name: string
    arguments: string
  }
}

export interface BaseModel {
  model: string
  temperature?: number
  maxTokens?: number
  stream?: boolean
  tools?: Tool[]
  toolChoice?: string | { type: string, function: { name: string } }
  responseFormat?: { type: 'text' | 'json_object' }
  seed?: number
}

export interface Tool {
  type: 'function'
  function: {
    name: string
    description?: string
    parameters: Record<string, any>
  }
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

export interface ImageGenerationModel extends BaseModel {
  prompt: string
  n?: number
  size?: string
  quality?: 'standard' | 'hd'
  style?: string
  responseFormat?: 'url' | 'b64_json'
  user?: string
}

export interface AudioTranscriptionModel extends BaseModel {
  file: string | Blob
  language?: string
  prompt?: string
  responseFormat?: 'json' | 'text' | 'srt' | 'verbose_json' | 'vtt'
  temperature?: number
}

export interface ChatLLMModel extends LLMModel {
  messages: Message[]
}

export interface Usage {
  promptTokens: number
  completionTokens: number
  totalTokens: number
}

export interface BaseResponse {
  id?: string
  created?: number
  usage?: Usage
}

export interface LLMResponse extends BaseResponse {
  choices?: {
    text?: string
    index?: number
    finish_reason?: string
  }[]
}

export interface ChatLLMResponse extends BaseResponse {
  choices: {
    message: Message
    finish_reason: string
    index?: number
  }[]
}

export interface ImageGenerationResponse extends BaseResponse {
  created: number
  data: {
    url?: string
    b64_json?: string
    revised_prompt?: string
  }[]
}

export interface AudioTranscriptionResponse extends BaseResponse {
  text: string
  language?: string
  duration?: number
  segments?: {
    id: number
    start: number
    end: number
    text: string
  }[]
}

export interface ErrorResponse {
  error: {
    message: string
    type: string
    code: string
    param?: string
  }
}
