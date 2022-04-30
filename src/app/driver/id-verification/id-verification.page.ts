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
  selector: 'app-id-verification',
  templateUrl: './id-verification.page.html',
  styleUrls: ['./id-verification.page.scss'],
})
export class IdVerificationPage implements OnInit {

	userdata = {
		"id": ""
  	};
  	lastImage: string = null;
  	image_type:any;
      showimg:any='assets/images/driverwith.jpg';
  	constructor(public route: Router,public navCtrl: NavController, public rest: RestService, public toastController: ToastController,public platform: Platform, public actionSheetCtrl : ActionSheetController,private camera: Camera,private transfer: FileTransfer,private file: File,private filePath: FilePath) 
  	{
          this.userdata=JSON.parse(localStorage.getItem('Driverdata'));
	}

  	ngOnInit() {
          this.userdata=JSON.parse(localStorage.getItem('Driverdata'));

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
                              this.showimg= src;
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
                  type : '10'
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
                  this.showimg= data.data.url;
            }, err => 
            { 
                 
			this.rest.loadingDismiss();
			this.rest.presentToast(err);
            });
  	}

}
