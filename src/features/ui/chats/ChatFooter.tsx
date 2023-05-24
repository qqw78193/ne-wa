import React, { FC, useState } from 'react'
import { ChatComponentPropsRef, MessageInput, MessageInputProps } from '@chatscope/chat-ui-kit-react'

import { ChatAPI } from '../../api/chatAPI'
import { useAuth } from '../../../shared/hooks'
import { ActiveChat } from '../../../shared/modules/chat'

interface ChatFooterProps extends ChatComponentPropsRef<MessageInputProps, 'div'> {
  as?: string | typeof MessageInput
  activeChat: ActiveChat
  getNewMessages: () => Promise<void>
}

export const ChatFooter: FC<ChatFooterProps> = ({ activeChat, getNewMessages }) => {
  const { idInstance, apiTokenInstance } = useAuth()

  const [ messageInputValue, setMessageInputValue ] = useState<string>('')
  const [ loading, setLoading ] = useState(false)

  const sendMessage = async () => {
    setLoading(true)

    try {
      idInstance && apiTokenInstance &&
        ChatAPI.sendMessage(idInstance, apiTokenInstance, `${activeChat.chatId}@c.us`, messageInputValue)

      await getNewMessages()

      setMessageInputValue('')
    } catch (error: any) {
      console.log(error) // TODO: notifications
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <MessageInput
      placeholder="Введите сообщение"
      value={messageInputValue}
      onChange={(messageInput: string) => setMessageInputValue(messageInput)}
      attachButton={false}
      disabled={loading}
      onSend={sendMessage}
    />
  )
}
