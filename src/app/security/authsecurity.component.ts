import { Component, Injectable, OnInit } from '@angular/core';
import { Router,CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiauthService } from '../services/apiauth.service'



@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  
  constructor (private router: Router,
               private apiauthservice: ApiauthService
  ){

  }
  canActivate(router: ActivatedRouteSnapshot){
    const usuario = this.apiauthservice.usuarioData;

    if(usuario){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}




@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
