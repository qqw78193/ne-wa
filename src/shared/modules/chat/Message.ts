export type Message = {
    id: string
    text: string
    userPhone: string
    direction: 'incoming' | 'outgoing'
}
