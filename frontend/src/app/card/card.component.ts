import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { HttpserviceService } from '../httpservice.service';
import { Type } from '@angular/compiler';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  test:boolean=true
  list:any
  x:any
  color:any={"LOW":"rgba(22, 64, 126, 0.959)","MED":"rgba(43, 194, 43, 0.938)","HIGH":"rgb(230, 42, 42)"};
  res:boolean;
  
test1:any;
i:number;


  constructor(private card: CardService, private http: HttpserviceService) {
    this.x= window.matchMedia("(max-width: 650px)");
    this.myFunction(this.x);
    this.x.addListener(this.myFunction);    
   

  }
  myFunction(x) {
    if (x.matches) { 
      this.res=true;
    }
    else{
      this.res=false;
    }
  }
  change(){
    this.x= window.matchMedia("(max-width: 650px)");
    this.myFunction(this.x);
    this.x.addListener(this.myFunction);
  }

  click(value:any){
   // this.card.sendIssueId(value)
    //console.log(value)
    this.test=false;
    this.card.changeState(this.test,value)
    //console.log('card',this.test)
    
  }

  
  
  ngOnInit() {
    this.card.currentState.subscribe(test=> this.test=test);
  }
  

}