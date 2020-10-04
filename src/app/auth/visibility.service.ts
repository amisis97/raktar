import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Database } from '../database.service';
import { User } from '../interfaces/User';
import { Observable, of } from 'rxjs';

@Injectable()
export class VisibilityService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private db: Database
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.db.getUser(this.authService.getUserId).subscribe(user => {
        const tempUser = user as User;
        if (tempUser.role.trim() === 'admin') {
          resolve(true);
        } else {
          this.router.navigate(['/home']);
          resolve(false);
        }
      });
    });
  }
}
