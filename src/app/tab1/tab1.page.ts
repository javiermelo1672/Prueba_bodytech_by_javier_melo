import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { AuthService } from '../services/firebase/auth.service';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
const { Filesystem } = Plugins;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  image: String = "";
  imagebase64:String="";
  constructor(private authser:AuthService,public alertController: AlertController,private camera: Camera) {}

  async takePhoto(){

    try{
    const options: CameraOptions = {
      quality: 50,
      targetHeight:600,
      targetWidth:600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit:true
    }
    try {
      Swal.fire({
        text:'Tomando foto...',
        imageUrl:'/assets/icons/carga.gif',
        imageWidth:90,
        showConfirmButton:false,
        allowOutsideClick:false
      })

      this.camera.getPicture( options )
      .then(imageData => {
        
        this.image = `data:image/jpeg;base64,${imageData}`;
        this.imagebase64=imageData;
        this.showToasts("Foto correcta","success");
        this.presentAlertConfirm();
        Swal.close();
        
        
     }).catch(reject=> Swal.close()); 
    } catch (e) {
      Swal.close();
      this.image="";
      this.showToasts("Error al tomar foto","error");
     
    }
  }
  catch(e){
    Swal.close();
    this.image="";
    this.showToasts("Error de librería","error");
    
  }
  }

  private async savePicture(cameraPhoto) {
    const base64Data = await this.readAsBase64(cameraPhoto);
  
    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });
  
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    };
  }

  private async readAsBase64(cameraPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;  
  }
  
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  showToasts(m,type){

    type=="success"?this.showSuccesToast(m):this.showerrorToast(m);
  }

  showSuccesToast(m){
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
    Toast.fire({
      icon: 'success',
      title: m
    });
  }

  showerrorToast(m){
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
    
    Toast.fire({
      icon: 'error',
      title: m
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Qué desea hacer?',
      buttons: [
        {
          text: 'Descartar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.image="";
          }
        }, {
          text: 'Guardar foto',
          handler: async () => {
            const savedImageFile = await this.savePicture(this.imagebase64);
            
          }
        }
      ]
    });

    await alert.present();
  }

  salir(){
    this.authser.CerrarSesion();
  }


}
