/*import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'micro-header';
}
*/


import { Component,OnInit,ChangeDetectorRef } from '@angular/core';

import { singleSpaPropsSubject, SingleSpaProps } from 'src/single-spa/single-spa-props';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'micro-header';
  msgFromMicro="";
  titleToPass="";
  singleSpaProps: SingleSpaProps;
  subscription: Subscription;
  constructor(private ChangeDetectorRef:ChangeDetectorRef){

  }
  ngOnInit(): void {
    this.subscription = singleSpaPropsSubject.subscribe(
      props => {
        this.singleSpaProps = props;
        console.log(props);
        this.lookForEvents();
      }
    );
  }
  lookForEvents(){
    this.singleSpaProps['EventBus'].on('msgFrmMicro1',(data)=>{
      this.msgFromMicro=data;
      this.ChangeDetectorRef.detectChanges();
    });
  }
  sendMsg(){
   // alert(this.titleToPass);
  // debugger;
   this.singleSpaProps['EventBus'].emit({name:'msgFrmMicro2',data:this.titleToPass});
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}