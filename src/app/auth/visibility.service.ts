import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Database } from '../database.service';
import { User } from '../interfaces/User';

@Injectable()
export class VisibilityService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private db: Database
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const loggedIn = this.authService.isLoggedIn;
    if (loggedIn) {
      this.db.getUser(this.authService.getUserId).subscribe(user => {
        const tempUser = user as User;
        if( [].includes(tempUser.role)) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      });
    }
    return false;
  }
}
