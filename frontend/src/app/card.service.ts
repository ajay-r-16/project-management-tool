import { Injectable } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';
import { HttpserviceService } from './httpservice.service';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { CardModalComponent } from './card-modal/card-modal.component';
import { toDate } from '@angular/common/src/i18n/format_date';
import { error } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class CardService {
  currentUser:string=' '
  totalIssues:number;
  dsprint:any;
  issuelist:any;
  userlist:any=[];
  useridlist:any={};
  teamlist:any=[];
  teamidlist:any={};
  i:number;
  isload:boolean=true;
  open:any=[];
  test:boolean=true;
  progress:any=[];
  closed:any=[];
  private baseurl= 'http://gl.kamarcutu.tk/api/'
  public issueId:string
  private toggle = new BehaviorSubject<boolean>(true);
  private toggleIssue= new BehaviorSubject<boolean>(true);
  private token=new BehaviorSubject<string>("");
  updateToken=this.token.asObservable();
  currentState = this.toggle.asObservable();
  issueState=this.toggleIssue.asObservable();
  daysRemaining:any;
  constructor(private http:HttpserviceService) { }

  changeState(state:boolean,value:string){
   // this.http.getIssuedetails(this.issueId).subscribe(data=>r=>('error;',e
    this.test=state;
    this.issueId=value
    //this.toggle);
  }

  issueToggle(state:boolean){
    this.toggleIssue.next(state);  
    //reate issue')
  }
 
  getIssues(sprint_id:string,user_id:string,team_id:string){
   this.http.getIssues(sprint_id,user_id,team_id).subscribe(data=>{
     //
     this.open=[];
     this.closed=[];
     this.progress=[];
     if(data!=null){
      for(this.i=0;this.i<data["length"];this.i++){
        if(data[this.i]["status"]=="OPEN"){
          this.open.push(data[this.i]);
        }
        if(data[this.i]["status"]=="IN PROGRESS"){
          this.progress.push(data[this.i]);
        }
        if(data[this.i]["status"]=="CLOSED" ){
          this.closed.push(data[this.i]);
        }
      }
     }
     //d);
     this.isload=false;
   }),error=>{
     
     this.isload=false;
   }
   
  
  }
  //dd-mm-yy
  getFormattedDate(date:string,days?:number,iso?:number) {
    if (date== ' '){
      var todayTime = new Date()
      //ate')
      if (days){
        //
        todayTime.setDate(todayTime.getDate()+days)
        //
      }
    }
    else{
      var todayTime = new Date(date);
      //')
      if (days){
       // 
        todayTime.setDate(todayTime.getDate()+days)
        //
      }
    }
    var month = (todayTime .getMonth() + 1);
    var day = (todayTime .getDate());
    var year = (todayTime .getFullYear());
    if(iso==1){
      var nwmonth:string;
      var nwday:string;
      if(month<10){nwmonth="0"+month}
      else{nwmonth=String(month)}

      if(day<10){nwday="0"+day}
      else{nwday=String(day)}
      return String(year+"-"+nwmonth+"-"+nwday);      
    }
    else{
      return String(day + "/" + month + "/" + year);
    }
}

  
  

}
