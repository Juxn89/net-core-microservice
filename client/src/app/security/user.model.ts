export interface User {
  userId: string;
  name: string;
  lastNames: string;
  userName: string;
  email: string;
  password: string;
  token: string;
}

export interface UserRegister extends Omit<User, 'token'> { }
