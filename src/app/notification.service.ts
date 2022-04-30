import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private loc = new Subject<any>();

  chnagetolang(lo:string){
    console.log('Notification');
    this.loc.next({loc:lo});
  }
  
  getloc(): Observable<any>{
    return this.loc.asObservable();
  }
}
