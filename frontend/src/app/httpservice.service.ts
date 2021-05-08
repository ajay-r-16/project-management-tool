import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  private token:string
  private key: string= this.b64EncodeUnicode(this.generateKey());
  private baseurl= 'http://gl.kamarcutu.tk/api/'
  public currentsprint:string= ' ';

  constructor(private http:HttpClient) { 
    
  }
  //This function is used to convert the key into Base64 Format 
  b64EncodeUnicode(str: any) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    // function toSolidBytes(match, p1) {
      (match, p1) => {
        // console.debug('match: ' + match);
        return String.fromCharCode(("0x" + p1) as any);
      }));}
  
  generateKey(){
    var date= new Date()
    var year= date.getFullYear()
    var nwmonth:String 
    var nwday:string;
    year=year-2000;
    var day = date.getDate()
    var month = date.getMonth()+1
    var nwday:string
    if (month<10)       //As month's in single digit gets displayed as '7' and not '07'
    {
      nwmonth="0"+month
    }
    else
    {
      nwmonth=String(month)
    }
    
    if (day<10){
      nwday="0"+day
    }
    else
    {
      nwday=String(day)
    }
    //console.log(String(year+"-"+nwmonth+"-"+nwday+"ajay"))
    return(String(year+"-"+nwmonth+"-"+nwday+"ajay"))
  }


  update(uname,passw){
    var url = this.baseurl+'auth/login/'
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    var data ={
      "username":uname,
      "password":passw,
      "key":this.key
    }
    //console.log(this.key)
    return this.http.post(url,data, {headers: header})
  }

  sendToken(a){             //This receieves the token from the login component and assings it locally
    this.token=a
    //console.log(this.token)
    //console.log(this.key)
  }
  
  
 
  readAllSprints(){
    var url= this.baseurl+'sprints/'
    const header= {
      "Content-Type": "application/json",
      "Authorization": 'Bearer '+this.token
    }
    var parameters= {
      "key": this.key,
      "showAll":"True"
    }
    return this.http.get(url,{headers:header,params:parameters})
  
  }

  currentSprint(){
    var url= this.baseurl+'sprints/'
    const header= {
      "Content-Type": "application/json",
      "Authorization": 'Bearer '+this.token
    }
    var parameters= {
      "key": this.key
    }
    return this.http.get(url,{headers:header,params:parameters})
  }

  getDetails(){
    var url= this.baseurl+'user_details/'
    const header= {
      "Content-Type": "application/json",
      "Authorization": 'Bearer '+this.token
    }
    var parameters= {
      "key": this.key
    }
    return this.http.get(url,{headers:header,params:parameters})
  }

  readAllTeams(){
    var url= this.baseurl+'team/'
    const header= {
      "Content-Type": "application/json",
      "Authorization": 'Bearer '+this.token
    }
    var parameters= {
      "key": this.key,
      "showAll":"True"
    }
    return this.http.get(url,{headers:header,params:parameters})
  
  }
  readAllUsers(){
    var url= this.baseurl+'user_details/'
    const header= {
      "Content-Type": "application/json",
      "Authorization": 'Bearer '+this.token
    }
    var parameters= {
      "showAll":"True",
      "key":this.key
    }
    return this.http.get(url,{headers:header,params:parameters})   
  }

  getIssues(sprint_id:string,user_id:string,team_id:string){
    var url= this.baseurl+'sprints/issues/'
    const header= {
      "Content-Type": "application/json",
      "Authorization": 'Bearer '+this.token
    }
    if(user_id=='' && team_id==''){
      var parameters= {
        "sprint_id": sprint_id,
        "key": this.key
      }
      return this.http.get(url,{headers:header,params:parameters})
    }
    if(user_id!='' && team_id==''){
    var parameters1= {
      "sprint_id": sprint_id,
      "user_id":user_id,
      "key": this.key
    }
    return this.http.get(url,{headers:header,params:parameters1})
  }
  if(user_id=='' && team_id!=''){
    var parameters2= {
      "sprint_id": sprint_id,
      "team_id":team_id,
      "key": this.key
    }
    return this.http.get(url,{headers:header,params:parameters2})
  }
  }

  userDetails(){
    var url= this.baseurl+'user_details/'
    const header= {
      "Content-Type": "application/json",
      "Authorization": 'Bearer '+this.token
    }
    var parameters= {
      "key": this.key
    }
    return this.http.get(url,{headers:header,params:parameters})
  }
  
  changePassword(pass:string,cnfpass:string){
    var url= this.baseurl+'user_details/'
    const header= {
      "Content-Type": "application/json",
      "Authorization": 'Bearer '+this.token
    }
    var data= {
      "key": this.key,
      "pass":pass,
      "retype_pass":cnfpass
    }
    return this.http.put(url,data,{headers:header})
  }
  getIssuedetails(issue_id:string){
    var url= this.baseurl+'sprints/issues/'
    const header= {
      "Content-Type": "application/json",
      "Authorization": 'Bearer '+this.token}
    var parameters={
      "key":this.key,
      "issue_id":issue_id
    }
    return this.http.get(url,{headers:header,params:parameters})
  }
  createIssue(heading:string,assignedto:string,priority:string,status:string,
    sprint_id:string,version:string,points:string,description:string){
      var url=this.baseurl+'sprints/issues/'
      const header= {
        "Content-Type": "application/json",
        "Authorization": 'Bearer '+this.token
      }
      var data= {
        "heading": heading,
        "assignedto":assignedto,
        "priority":priority,
        "status":status,
        "key":this.key,
        "sprint_id":sprint_id,
        "version":version,
        "points":points,
        "description":description
      }
      //console.log(data)
      return this.http.post(url,data,{headers:header})
  }
  
  updateIssue(a,b,c,d,e,f,g,h,i){
    var url=this.baseurl+'sprints/issues/'
    const header= {
      "Content-Type": "application/json",
      "Authorization": 'Bearer '+this.token
    }
    var data={
      "issue_id":a,
      "heading":b,
      "assignedto":c,
      "priority":d,
      "status":e,
      "sprint_id":f,
      "version":g,
      "points":h,
      "description":i,
      "key":this.key
    }
    //console.log(data)
    return this.http.put(url,data,{headers:header})
  }

  createSprint(enddate:String){
    var url=this.baseurl+'sprints/'
      const header= {
        "Content-Type": "application/json",
        "Authorization": 'Bearer '+this.token
      }
      var data= {
        "key":this.key,
        "enddate":enddate
      }
     // console.log(data)
      return this.http.post(url,data,{headers:header})
  }

  uploadProfilePicture(filename:File){
    var url= this.baseurl+'user_details/'
    const fd=new FormData();
    fd.append('key',this.key)
    fd.append('file',filename)
    const header= {
     // "Content-Type": "application/json",
      "Authorization": 'Bearer '+this.token
    }
    console.log(fd)
    return this.http.post(url,fd,{headers:header})
  }
}


