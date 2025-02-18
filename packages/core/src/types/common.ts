import type { Content, Role } from './content'

export interface ToolCall {
  name: string
  type: 'function'
  arguments: unknown
}

export interface Message {
  role: Role
  content: Content
}

export interface SystemMessage extends Message {
  role: Role.System
}

export interface UserMessage extends Message {
  role: Role.User
}

export interface AssistantMessage extends Message {
  role: Role.Assistant
  toolCalls?: ToolCall[]
}

export interface ToolMessage extends Message {
  role: Role.Tool
}

export interface Tool {
  name: string
  description?: string
  parameters: Record<string, any>
}

export interface Usage {
  promptTokens: number
  completionTokens: number
  totalTokens: number
}
