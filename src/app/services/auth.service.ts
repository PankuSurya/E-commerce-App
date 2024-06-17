import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private authToken = '';

  login(username: string, password: string): boolean {
    if (username === 'abc@gmail.com' && password === 'password') {
      this.isLoggedIn = true;
      this.authToken = 'fake-jwt-token';
      localStorage.setItem('authToken', this.authToken);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.authToken = '';
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getToken(): string {
    return this.authToken;
  }
}
