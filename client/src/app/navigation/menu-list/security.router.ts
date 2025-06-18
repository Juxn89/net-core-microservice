import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { SecurityService } from "../../security/security.service";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SecurityRouter implements CanActivate {

  constructor(
    private securityService: SecurityService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const isLogged = this.securityService.isUserOnSession()

    if(!isLogged) {
      this.router.navigate(['/login'])
      return false
    }
    else
      return true
  }
}
