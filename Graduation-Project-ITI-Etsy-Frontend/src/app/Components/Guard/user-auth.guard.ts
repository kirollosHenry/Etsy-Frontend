import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/Authentication/auth.service';
import { inject } from '@angular/core';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const UserAuthService= inject(AuthService);
  const router = inject(Router);
  if(UserAuthService.UserState)
  {
    return true;
  }
  else
  {
    alert("Please Log in");
    //router.navigate(['home']);
    return false;
  }
};
