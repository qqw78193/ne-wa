import React, { FC, useState, useEffect } from 'react'
import { Message as MessageUI, MessageList, MessageListProps, Loader, Avatar } from '@chatscope/chat-ui-kit-react'

import { ChatAvatar } from '../../../entities/ui'
import { ActiveChat } from '../../../shared/modules/chat'
import { FakeServerAPI } from '../../api'

interface ChatContentProps extends MessageListProps {
  as?: string | typeof MessageList
  activeChat: ActiveChat
  setActiveChat: React.Dispatch<React.SetStateAction<ActiveChat>>
  getNewMessages: () => Promise<void>
}

export const ChatContent: FC<ChatContentProps> = ({ activeChat, setActiveChat, getNewMessages }) => {
  const [ loading, setLoading ] = useState<boolean>(false)

  const getChatMessagesHistory = async () => {
    setLoading(true)
    try {
      const { messages } = await FakeServerAPI.getChatMessages(activeChat.chatId)

      setActiveChat({ chatId: activeChat.chatId, messages })

      await getNewMessages()
    } catch (error: any) {
      console.log(error) // TODO: Notifications
      throw error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    activeChat.chatId && getChatMessagesHistory()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ activeChat.chatId ])

  return (<>
    {loading
      ? <Loader />
      : <MessageList>
        {activeChat.messages.map(message =>
          <MessageUI key={message.id} model={{
            message: message.text,
            direction: message.direction,
            position: 'single'
          }}>
            <ChatAvatar as={Avatar} />
          </MessageUI>
        )}
      </MessageList>
    }
  </>)
}
