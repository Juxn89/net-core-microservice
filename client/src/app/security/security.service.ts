import { LoginData } from "./login-data.model";
import { User } from "./user.model";

export class SecurityService {
  private user!: User;

  register(newUser: User) {
    this.user = {
      ...newUser,
      userId: Math.round(Math.random() * 10000).toString()
    }
  }

  login(loginData: LoginData) {
    this.user = {
      ...this.user,
      email: loginData.email,
      password: loginData.password,
      userId: Math.round(Math.random() * 10000).toString()
    }
  }

  clearSession() {
    this.user = null!;
  }

  GetUser() {
    return { ...this.user};
  }
}
