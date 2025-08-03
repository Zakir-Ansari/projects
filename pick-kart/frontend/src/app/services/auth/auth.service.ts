import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

interface TokenPayload {
  id: string;
  role: 'Admin' | 'Seller' | 'User';
  exp: number;
}

interface LoginResponse {
  status: string;
  message: string;
  data: { token: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private userSubject = new BehaviorSubject<TokenPayload | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('https://pick-kart-api.vercel.app/api/auth/login', { username, password })
      .pipe(
        map(response => {
          const token = response.data.token;
          this.storeToken(token);
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
  }

  autoLogin() {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      this.setUserFromToken(token);
    } else {
      this.logout();
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.setUserFromToken(token);
  }

  private setUserFromToken(token: string) {
    const decoded = this.decodeToken<TokenPayload>(token);
    if (decoded) {
      this.userSubject.next({ id: decoded.id, role: decoded.role, exp: decoded.exp });
    }
  }

  private isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken<TokenPayload>(token);
    return !decoded || Date.now() > decoded.exp * 1000;
  }

  private decodeToken<T = any>(token: string): T | null {
    try {
      console.log('token', token);
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (e) {
      console.error('Invalid JWT token', e);
      return null;
    }
  }
}
