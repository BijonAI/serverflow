import type { BaseProvider } from './provider'
import type { ChatLLMResponse, Message, Role } from './types'
import type { KeyMap } from './workflow'

export type Memory = Message[]

export interface ContextOptions {
  keys: KeyMap
  providers: (typeof BaseProvider)[]
}

export class ChatContext {
  memory: Memory = []
  keys: KeyMap
  providers: (typeof BaseProvider)[]

  constructor(options: ContextOptions) {
    this.keys = options.keys
    this.providers = options.providers
  }

  add(role: Role, content: string) {
    this.memory.push({ role, content })
  }

  get(index: number) {
    return this.memory[index]
  }

  getLast() {
    return this.memory[this.memory.length - 1]
  }

  insert(index: number, role: Role, content: string) {
    this.memory.splice(index, 0, { role, content })
  }

  remove(index: number) {
    this.memory.splice(index, 1)
  }

  async request(model: string): Promise<ChatLLMResponse> {
    const Provider = this.providers.find(Provider => (new Provider()).getModels().includes(model))
    const key = this.keys.get((new Provider!().getProviderName() ?? '') ?? '')
    if (!Provider) {
      throw new Error(`Provider ${model} not found`)
    }
    const provider = new Provider()
    const response = await provider.chat(key!, {
      messages: this.memory,
      model,
    })
    return response
  }
}
