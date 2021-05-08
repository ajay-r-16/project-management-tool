import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../httpservice.service';
import {Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl,SafeUrl} from '@angular/platform-browser'
import { error } from 'util';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name:string="Your Name";
  username:string;
  passwordlastupdated:string;
  password:string;
  retypepassword:string;
  nationality:string;
  projects: string;
  profilepic:string;
  selectedfile:File;
  isload:boolean=true;
  displaypic:any;
  languages:any=['English','French','Tamil','Hindi','Spanish'];
  language:string='';
  constructor(private http:HttpserviceService,private router:Router,private sanitization: DomSanitizer) {
    this.http.userDetails().subscribe((data)=>{
      this.name=data['fullname']
      this.nationality=data['nationality']
      this.username=data['fullname']
      this.username=this.username.concat('@example.com')
     // console.log(this.username)
      this.nationality=data['nationality']
      this.profilepic=data["profile picture"]
      this.displaypic = this.sanitization.bypassSecurityTrustUrl(this.profilepic);
      //console.log(this.displaypic)
     // console.log(data)
      this.isload=false;
    }
    
    ,(error)=>{console.log(error)})
   }

  selectlang(lang:string){
    this.language=lang;
  }

  ngOnInit() {
  }
  fileupload(event){
    
    console.log(event.target.files[0])
    this.selectedfile=<File>event.target.files[0]
    this.isload=true;
    this.http.uploadProfilePicture(this.selectedfile).subscribe(
      data=>{//console.log(data)
      this.displaypic=this.sanitization.bypassSecurityTrustUrl(data["Path"])
      this.isload=false}
      ,error=>console.log())
      
  }
  changepassword(){
    
    if(this.password!=this.retypepassword){
      alert('Passwords don\'t match .')
    }
    else{
      this.http.changePassword(this.password,this.retypepassword).subscribe((data)=>{
      alert("Success")
      this.password=""
      this.retypepassword=""
    }
      ,(error)=>( console.log(error))
      )
    
    }
  }

}
