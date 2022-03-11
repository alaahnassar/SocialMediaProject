import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from 'src/app/tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';
import{FirebaseTSFirestore}from'firebasets/firebasetsFirestore/firebaseTSFirestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SocialMediaProject';
auth=new FirebaseTSAuth();
fireStore=new FirebaseTSFirestore();
userHasProfile=true;
userDocument!:userDocument;
  constructor(private loginSheet:MatBottomSheet,private router:Router){
    this.auth.listenToSignInStateChanges(
      user=>{
        this.auth.checkSignInState(
          {
            whenSignedIn:user=>{
            },
            whenSignedOut:user=>{

            },
            whenSignedInAndEmailNotVerified:user=>{
               this.router.navigate(['verificationEmail'])
            },
            whenSignedInAndEmailVerified:user=>{
                this.getUserProfile();
            },
            whenChanged:user=>{

            }
          }
        )
      }
    )
  }

  ngOnInit(): void {
  }
  loggedIn(){
    return this.auth.isSignedIn()
  }
  onLogoutClick(){
    this.auth.signOut()
  }
  onLoginClick(){
    this.loginSheet.open(AuthenticatorComponent)
      }

  getUserProfile(){
    this.fireStore.listenToDocument({
      name:'getting document',
      path:['users',this.auth.getAuth().currentUser!.uid],
      onUpdate:(result)=>{
       this.userDocument=<userDocument>result.data();
       this.userHasProfile=result.exists;

       if(this.userHasProfile){
         this.router.navigate(['postFeed'])
       }
      }
    })
  }
}
export interface userDocument{
  publicName:string;
  description:string
}
