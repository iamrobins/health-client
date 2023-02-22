import { User } from "interfaces";

interface AuthResponse {
  user: User;
  success: boolean;
  token: string;
}

class AuthService {
  private static instance: AuthService;
  private host: string = process.env.REACT_APP_HOST!;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) AuthService.instance = new AuthService();

    return AuthService.instance;
  }

  public async profile(token: string) {
    const res = await fetch(this.host + "/api/auth/profile", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();

    return data;
  }

  public async login(user: any): Promise<AuthResponse> {
    const res = await fetch(this.host + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data: AuthResponse = await res.json();

    return data;
  }

  public async register(user: any): Promise<AuthResponse> {
    const res = await fetch(this.host + "/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data: AuthResponse = await res.json();

    return data;
  }

  public async forgotPassword(email: string) {
    const res = await fetch(this.host + "/api/auth/forgotpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!data) return false;

    return true;
  }

  public async passwordReset(token: string, password: string) {
    const res = await fetch(this.host + "/api/auth/resetpassword/" + token, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (!data) return false;

    return true;
  }
}

export default AuthService;
