import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { VerifcationEmailComponent } from './pages/verifcation-email/verifcation-email.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'verificationEmail',component:VerifcationEmailComponent},
  {path:'postFeed',component:PostFeedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
