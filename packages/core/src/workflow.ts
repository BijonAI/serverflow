import type { BaseProvider } from './provider'
import { ChatContext } from './context'

export type KeyMap = Map<string, string>

export interface WorkflowResult {
  success: boolean
  error?: string
  result?: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

export interface WorkflowOptions {
  keys: KeyMap
  providers: (typeof BaseProvider)[]
}

export class BaseWorkflow {
  keys: KeyMap
  providers: (typeof BaseProvider)[]

  constructor(options: WorkflowOptions) {
    this.keys = options.keys
    this.providers = options.providers
  }

  createChatContext(): ChatContext {
    return new ChatContext({
      keys: this.keys,
      providers: this.providers,
    })
  }

  async run(input: string, count: number): Promise<WorkflowResult> {
    return {
      success: true,
      result: '',
    }
  }
}
