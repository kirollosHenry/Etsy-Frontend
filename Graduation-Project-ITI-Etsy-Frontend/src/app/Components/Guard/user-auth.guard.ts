import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../Services/Authentication/auth.service';
import { inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AllcategoriesComponent } from '../Category/AllCategory/allcategories/allcategories.component';
import { CartComponent } from '../cart/cart.component';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const UserAuthService = inject(AuthService);
  const router = inject(Router);
  const modalService = inject(NgbModal);

  // if (UserAuthService.UserState) {
  //   return true;
  // }
  // else {
  //   const modalRef = modalService.open(LoginComponent);
  //   //router.navigate(['/Cart']);      // Navigate to cart show error (Cart already is added so we must navigate)
  //   return false;
  // }
  if (UserAuthService.UserState) {
    return true; // User is authenticated, allow access
  } else {
    const modalRef = modalService.open(LoginComponent);
    return modalRef.result.then(
      () => {
        // User authenticated, navigate to the cart component
        //router.navigate(['home']);
        return  router.parseUrl('/Cart?fromGuard=true');
         
      },
      () => {
        // Login modal closed without authentication, reject navigation
        // return router.parseUrl('/home');
        return  router.navigate(['/Cart']);
          
      }
    ).catch(() => {
      // Handle any error during authentication process
      // router.navigate(['Cart']);
      // return false
      return router.parseUrl('/Cart'); 
    });
  }



}