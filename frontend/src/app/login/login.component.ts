import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../httpservice.service';
import {Router} from '@angular/router';
// import { FormsModule } from '@angular/forms';
//Write a fn to dynamically generate the key
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token:string;
  uname:string;
  passw:string;
  //result:any;


  constructor(private http:HttpserviceService,private router:Router) {
     }

  onsubmit(){
    this.http.update(this.uname,this.passw).subscribe((data)=>{
     // console.log(data)
      this.token=data['token']
      this.http.sendToken(this.token)
      this.router.navigate(['/sprint'])
 
    },(error)=>{
      //console.log("error",error);
      alert("Invalid Credentials");
    }
    )
  }  
  onreset(){
    this.uname='';
    this.passw='';
  }

  ngOnInit() {
    this.uname='';
    this.passw='';
  }

}
