import type { AssistantMessage, Message, ToolMessage } from '../types'

export function convertMessages(messages: Message[]) {
  return messages.map((message) => {
    const base = {
      role: message.role.toLowerCase(),
      content: message.content,
    }

    if (message.role === 'assistant') {
      const assistantMessage = message as AssistantMessage
      if (assistantMessage.toolCalls) {
        return {
          ...base,
          tool_calls: assistantMessage.toolCalls.map(call => ({
            id: call._id,
            type: call.type,
            function: {
              name: call.name,
              arguments: JSON.stringify(call.arguments),
            },
          })),
        }
      }
    }

    if (message.role === 'tool') {
      const toolMessage = message as ToolMessage
      return {
        ...base,
        tool_call_id: toolMessage._id,
      }
    }

    return base
  })
}
