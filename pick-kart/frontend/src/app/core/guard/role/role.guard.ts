// role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

export function roleGuard(expectedRole: string[]): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken();

    if (!token) {
      router.navigate(['/unauthorized']);
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (expectedRole.includes(payload.role)) {
        return true;
      } else {
        router.navigate(['/unauthorized']);
        return false;
      }
    } catch {
      router.navigate(['/unauthorized']);
      return false;
    }
  };
}
