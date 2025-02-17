export type KeyMap = Map<string, string>

export interface WorkflowOptions {
  keys: KeyMap
}

export class BaseWorkflow {
  keys: KeyMap

  constructor(options: WorkflowOptions) {
    this.keys = options.keys
  }
}
