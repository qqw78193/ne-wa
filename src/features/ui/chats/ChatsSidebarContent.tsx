import React, { FC, useState, useEffect } from 'react'
import { Avatar, Conversation, ConversationList, ConversationListProps, Loader } from '@chatscope/chat-ui-kit-react'

import { ChatAvatar } from '../../../entities/ui'
import { FakeServerAPI } from '../../api'
import { ActiveChat, Chat } from '../../../shared/modules/chat'

interface ChatsSidebarContentProps extends ConversationListProps {
  as?: string | typeof ConversationList
  chats: Chat[]
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>
  setActiveChat: React.Dispatch<React.SetStateAction<ActiveChat>>
}

export const ChatsSidebarContent: FC<ChatsSidebarContentProps> = ({ chats, setChats, setActiveChat }) => {
  const [ loading, setLoading ] = useState(false)

  const getChats = async () => {
    setLoading(true)
    try {
      const { data } = await FakeServerAPI.getChats()

      setChats(data)
    } catch (error: any) {
      console.log(error) // TODO: Notifications

      throw error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getChats()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (<>
    {loading
      ? <Loader />
      : <ConversationList>
        {chats.map(chat =>
          <Conversation key={chat.id} onClick={() => setActiveChat({ chatId: chat.id, messages: [] })} name={chat.id}>
            <ChatAvatar as={Avatar} name={chat.id} />
          </Conversation>
        )}
      </ConversationList>
    }
  </>)
}
