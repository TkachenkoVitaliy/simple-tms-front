export interface LoginResponse {
  id: number
  token: string
  refreshToken: string
  type: 'Bearer'
  username: string
  roles: string[]
}

export interface LoginError {
  error: string
}
