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
  selector: 'app-vehicle-d',
  templateUrl: './vehicle-d.page.html',
  styleUrls: ['./vehicle-d.page.scss'],
})
export class VehicleDPage implements OnInit {

  
	userdata = {
            "id": "",
           
  	};
      ragistration_cer:any="";
      car_number:any="";
      car_brands:any="";
      car_model:any="";
      car_color:any="";
      car_image:any="";
      f_reg_image:any="";
      b_reg_image:any="";
      f_num_plate_image:any="";
      b_num_plate_image:any="";
  		
	lastImage: string = null;
	image_type:any=0;
	showimg:any='';
	servicedata:any = [];
      firstcall:any=0;

      brandList:any=[];
      ModelList:any=[];
      colorList:any=[];

      constructor(public route: Router,public navCtrl: NavController, public rest: RestService, public toastController: ToastController,public platform: Platform, public actionSheetCtrl : ActionSheetController,private camera: Camera,private transfer: FileTransfer,private file: File,private filePath: FilePath) 
      {
            this.userdata=JSON.parse(localStorage.getItem('Driverdata'));
            console.log(this.userdata);
            if(this.firstcall==0)
            {
                  this.firstcall=1;
                  this.loadfun();
            }
	}

  	ngOnInit() {
            this.userdata=JSON.parse(localStorage.getItem('Driverdata'));
            if(this.firstcall==0)
            {
                  this.firstcall=1;
                  this.loadfun();
            }

  	}
      loadfun()
      {
            this.rest.serverdataget("get_brand").subscribe( res => {
                  this.rest.loadingDismiss();
                  let data:any=res;
                  console.log(data);
                  if(data.status==true)
                  {
                        this.brandList=data.data;
                         
                  }
            },error => {
                  this.rest.loadingDismiss();
            });
            this.rest.serverdataget("get_color").subscribe( res => {
                  this.rest.loadingDismiss();
                  let data:any=res;
                  console.log(data);
                  if(data.status==true)
                  {
                       
                        this.colorList=data.data;   
                  }
            },error => {
               this.rest.loadingDismiss();
            });
      }
      async presentActionSheet(ty:any) {
   	  this.image_type=ty;
            const actionSheet = await this.actionSheetCtrl.create({
                  header: 'Upload profile image',
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
                  if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY)
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
                              if(this.image_type==1)
                              {
                              	this.car_image= src;
                              }
                              else if(this.image_type==2)
                              {
                              	this.f_reg_image= src;	
                              }
                              else if(this.image_type==3)
                              {
                              	this.b_reg_image= src;	
                              }
                              else if(this.image_type==4)
                              {
                              	this.f_num_plate_image= src;
                              }
                              else
                              {
                              	this.b_num_plate_image= src;	
                              }
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
                  this.showimg=res
            );
            if(this.image_type==1)
            {
            	this.car_image= this.showimg;
            }
            else if(this.image_type==2)
            {
            	this.f_reg_image= this.showimg;	
            }
            else if(this.image_type==3)
            {
            	this.b_reg_image= this.showimg;	
            }
            else if(this.image_type==4)
            {
            	this.f_num_plate_image= this.showimg;
            }
            else
            {
            	this.b_num_plate_image= this.showimg;	
            }
      }
   
  
      private copyFileToLocalDir(namePath, currentName, newFileName) {
            this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
                  this.lastImage = newFileName;
                  let showimg = this.pathForImage(this.lastImage);
                  this.uploadimage();
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
      uploadimage() 
    	{
            this.userdata=JSON.parse(localStorage.getItem('Driverdata'));
		this.rest.loadingPresent();
            var url =  this.rest.serviceurl+"add_vehicle_image";    
            var targetPath = this.pathForImage(this.lastImage);
            let data ={
         		user_id : this.userdata.id,
         		document : this.lastImage,
         		type : this.image_type
		};
		var options =
		{
			fileKey: "document",
			fileName: this.lastImage,
			chunkedMode: false,
			mimeType: "multipart/form-data",
			params: data
          	};
     
          	console.log(options);
          	const fileTransfer: FileTransferObject = this.transfer.create();
            fileTransfer.upload(targetPath, url, options).then(res => 
            {
                  this.rest.loadingDismiss();
            	let data = JSON.parse(res.response);
            	this.rest.presentToast(data.message);
                  if(this.image_type==1)
                  {
                        this.car_image= data.data.url;
                  }
                  else if(this.image_type==2)
                  {
                        this.f_reg_image= data.data.url;  
                  }
                  else if(this.image_type==3)
                  {
                        this.b_reg_image= data.data.url;  
                  }
                  else if(this.image_type==4)
                  {
                        this.f_num_plate_image= data.data.url;
                  }
                  else
                  {
                        this.b_num_plate_image= data.data.url;  
                  }
            }, err => 
            { 
                
			this.rest.loadingDismiss();
			this.rest.presentToast(err);
           });
      }
      gotoproducydtl()
      {
            if (this.ragistration_cer=='' ) 
            {
                  this.rest.presentToast("Please enter Car ragistration certificate");
            }
            else if (this.car_number =='' ) 
            {
                  this.rest.presentToast("Please enter car number");
            }
            else if (this.car_brands =='' ) 
            {
                  this.rest.presentToast("Please enter car brands");
            }
            else if (this.car_model =='' ) 
            {
                  this.rest.presentToast("Please enter car model");
            }
            else if (this.car_color =='' ) 
            {
                  this.rest.presentToast("Please enter car color");
            }
            else if (this.f_reg_image =='' ) 
            {
                  this.rest.presentToast("Front photo of your Car Register Certificate");
            }
            else if (this.b_reg_image =='' ) 
            {
                  this.rest.presentToast("Back photo of your Car Register Certificate");
            }
            else if (this.f_num_plate_image =='' ) 
            {
                  this.rest.presentToast("Front photo of your Car Number Plate");
            }
            else if (this.b_num_plate_image =='') 
            {
                  this.rest.presentToast("Back photo of your Car Number Plate");
            }
            else 
            {
                  this.userdata=JSON.parse(localStorage.getItem('Driverdata'));
                  this.rest.loadingPresent();
                  this.servicedata = [];
                  this.servicedata.push({"user_id":  this.userdata.id});
			this.servicedata.push({"vehicle_registration_number":  this.ragistration_cer});
			this.servicedata.push({"vehicle_plate_number":  this.car_number});
			this.servicedata.push({"vehicle_brand":  this.car_brands});
			this.servicedata.push({"vehicle_modal":  this.car_model});
			this.servicedata.push({"vehicle_color":   this.car_color});
			this.rest.serverdataposttwo("add_vehicle_detail",this.servicedata).subscribe( res => {
          			this.rest.loadingDismiss();
	              	let data:any=res;
	              	console.log(data);
              		if(data.status==true)
              		{
	                    	this.rest.presentToast(data.message);
	                    	this.userdata = {
	                      		"id": "",
	                    	};
                              this.ragistration_cer="";
                              this.car_number="";
                              this.car_brands="";
                              this.car_model="";
                              this.car_color="";
                              this.car_image="";
                              this.f_reg_image="";
                              this.b_reg_image="";
                              this.f_num_plate_image="";
                              this.b_num_plate_image="";
	                    	this.route.navigate(["/doc-detls"]);
              		}
              		else
              		{
                    	      this.rest.presentToast(data.message);
              		}
            },error => {
                  this.rest.loadingDismiss();
                  this.rest.presentToast("Something went wrong");
            });
                               
            }
      }
      changemodelfun(ev:any)
      {
            this.rest.serverdataget("get_modal?brand_id="+ev).subscribe( res => {
                  this.rest.loadingDismiss();
                  let data:any=res;
                  console.log(data);
                  if(data.status==true)
                  {
                        this.ModelList=data.data;   
                  }
            },error => {
                  this.rest.loadingDismiss();
            });
      }
}

