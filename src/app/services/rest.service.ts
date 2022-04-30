import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { LoadingController,ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class RestService {


       serviceurl = "https://dev.codemeg.com/fuan/api/";
       //serviceurl = "http://192.168.1.17/fuan/api/";
      httpOptions : any;
      loading : any;
      isLoading = false;
      constructor(public http : HttpClient, public loader : LoadingController,public toastController : ToastController) { 

      }
      async loadingPresent() {
            this.isLoading = true;
            return await this.loader.create({
                  translucent: true,
                  cssClass: 'custom-class custom-loading',
                  backdropDismiss: true
            }).then(a => {
                  a.present().then(() => {
                        console.log('loading presented');
                        if (!this.isLoading) {
                              a.dismiss().then(() => console.log('abort laoding'));
                        }
                  });
            });
      }
      async loadingPresentImage(msg) {
            this.isLoading = true;
            return await this.loader.create({
                  message: msg,
                  translucent: true,
                  cssClass: 'custom-class custom-loading',
                  backdropDismiss: true
          }).then(a => {
            a.present().then(() => {
                  console.log('loading presented');
                  if (!this.isLoading) {
                        a.dismiss().then(() => console.log('abort laoding'));
                  }
            });
            });
      }

      async loadingDismiss() {
            this.isLoading = false;
            return await this.loader.dismiss().then(() => console.log('loading dismissed'));
      }
      serverdataget(service)
      {
            var newser = service+"&lang=en";
            return this.http.get(this.serviceurl+service);
      }
      serverdataposttwo(service,servicedata){
            servicedata.push({"lang":'en'});
           
            let mydata = new FormData();

            if(servicedata.length > 0){
                  let i=0;
                  for (let obj of servicedata)
                  {
                        for (let key in obj) 
                        {
                              mydata.append(key, obj[key]);
                        }
                        i++;
                  }
            }
          
            return this.http.post(this.serviceurl+service, mydata);
      }

      async presentToast(msg) {
            const toast = await this.toastController.create({
                  message: msg,
            duration: 2000
            });
            toast.present();
      }
      async presentLoadingtime() {
            const loading = await this.loader.create({
                  cssClass: 'my-custom-class',
                  duration: 3000
            });
            await loading.present();

          const { role, data } = await loading.onDidDismiss();
          console.log('Loading dismissed!');
      }
      
      
}
