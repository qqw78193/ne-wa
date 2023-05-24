import React, { FC, useState } from 'react'
import { AddUserButton, ArrowButton, Button, ChatComponentPropsRef, Search, SearchProps } from '@chatscope/chat-ui-kit-react'
import { useNavigate } from 'react-router-dom'

import { LoginAPI, FakeServerAPI } from '../../api'
import { AppRoutes } from '../../../shared/constants/routes'
import { phoneInspector } from '../../../shared/helpers'
import { ActiveChat, Chat } from '../../../shared/modules/chat'

interface ChatsSidebarHeaderProps extends ChatComponentPropsRef<SearchProps, 'div'> {
  as?: string | typeof Search
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>
  activeChat: ActiveChat
  setActiveChat: React.Dispatch<React.SetStateAction<ActiveChat>>
}

export const ChatsSidebarHeader: FC<ChatsSidebarHeaderProps> = ({ activeChat, setChats, setActiveChat }) => {
  const navigate = useNavigate()

  const [ phoneInput, setPhoneInput ] = useState('')

  const logout = () => {
    LoginAPI.deleteUserData()

    navigate(AppRoutes.Login)
  }

  const addChat = async () => {
    try {
      const newChat = { id: phoneInput }

      await FakeServerAPI.addChat(newChat)

      await FakeServerAPI.createMessages({ id: phoneInput, messages: [] })

      setChats([ newChat ])
      setPhoneInput('')

      navigate(`/${phoneInput}`)
    } catch (error: any) {
      console.log(error) // TODO: notifications
      throw error
    }
  }

  const deleteChat = async () => {
    try {
      await FakeServerAPI.deleteChat(activeChat.chatId)

      await FakeServerAPI.deleteMessages(activeChat.chatId)

      setChats([])
      setActiveChat({ chatId: '', messages: [] })
    } catch (error: any) {
      console.log(error) // TODO: notifications
      throw error
    }
  }

  return (<>
    <Search
      value={phoneInput}
      onChange={value => setPhoneInput(phoneInspector(value))}
      placeholder="Введите 11-значный номер"
    />

    <div>
      <AddUserButton
        onClick={addChat}
        disabled={phoneInput.length !== 11}
      >
        Добавить чат
      </AddUserButton>

      <Button
        onClick={deleteChat}
        disabled={!activeChat}
      >
        Удалить чат
      </Button>

      <ArrowButton
        onClick={logout}
        direction="right"
      >
        Выйти
      </ArrowButton>
    </div>
  </>)
}
