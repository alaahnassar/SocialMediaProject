import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verifcation-email',
  templateUrl: './verifcation-email.component.html',
  styleUrls: ['./verifcation-email.component.scss']
})
export class VerifcationEmailComponent implements OnInit {
auth=new FirebaseTSAuth();
  constructor(private router:Router) { }

  ngOnInit(): void {
    if(
      this.auth.isSignedIn() &&
    !this.auth.getAuth().currentUser?.emailVerified
    ){
      this.auth.sendVerificationEmail();

    }else{
      this.router.navigate([''])
    }
  }
  onResendClick(){
    this.auth.sendVerificationEmail()
  }

}
