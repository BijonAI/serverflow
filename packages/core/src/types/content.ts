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
