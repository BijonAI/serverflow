import type { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { Role, type ToolCall, type ToolMessage } from './types'

export class FunctionTool {
  name: string
  description: string
  parameters: z.ZodType
  func: (args: z.infer<typeof this.parameters>) => any = () => null

  constructor(name: string, description: string, parameters: z.ZodType) {
    this.name = name
    this.description = description
    this.parameters = parameters
  }

  call(func: (args: z.infer<typeof this.parameters>) => any) {
    this.func = func
  }

  schema() {
    return zodToJsonSchema(this.parameters)
  }
}

export class Toolkit {
  tools: FunctionTool[] = []

  add(tool: FunctionTool) {
    this.tools.push(tool)
  }

  execute(toolCalls: ToolCall[]): ToolMessage[] {
    return toolCalls.map((toolCall) => {
      const tool = this.tools.find(t => t.name === toolCall.name)
      if (!tool) {
        throw new Error(`Tool ${toolCall.name} not found`)
      }
      return {
        role: Role.Tool,
        content: tool.func(toolCall.arguments),
        _id: toolCall._id,
      }
    })
  }
}
