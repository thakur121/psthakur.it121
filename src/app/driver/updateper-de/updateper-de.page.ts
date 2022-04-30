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
  selector: 'app-updateper-de',
  templateUrl: './updateper-de.page.html',
  styleUrls: ['./updateper-de.page.scss'],
})
export class UpdateperDePage implements OnInit {

      userdata = {
            "id": "",
            "driver_licence":"",
            "insurance_certificate":"",
            "f_reg_image":"assets/images/image.png",
            "b_reg_image":"assets/images/image.png",
            "f_num_plate_image":"assets/images/image.png",
            "b_num_plate_image":"assets/images/image.png",
      };
  	user_id ={
          id:''
      }	
	lastImage: string = null;
	image_type:any=0;
	showimg:any='';
	servicedata:any = [];
	constructor(public route: Router,public navCtrl: NavController, public rest: RestService, public toastController: ToastController,public platform: Platform, public actionSheetCtrl : ActionSheetController,private camera: Camera,private transfer: FileTransfer,private file: File,private filePath: FilePath) 
      {
          this.user_id=JSON.parse(localStorage.getItem('Driverdata'));
          this.Loaddatafun();
	}
  	ngOnInit() {
          this.user_id=JSON.parse(localStorage.getItem('Driverdata'));
            this.Loaddatafun();
  	}
      ionViewDidEnter()
      {
            this.user_id=JSON.parse(localStorage.getItem('Driverdata'));
            this.Loaddatafun();
      }
      Loaddatafun()
      {
            let workdata=JSON.parse(localStorage.getItem('Profile_data'));
            this.userdata.driver_licence=workdata.professional_details.licence_number;
            this.userdata.insurance_certificate=workdata.professional_details.insurance_certificate_number;

            this.userdata.f_reg_image=workdata.vehicle_details.vehicle_document[5].document_url;
            this.userdata.b_reg_image=workdata.vehicle_details.vehicle_document[6].document_url;
            this.userdata.f_num_plate_image=workdata.vehicle_details.vehicle_document[7].document_url;
            this.userdata.b_num_plate_image=workdata.vehicle_details.vehicle_document[8].document_url;
            
      }
	async presentActionSheet(ty:any) {
      	this.image_type=ty;
            const actionSheet = await this.actionSheetCtrl.create({
                  header: 'Upload Document image',
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
				if(this.image_type==6)
				{
					this.userdata.f_reg_image= src;
				}
				else if(this.image_type==7)
				{
					this.userdata.b_reg_image= src;	
				}
				else if(this.image_type==8)
				{
					this.userdata.f_num_plate_image= src;	
				}
				else
				{
					this.userdata.b_num_plate_image= src;	
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
            if(this.image_type==6)
		{
			this.userdata.f_reg_image= this.showimg;
		}
		else if(this.image_type==7)
		{
			this.userdata.b_reg_image= this.showimg;	
		}
		else if(this.image_type==8)
		{
			this.userdata.f_num_plate_image= this.showimg;	
		}
		else
		{
			this.userdata.b_num_plate_image= this.showimg;	
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
		this.rest.loadingPresent();
            var url =  this.rest.serviceurl+"add_vehicle_image";    
            var targetPath = this.pathForImage(this.lastImage);
            let data ={
                  user_id : this.user_id.id,
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
                  let data = JSON.parse(res.response);
                  this.rest.presentToast(data.message);
                  this.rest.loadingDismiss();
                  let src= data.data.url;

                  if(this.image_type==6)
                  {
                        this.userdata.f_reg_image= src;
                  }
                  else if(this.image_type==7)
                  {
                        this.userdata.b_reg_image= src;     
                  }
                  else if(this.image_type==8)
                  {
                        this.userdata.f_num_plate_image= src;     
                  }
                  else
                  {
                        this.userdata.b_num_plate_image= src;     
                  }
             
            }, err => 
            { 
                  this.rest.loadingDismiss();
                  this.rest.presentToast(err);
            });
  	}
  	gotoproducydtl()
  	{
            if (this.userdata.driver_licence=='') 
            {
                  this.rest.presentToast("Please enter your driver licence");
            }
            else if (this.userdata.insurance_certificate=='') 
            {
                  this.rest.presentToast("Please enter your insurance certificate");
            }
            else if (this.userdata.f_reg_image=="assets/images/image.png") 
            {
                  this.rest.presentToast("Please upload your Driving Licence Front image");
            }
            else if (this.userdata.b_reg_image=="assets/images/image.png") 
            {
                  this.rest.presentToast("Please upload your Driving Licence back image");
            }
            else if (this.userdata.f_num_plate_image=="assets/images/image.png") 
            {
                  this.rest.presentToast("Please upload your Car Insurance Certificate image");
            }
            else if (this.userdata.b_num_plate_image=="assets/images/image.png") 
            {
                  this.rest.presentToast("Please upload your Police records / Uber profile / Taxi driver card image");
            }
            else 
            {
			this.rest.loadingPresent();
			this.servicedata = [];
                  this.servicedata.push({"user_id": this.user_id.id});
			this.servicedata.push({"licence_number" :  this.userdata.driver_licence});
			this.servicedata.push({"insurance_certificate_number" :  this.userdata.insurance_certificate});
			this.rest.serverdataposttwo("add_professional_detail",this.servicedata).subscribe( res => {
      			this.rest.loadingDismiss();
              	     let data:any=res;
              	     console.log(data);
                        if(data.status==true)
                        {
                              this.rest.presentToast(data.message);
                              this.userdata = {
                                    "id": "",
                                    "driver_licence":"",
                                    "insurance_certificate":"",
                                    "f_reg_image":"assets/images/image.png",
                                    "b_reg_image":"assets/images/image.png",
                                    "f_num_plate_image":"assets/images/image.png",
                                    "b_num_plate_image":"assets/images/image.png",
                              };
                              this.route.navigate(["/id-verification"]);
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
}


