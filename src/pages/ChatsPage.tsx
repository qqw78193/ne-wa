import { useState, useEffect, useCallback } from 'react'
import { ChatContainer, ConversationHeader, ConversationList, MainContainer, MessageInput, MessageList, Search, Sidebar } from '@chatscope/chat-ui-kit-react'
import { useNavigate } from 'react-router-dom'

import { ChatContent, ChatHeader, ChatsSidebarContent, ChatsSidebarHeader } from '../features/ui/chats'
import { useAuth } from '../shared/hooks'
import { AppRoutes } from '../shared/constants/routes'
import { ActiveChat, Chat, Message } from '../shared/modules/chat'
import { ChatAPI, FakeServerAPI } from '../features/api'
import { ChatFooter } from '../features/ui/chats/ChatFooter'
import { messageCreator } from '../shared/helpers'

const ChatsPage = () => {
  const navigate = useNavigate()
  const { idInstance, apiTokenInstance, isAuthenticated } = useAuth()

  const [ chats, setChats ] = useState<Chat[]>([])
  const [ activeChat, setActiveChat ] = useState<ActiveChat>({ chatId: '', messages: [] })

  const getNewMessages = useCallback(async () => {
    let hasMoreMessages = true
    const newMessages: Message[] = []
    let dataToSet: ActiveChat = { chatId: '', messages: [] }

    while (hasMoreMessages) {
      if (idInstance && apiTokenInstance) {
        const data = await ChatAPI.getMessage(idInstance, apiTokenInstance)

        if (data !== null && data !== undefined && data.body.typeWebhook !== 'outgoingMessageStatus') {
          const { receiptId, body } = data

          newMessages.push(messageCreator(body))

          await ChatAPI.deleteMessageNotification(idInstance, apiTokenInstance, receiptId)
        } else if (data !== null && data !== undefined && data.body.typeWebhook === 'outgoingMessageStatus') {
          await ChatAPI.deleteMessageNotification(idInstance, apiTokenInstance, data.receiptId)
        } else {
          hasMoreMessages = false
        }
      }
    }

    setActiveChat(prev => {
      dataToSet = { chatId: prev.chatId, messages: [ ...prev.messages, ...newMessages ] }
      return dataToSet
    })

    dataToSet.chatId && await FakeServerAPI.setMessages({ id: dataToSet.chatId, messages: dataToSet.messages })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/${AppRoutes.Login}`, { replace: true })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MainContainer responsive>
      <Sidebar position="left" scrollable={false}>
        <ChatsSidebarHeader activeChat={activeChat} setActiveChat={setActiveChat} setChats={setChats} as={Search} />
        <ChatsSidebarContent chats={chats} setChats={setChats} setActiveChat={setActiveChat} as={ConversationList} />
      </Sidebar>

      <ChatContainer>
        <ChatHeader activeChat={activeChat} getNewMessages={getNewMessages} as={ConversationHeader} />
        <ChatContent activeChat={activeChat} setActiveChat={setActiveChat} getNewMessages={getNewMessages} as={MessageList} />
        <ChatFooter activeChat={activeChat} getNewMessages={getNewMessages} as={MessageInput} />
      </ChatContainer>
    </MainContainer>
  )
}

export default ChatsPage
