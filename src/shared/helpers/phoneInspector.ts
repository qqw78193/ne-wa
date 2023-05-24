export const phoneInspector = (phone: string) => {
  return phone.replace(/[^0-9]/g, '')
}
