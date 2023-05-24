export class LoginAPI {
  static setUserData (instanceId: string, apiTokenInstance: string) {
    localStorage.setItem('@InstanceId', instanceId)

    localStorage.setItem('@APIToken', apiTokenInstance)
  }

  static deleteUserData () {
    localStorage.removeItem('@InstanceId')

    localStorage.removeItem('@APIToken')
  }
}
