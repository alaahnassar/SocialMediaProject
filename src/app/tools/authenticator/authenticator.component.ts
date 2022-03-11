import { Component, OnInit } from '@angular/core';
import{FirebaseTSAuth}from'firebasets/firebasetsAuth/firebaseTSAuth';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss']
})
export class AuthenticatorComponent implements OnInit {
state=AuthenticatorCompState.LOGIN;
firebase:FirebaseTSAuth;
  constructor(private _MatBottom:MatBottomSheetRef) {
    this.firebase=new FirebaseTSAuth
   }
  ngOnInit(): void {
  }

  //validation rest
  onRestClick(restEmail:HTMLInputElement){
    let email=restEmail.value
    if(this.isNotEmpty(email)){
      this.firebase.sendPasswordResetEmail({
        email:email,
        onComplete:(err)=>{
          this._MatBottom.dismiss();
        }
      })
    }
  }
  //validation login
  onLoginClick(
    loginEmail:HTMLInputElement,
    loginPassword:HTMLInputElement
  ) {
    let email = loginEmail.value
    let password = loginPassword.value

    if (this.isNotEmpty(email) &&
      this.isNotEmpty(password)) {
      this.firebase.signInWith({
        email: email,
        password: password,
        onComplete: (uc) => {
          this._MatBottom.dismiss();
        },
        onFail: (err) => {
          alert('error to login')
        }
      })
    }
  }

  //validation register
  onRegisterClick(
    registerEmail:HTMLInputElement,
    registerPassword:HTMLInputElement,
    registerConfirmPassword:HTMLInputElement)
    {
       let email=registerEmail.value;
       let Password=registerPassword.value;
       let confirmPassword=registerConfirmPassword.value;

       if(
          this.isNotEmpty(email)&&
          this.isNotEmpty(Password)&&
          this.isNotEmpty(confirmPassword)&&
          this.isMatch(Password,confirmPassword)
       ){
        this.firebase.createAccountWith(
          {
          email:email,
          password:Password,
          onComplete:(us)=>{
            this._MatBottom.dismiss();
          },
          onFail:(error)=>{
            alert('Faild to create account')
          }
        }
        )
       }

  }
  isNotEmpty(text:string){
    return text!=null  && text.length>0;
  }
  isMatch(text:string,comparedWith:string){
    return text == comparedWith
  }
  //form login or register 0r rest
  onFotgotPassword(){
    this.state=AuthenticatorCompState.FORGOT_PASSWORD
  }
  onCreateAccount(){
    this.state=AuthenticatorCompState.REGISITER
  }
  onLogin(){
    this.state=AuthenticatorCompState.LOGIN
  }
  isLoginState(){
    return this.state==AuthenticatorCompState.LOGIN
  }
  isRegisterState(){
    return this.state==AuthenticatorCompState.REGISITER
  }
  isFotgotPasswordState(){
    return this.state==AuthenticatorCompState.FORGOT_PASSWORD
  }
  getStateText(){
    switch(this.state){
      case AuthenticatorCompState.LOGIN:
        return "Login";
        case AuthenticatorCompState.REGISITER:
          return "Register";
          case AuthenticatorCompState.FORGOT_PASSWORD:
        return "Fotgot Password";
    }
  }
}
export enum AuthenticatorCompState{
  LOGIN,
  REGISITER,
  FORGOT_PASSWORD
}
