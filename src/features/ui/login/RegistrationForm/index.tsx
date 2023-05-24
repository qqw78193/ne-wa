import React, { FC } from 'react'
import { ArrowButton, MessageInput } from '@chatscope/chat-ui-kit-react'
import { useNavigate } from 'react-router-dom'

import styles from './RegistrationForm.module.scss'

import { LoginAPI } from '../../../api'
import { AppRoutes } from '../../../../shared/constants/routes'

type RegistrationFormProps = {
  idInstanceInputValue: string
  setIdInstanceInputValue: React.Dispatch<React.SetStateAction<string>>
  apiTokenInputValue: string
  setApiTokenInputValue: React.Dispatch<React.SetStateAction<string>>
}

export const RegistrationForm: FC<RegistrationFormProps> = ({ idInstanceInputValue, setIdInstanceInputValue, apiTokenInputValue, setApiTokenInputValue }) => {
  const navigate = useNavigate()

  const login = () => {
    LoginAPI.setUserData(idInstanceInputValue, apiTokenInputValue)

    navigate(`${AppRoutes.Chats}`)
  }

  return (
    <div className={styles.registrationForm__form}>
      <h1 className={styles.registrationForm__header}>Авторизация</h1>

      <MessageInput
        value={idInstanceInputValue}
        onChange={(_, textContent) => setIdInstanceInputValue(textContent)}
        placeholder='Введите idInstance'
        attachButton={false}
        sendButton={false}
        className={styles.registrationForm__input}
      />

      <MessageInput
        value={apiTokenInputValue}
        onChange={(_, textContent) => setApiTokenInputValue(textContent)}
        placeholder='Введите apiTokenInstance'
        attachButton={false}
        sendButton={false}
        className={styles.registrationForm__input}
      />

      <ArrowButton
        direction="right"
        labelPosition="left"
        className={styles.registrationForm__loginButton}
        disabled={!idInstanceInputValue || !apiTokenInputValue}
        onClick={login}
      >
        Войти
      </ArrowButton>
    </div>
  )
}
