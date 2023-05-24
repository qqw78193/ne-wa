import { AxiosResponse } from 'axios'

import { BaseFakeAPI } from '../../shared/api'
import { Chat, Message } from '../../shared/modules/chat'

export class FakeServerAPI {
  static async getChats () {
    const data = await BaseFakeAPI.get<never, AxiosResponse<Chat[]>>('/chats')

    return data
  }

  static async addChat (payload: Chat) {
    await BaseFakeAPI.post<Chat>('/chats', payload)
  }

  static async deleteChat (chatId: string) {
    await BaseFakeAPI.delete(`/chats/${chatId}`)
  }

  static async getChatMessages (userPhone: string) {
    const { data } = await BaseFakeAPI.get<never, AxiosResponse<{ id: string, messages: Message[]}>>(`/messages/${userPhone}`)

    return data
  }

  static async createMessages (payload: { id: string, messages: Message[]}) {
    await BaseFakeAPI.post<Message[]>('messages', payload)
  }

  static async setMessages (payload: { id: string, messages: Message[]}) {
    await BaseFakeAPI.put<Message[]>(`/messages/${payload.id}`, payload)
  }

  static async deleteMessages (chatId: string) {
    await BaseFakeAPI.delete(`/messages/${chatId}`)
  }
}
