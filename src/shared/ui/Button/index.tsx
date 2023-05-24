import { FC, MouseEventHandler } from 'react'

import styles from './Button.module.scss'

type ButtonProps = {
  text: string
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  disabled?: boolean
  className?: string
}

export const Button: FC<ButtonProps> = ({ text, onClick, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.appButton} ${className || ''}`}
    >
      {text}
    </button>
  )
}
