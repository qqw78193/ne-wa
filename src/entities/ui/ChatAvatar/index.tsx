import { Avatar, AvatarProps, ChatComponentPropsChildrenRef } from '@chatscope/chat-ui-kit-react'

import defaultAvatar from '../../../shared/assets/img/defaultAvatar.jpg'

interface ChatAvatarProps extends ChatComponentPropsChildrenRef<AvatarProps, 'div'> {
  as?: string | typeof Avatar;
}

export const ChatAvatar = (props: ChatAvatarProps) => {
  return (
    <Avatar src={defaultAvatar} {...props} />
  )
}
