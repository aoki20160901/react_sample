export interface User {
  id: string
  name: string
  email: string
  company: string
  tel: string
}

export interface LoginCredentials {
  [key: string]: string;
  email: string
  password: string
}

export interface AuthUser extends User {
  token: string
}