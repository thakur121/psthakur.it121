import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { RestService } from 'src/app/services/rest.service';

declare var cordova: any;


@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {

     activetype:any='1';
     ride_type:any='';
     ride_page_name:any='';
     servicedata: any;
     RequestRide={
		"v_type":"",
		"pickup_lo":"",
		"pickup_lat":"",
		"pickup_lng":"",
		"drop_lo":"",
		"drop_lat":"",
		"drop_lng":"",
		"date":"",
          "time":"",
		"price":"",
		"comment":"",
		"image":"assets/images/image.png"
	}
	lastImage: string = null;
     userdata = {
          "id": ""
     };
     firtscall:any=0;
     catList:any=[];
  	constructor(public route: Router,public navCtrl: NavController, public rest: RestService, public toastController: ToastController,public platform: Platform, public actionSheetCtrl : ActionSheetController,private camera: Camera,private transfer: FileTransfer,private file: File,private filePath: FilePath) 
     {
  		this.pagetypefun();
  		this.RequestRide.pickup_lat=localStorage.getItem("city_pick_lat");
		this.RequestRide.pickup_lng=localStorage.getItem("city_pick_lng");
		this.RequestRide.pickup_lo=localStorage.getItem("city_pickup_add");	
		this.RequestRide.drop_lat=localStorage.getItem("city_drop_lat");
		this.RequestRide.drop_lng=localStorage.getItem("city_drop_lng");
		this.RequestRide.drop_lo=localStorage.getItem("city_drop_add");
            this.userdata=JSON.parse(localStorage.getItem('Driverdata'));
            if(this.firtscall==0)
            {
                  this.firtscall=1;
                  this.Loaddatafun();
            }
  	}
	ngOnInit() 
	{
		this.pagetypefun();
		this.RequestRide.pickup_lat=localStorage.getItem("city_pick_lat");
		this.RequestRide.pickup_lng=localStorage.getItem("city_pick_lng");
		this.RequestRide.pickup_lo=localStorage.getItem("city_pickup_add");	
		this.RequestRide.drop_lat=localStorage.getItem("city_drop_lat");
		this.RequestRide.drop_lng=localStorage.getItem("city_drop_lng");
		this.RequestRide.drop_lo=localStorage.getItem("city_drop_add");
            this.userdata=JSON.parse(localStorage.getItem('Driverdata'));
            if(this.firtscall==0)
            {
                  this.firtscall=1;
                  this.Loaddatafun();
            }    
  	} 

  	ionViewDidEnter()
      {
          this.pagetypefun();
          this.RequestRide.pickup_lat=localStorage.getItem("city_pick_lat");
		this.RequestRide.pickup_lng=localStorage.getItem("city_pick_lng");
		this.RequestRide.pickup_lo=localStorage.getItem("city_pickup_add");	
		this.RequestRide.drop_lat=localStorage.getItem("city_drop_lat");
		this.RequestRide.drop_lng=localStorage.getItem("city_drop_lng");
		this.RequestRide.drop_lo=localStorage.getItem("city_drop_add");
            this.userdata=JSON.parse(localStorage.getItem('Driverdata'));
            if(this.firtscall==0)
            {
                  this.firtscall=1;
                  this.Loaddatafun();
            }
      }
      pagetypefun()
      {
            if(localStorage.getItem('Secound_ride_type')=='1')
            {
            	this.ride_type='1';
            	this.ride_page_name='City';
            }
            else if(localStorage.getItem('Secound_ride_type')=='2')
            {
            	this.ride_type='1';
            	this.ride_page_name='Inter-city';
            }
            else if(localStorage.getItem('Secound_ride_type')=='3')
            {
            	this.ride_type='1';
            	this.ride_page_name='Truck New';
            }
      }
      Loaddatafun()
      {
            this.rest.loadingPresent();
            this.rest.serverdataget("get_sub_categories").subscribe( res => {
                  this.rest.loadingDismiss();
                  let data:any=res;
                  console.log(data);
                  if(data.status==true)
                  {
                        this.catList=data.data;    
                  }
            },error => {
               this.rest.loadingDismiss();
            }); 
          
      }
      gotocategory(id)
      {
            this.RequestRide.v_type=id;
      }
      gotopichuploaca(ty)
      {
		localStorage.setItem('choose_add_ty',ty);
  		this.route.navigate(["/autoadd"]);
  	}
	async presentActionSheet() {
		const actionSheet = await this.actionSheetCtrl.create({
	  	header: 'Upload document image',
	  	buttons: [{
	        	text: 'Use gallery',
				icon: 'images',
				handler: () => 
				{
					this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
				}
	  		},{
				text: 'Use camera',
				icon: 'camera',
				handler: () => 
				{
	              	this.takePicture(this.camera.PictureSourceType.CAMERA);
	        	}
	  		}]
		});
		await actionSheet.present();
  	}
	public takePicture(sourceType) 
	{
		var options = {
			quality: 100,
			sourceType: sourceType,
			saveToPhotoAlbum: false,
			correctOrientation: true
		};
		this.camera.getPicture(options).then((imagePath) => 
		{
			this.uploadfiledata(imagePath);
			if(this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY)
			{
                    this.filePath.resolveNativePath(imagePath).then(filePath => {
					let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
					let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
					this.chnagefunction(correctPath, currentName);
					this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
			}  
			else 
			{
                    var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                    var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                    this.chnagefunction(correctPath, currentName);
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
			}
            }, (err) => {
      
            });
  	}
  	private createFileName() {
		var d = new Date(),
		n = d.getTime(),
		newFileName =  n + ".jpg";
		return newFileName;
  	}
  	uploadfiledata(imageData){
            this.file.resolveLocalFilesystemUrl(imageData).then((entry:any)=>{
			entry.file((file1)=>{
                        var reader = new FileReader();
                        reader.onload =  (encodedFile: any)=>{
		          	var src = encodedFile.target.result;
		          	this.RequestRide.image= src;
		      }
			     reader.readAsDataURL(file1);   
			})
            }).catch((error)=>{
			console.log(error);
            })
  	}
  	chnagefunction(correctPath, currentName)
  	{
            this.file.readAsDataURL(correctPath, currentName).then(res=> 
                  this.RequestRide.image=res
            );
  	}
  	private copyFileToLocalDir(namePath, currentName, newFileName) {
          this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
			this.lastImage = newFileName;
			let showimg = this.pathForImage(this.lastImage);
          }, error => {

          });
  	}
	public pathForImage(img) 
	{
          if (img === null) 
          {
               return '';
          }
          else 
          {
               return cordova.file.dataDirectory + img;
          }
  	}
  	gotoproducydtl()
  	{
          if (this.RequestRide.v_type =='') 
          {
               this.rest.presentToast("Please Enter vehicle");
          }
          else if (this.RequestRide.pickup_lo =='') 
          {
               this.rest.presentToast("Please Enter Pickup Point");
          }
          else if (this.RequestRide.drop_lo =='') 
          {
               this.rest.presentToast("Please Enter  Drop-off Point");
          }
          else if (this.RequestRide.date =='') 
          {
               this.rest.presentToast("Please Enter Date");
          }
          else if (this.RequestRide.time =='') 
          {
               this.rest.presentToast("Please Enter time");
          }
          else if (this.RequestRide.comment =='') 
          {
               this.rest.presentToast("Please Enter  Description");
          }
          else if (this.RequestRide.price =='') 
          {
               this.rest.presentToast("Please Enter Price");
          }
          else if (this.lastImage =='') 
          {
               this.rest.presentToast("Please Choose  image");
          }
          else 
          {
               var newdate = this.changedateformat(this.RequestRide.date);
               var newtime = this.formatAMPM(this.RequestRide.time);
               this.rest.loadingPresent();
               var url =  this.rest.serviceurl+"other_trips";    
               var targetPath = this.pathForImage(this.lastImage);
               let data ={
                    driver_id : this.userdata.id,
                    cat_id  : this.RequestRide.v_type,
                    vehicle_photo : this.lastImage,
                    from_location: this.RequestRide.pickup_lo,
                    from_lat: this.RequestRide.pickup_lat,
                    from_lng: this.RequestRide.pickup_lng,
                    to_location :this.RequestRide.drop_lo,
                    to_lat :this.RequestRide.drop_lat,
                    to_lng :this.RequestRide.drop_lng,
                    schedule_date:newdate+" "+newtime,
                    description:this.RequestRide.comment,
                    offer_price:this.RequestRide.price
   
               };
               var options =
               {
                    fileKey: "vehicle_photo",
                    fileName: this.lastImage,
                    chunkedMode: false,
                    mimeType: "multipart/form-data",
                    params: data
               };
           
               const fileTransfer: FileTransferObject = this.transfer.create();
               fileTransfer.upload(targetPath, url, options).then(res => 
               {
                    let data = JSON.parse(res.response);
                    this.rest.loadingDismiss();
                    console.log(data)
                    if(data.status == true)
                    {    
                         this.route.navigate(["/driver-home"]);
                         this.rest.presentToast(data.message);
                    }
                    else
                    {
                         this.rest.presentToast(data.message);
                    }
               }, err => 
               { 
                    this.rest.loadingDismiss();
                    this.rest.presentToast(err);
               });
          }
  	}
     changedateformat(to)
     {
          var today = new Date(to);
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); 
          var yyyy = today.getFullYear();
          var  newdate = yyyy+"-"+mm+"-"+dd; 
          return newdate;
     }
     formatAMPM(date) {
         var hours = date.toString().split('T');
         var minutes = hours[1].toString(); 
         var strTime = minutes.substring(0, 5);
         return strTime;
     }

}
