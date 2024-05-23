import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, GuardResult, MaybeAsync, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {


  constructor(private authService:AuthService, private router: Router) { }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    /* console.log('CanMatch');

    console.log({route, segments}) */
    return this.checkAuthStats()
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    /* console.log('CanActivate');

    console.log({route, state}) */

    return this.checkAuthStats()
  }

  private checkAuthStats(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap( isAuthenticated => {
        if(isAuthenticated) this.router.navigate(['./'])
      } ),
      tap( isAuthenticated => console.log('Authenticated public: ', !isAuthenticated)),
      map( isAuthenticated => !isAuthenticated )
    )
  }
}
