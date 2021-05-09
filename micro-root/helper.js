
import { Subject, Subscription } from 'https://dev.jspm.io/rxjs@6/_esm2015';
import { filter, map } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators';

export class EventBusService {
   

  constructor() {this.subject$ = new Subject(); }

  emit(event) {
    this.subject$.next(event);
  }

  on(eventName, action) {
    return this.subject$.pipe(
      filter( (e) => e.name === eventName),
      map( (e) => e["data"])).subscribe(action);
  }
}

var EventBus= new EventBusService;




      System.import('single-spa').then(function (singleSpa) {

        singleSpa.registerApplication(
          'dashboard',
          function () {
            return System.import('dashboard');
          },
          function (location) {
            // return location.pathname.startsWith('/app2');
            return true;
          },
      { EventBus: EventBus }
        )


        singleSpa.registerApplication(
          'micro-header',
          function () {
            return System.import('micro-header');
          },
          function (location) {
           // return location.pathname.startsWith('/micro-header');
             return true;
          },
      { EventBus: EventBus }
        )



        singleSpa.registerApplication(
          'footer',
          function () {
            return System.import('footer');
          },
          function (location) {
            // return location.pathname.startsWith('/app1');
            return true;
          },
      { EventBus: EventBus }
        );
        
        singleSpa.start();
      })