import { Component, OnInit } from '@angular/core';
import{FirebaseTSStorage}from'firebasets/firebasetsStorage/firebaseTSStorage'
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-creat-post',
  templateUrl: './creat-post.component.html',
  styleUrls: ['./creat-post.component.scss']
})
export class CreatPostComponent implements OnInit {
  selectedImageFile!: File;
  auth=new FirebaseTSAuth();
  firestore=new FirebaseTSFirestore();
  storage=new FirebaseTSStorage();
  constructor(private dialog : MatDialogRef<CreatPostComponent>) { }

  ngOnInit(): void {
  }
  onPostClick(commentInput: HTMLTextAreaElement) {
    let comment = commentInput.value;
   if (comment.length<=0) return;
   if(this.selectedImageFile){
     this.upLoadImagePost(comment)
   }else{
     this.upLoadPost(comment)
   }

  }
  upLoadImagePost(comment:string){
    let postId = this.firestore.genDocId();
    this.storage.upload({
      uploadName: 'upload image post',
      path: ["posts", postId, "image"],
      data: {
        data: this.selectedImageFile
      },
      onComplete: (downLoadUrl) => {
        this.firestore.create({
          path: ["posts", postId],
          data: {
            comment: comment,
            creatorId: this.auth.getAuth().currentUser?.uid,
            imageUrl: downLoadUrl,
            timestamp: FirebaseTSApp.getFirestoreTimestamp()
          },
          onComplete:(docId)=>{
            this.dialog.close();
          }
        })
      }
    },
    )
  }
  upLoadPost(comment:string){
    this.firestore.create({
      path: ["posts"],
      data: {
        comment: comment,
        creatorId: this.auth.getAuth().currentUser?.uid,

        timestamp: FirebaseTSApp.getFirestoreTimestamp()
      },
      onComplete:(docId)=>{
        this.dialog.close();
      }
    })
  }
  onphotoSelected(photoSelector: HTMLInputElement) {
    if( photoSelector.files){

      this.selectedImageFile =photoSelector.files[0]  ;
    }
    if (!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener(
      'loadend',
      ev => {
        let readableString = fileReader?.result?.toString() ;
        let postPreviewImage = <HTMLImageElement>document.getElementById('post-Preview-Image');
          postPreviewImage.src = readableString || ''  ;
      }

    )


  }
}
