import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/Authentication/auth.service';
import { inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const UserAuthService = inject(AuthService);
  const router = inject(Router);
  const modalService = inject(NgbModal);

  if (UserAuthService.UserState) {
    return true;
  }
  else {
    const modalRef = modalService.open(LoginComponent);
    //router.navigate(['/Cart']);      // Navigate to cart show error (Cart already is added so we must navigate)
    return false;
  }
};
