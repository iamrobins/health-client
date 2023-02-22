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

  public async profile(type: string) {
    const res = await fetch(`${this.host}/api/${type}/profile/`, {
      credentials: "include",
    });

    const data = await res.json();

    return data;
  }

  public async login(user: any, type: string): Promise<AuthResponse> {
    const res = await fetch(`${this.host}/api/${type}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
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

  public async logout(type: string): Promise<boolean> {
    try {
      await fetch(`${this.host}/api/${type}/logout/`, {
        credentials: "include",
      });
      return true;
    } catch {
      return false;
    }
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
