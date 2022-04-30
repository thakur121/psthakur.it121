import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

 
@Injectable({ providedIn: 'root' })
export class LocationService {
    private loc = new Subject<any>();
 
    chnagetolang(lo:string){
      console.log('call');
      this.loc.next({loc:lo});
    }
    
    getloc(): Observable<any>{
      return this.loc.asObservable();
    }
 

 
}