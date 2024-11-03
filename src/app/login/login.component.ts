import { Component, OnInit } from '@angular/core';
import { ApiauthService } from '../services/apiauth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   
   public loginFrom = this.fromBuilder.group({
    email:['',Validators.required],
    password: ['',Validators.required]
   }); 


/*
  public loginFrom = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });*/
  constructor(public apiauth: ApiauthService,
               private router: Router,
               private fromBuilder: FormBuilder

                                                        
  ) { 

     /* if(this.apiauth.usuarioData){
        this.router.navigate(['/']);// esta permite estar en la paguina proncipal y noo al login cuando me logeo
      }*/
  }

  ngOnInit(): void {
  }

  login(){
    console.log(this.loginFrom.value);
    this.apiauth.login(this.loginFrom.value).subscribe(response =>{
     if(response.exito === 1){
      this.router.navigate(['/']);
     }
    });

  }
}
