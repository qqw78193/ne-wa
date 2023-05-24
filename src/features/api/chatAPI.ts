import { AxiosResponse } from 'axios'

import { BaseAPI } from '../../shared/api'
import { MessageResponse } from '../../shared/modules/chat'

export class ChatAPI {
  static async sendMessage (idInstance: string, apiTokenInstance: string, chatId: string, message: string) {
    type Payload = {
      chatId: string;
      message: string;
    };

    await BaseAPI.post<Payload, AxiosResponse<Response>>(`/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, { chatId, message })
  }

  static async getMessage (idInstance: string, apiTokenInstance: string) {
    const { data } = await BaseAPI.get<never, AxiosResponse<MessageResponse | null>>(`/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`)

    return data
  }

  static async deleteMessageNotification (idInstance: string, apiTokenInstance: string, receiptId: string) {
    await BaseAPI.delete(`/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`)
  }
}
