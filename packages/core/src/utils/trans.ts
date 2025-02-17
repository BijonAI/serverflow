import type { Message } from '../types'

export function structMessages(messages: Message[]) {
  return messages.map((message) => {
    return {
      role: message.role,
      content: message.content,
    }
  })
}
