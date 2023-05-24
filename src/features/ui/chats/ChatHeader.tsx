import { FC, useState } from 'react'
import { Avatar, ConversationHeader, ConversationHeaderProps } from '@chatscope/chat-ui-kit-react'

import { ChatAvatar } from '../../../entities/ui'
import { Button } from '../../../shared/ui'
import { ActiveChat } from '../../../shared/modules/chat'

interface ChatHeaderProps extends ConversationHeaderProps {
  as?: string | typeof ConversationHeader
  activeChat: ActiveChat
  getNewMessages: () => Promise<void>
}

export const ChatHeader: FC<ChatHeaderProps> = ({ activeChat, getNewMessages }) => {
  const [ loading, setLoading ] = useState(false)

  const updateChat = async () => {
    setLoading(true)

    try {
      await getNewMessages()
    } catch (error: any) {
      console.log(error) // TODO: Notifications
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <ConversationHeader>
      {activeChat.chatId && <ChatAvatar as={Avatar} />}
      <ConversationHeader.Content>
        <span>{activeChat.chatId ? activeChat.chatId : 'Выберите чат'}</span>
        {activeChat.chatId && <Button
          text='Обновить чат'
          onClick={updateChat}
          disabled={loading}
        />}
      </ConversationHeader.Content>
    </ConversationHeader>
  )
}
