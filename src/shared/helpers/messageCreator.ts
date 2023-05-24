import { Message, MessageResponseBody } from '../modules/chat'
import { phoneInspector } from './phoneInspector'

export const messageCreator = (messageData: MessageResponseBody): Message => {
  if (messageData.typeWebhook === 'outgoingAPIMessageReceived') {
    return {
      id: messageData.idMessage,
      direction: 'outgoing',
      userPhone: phoneInspector(messageData.senderData.chatId),
      text: messageData.messageData.extendedTextMessageData.text
    }
  } else {
    return {
      id: messageData.idMessage,
      direction: 'incoming',
      userPhone: phoneInspector(messageData.senderData.chatId),
      text: messageData.messageData.textMessageData.textMessage
    }
  }
}
