export type MessageResponseBody = {
    idMessage: string
    senderData: {
      chatId: string
    }
    messageData: {
      extendedTextMessageData: { text: string }
      typeMessage: 'extendedTextMessage'
    },
    typeWebhook: 'outgoingAPIMessageReceived'
  } | {
    idMessage: string
    senderData: {
      chatId: string
    }
    messageData: {
      textMessageData: { textMessage: string }
      typeMessage: 'textMessage'
    },
    typeWebhook: 'outgoingMessageReceived'
  }

export type MessageStatusResponseBody = {
    typeWebhook: 'outgoingMessageStatus'
  }

export type MessageResponse = {
    receiptId: string
    body: MessageResponseBody | MessageStatusResponseBody
}
