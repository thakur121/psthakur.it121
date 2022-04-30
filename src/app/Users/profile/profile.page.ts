import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {  LocationService } from "../../location.service";
import { Subscription } from 'rxjs';
declare var cordova: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  	userdata = {
	    "id": "",
	    "user_name": "",
	    "last_name": "",
	    "email": "",
	    "phone_number": "",
	    "profile_image": ""
  	};
  	terms: any=false;
	confirm: any;
	servicedata: any;
	subscription: Subscription;

  	lastImage: string = null;
  	constructor(public route: Router, public rest: RestService, public toastController: ToastController,public platform: Platform, public actionSheetCtrl : ActionSheetController,private camera: Camera,private transfer: FileTransfer,private file: File,private filePath: FilePath,public navCtrl: NavController,private locationService: LocationService) 
  	{
	 	this.userdata = JSON.parse(localStorage.getItem('userdata'));
	 	console.log(this.userdata);
  	}

  	ngOnInit() {
	 	this.userdata = JSON.parse(localStorage.getItem('userdata'));
  	}
    
	  isValidEmailAddress(emailAddress:any) 
      {
            var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            return pattern.test(emailAddress);
      }
  	gotoupdate()
  	{
		if (this.userdata.user_name == "") 
		{
		    this.rest.presentToast("Please enter your name");
		}
		else if (this.userdata.last_name == "") 
		{
		    this.rest.presentToast("Please enter your last_name");
		}
		else if (this.userdata.email == "") 
		{
		    this.rest.presentToast("Please enter your email");
		}
		else if(this.isValidEmailAddress(this.userdata.email) == false)
		{
			  this.rest.presentToast("Please Enter valid Email");
		}
		else 
		{
			this.rest.loadingPresent();
			this.servicedata = [];
			this.servicedata.push({"user_name": this.userdata.user_name});
			this.servicedata.push({"last_name": this.userdata.last_name});
			this.servicedata.push({"email": this.userdata.email});
			this.servicedata.push({"id": this.userdata.id});
			this.servicedata.push({"phone_number":  this.userdata.phone_number});
			this.servicedata.push({"role":  '2'});
			this.rest.serverdataposttwo("profile_update",this.servicedata).subscribe( res => {
              	this.rest.loadingDismiss();
	              	let data:any=res;
	              	console.log(data);
            		if(data.status==true)
                  	{
                  		this.loadpagefun();
                    	this.rest.presentToast(data.message);
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
  	loadpagefun()
  	{
		this.rest.serverdataget("get_profile?id="+this.userdata.id).subscribe( res => {
            this.rest.loadingDismiss();
            let data:any=res;
            console.log(data);
            if(data.status==true)
            {
              	console.log(data.data);
              	localStorage.setItem('userdata',JSON.stringify(data.data));
              	 
            }
          	},error => {
                this.rest.loadingDismiss();
        });
  	}
    async presentActionSheet() {
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
                    this.userdata.profile_image= src;   
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
           	this.userdata.profile_image= res
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
        this.rest.loadingPresent();
        var url =  this.rest.serviceurl+"profile_image_update";  
        var targetPath = this.pathForImage(this.lastImage);
        let data ={
			id : this.userdata.id,
			profile_image : this.lastImage,
			role :'2'
        };
    	var options =
        {
			fileKey: "profile_image",
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
			this.loadpagefun();
			this.rest.presentToast(data.message);
        }, err => 
        { 
            this.rest.loadingDismiss();
            this.rest.presentToast(err);
        });
  	}
  	
}

