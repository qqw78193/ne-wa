/// <reference types="react-scripts" />

import { Avatar, ConversationHeader, ConversationList, MessageInput, MessageList, Search } from '@chatscope/chat-ui-kit-react'
import type { AriaAttributes, DOMAttributes } from 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    as?: string | typeof Avatar | typeof MessageInput | typeof MessageList | typeof ConversationHeader
    | typeof Search | typeof ConversationList
  }
}

declare module 'react-s-alert'
