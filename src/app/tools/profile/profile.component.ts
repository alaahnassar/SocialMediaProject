import { Component, Input, OnInit } from '@angular/core';
import{FirebaseTSFirestore}from'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input()show!: boolean;
  firestore:FirebaseTSFirestore;
  auth:FirebaseTSAuth
  constructor() {
    this.firestore=new FirebaseTSFirestore();
    this.auth=new FirebaseTSAuth()
   }

  ngOnInit(): void {
  }
  onContinueClick(
    nameInput:HTMLInputElement,
    descriptionInput:HTMLTextAreaElement){
    let name=nameInput.value;
    let des=descriptionInput.value;
    this.firestore.create({
      path:["users", this.auth.getAuth().currentUser!.uid],
      data:{
         publicName:name,
         description:des
      },
      onComplete:(docId)=>{
         alert('profile created');
         nameInput.value="";
         descriptionInput.value="";


      },
      onFail:(err)=>{

      }
    })
  }
}
