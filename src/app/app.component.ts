import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private afAuth:AngularFireAuth,
    public navCtrl: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    Swal.fire({
      text:'Autenticando con firebase',
      imageUrl:'/assets/icons/carga.gif',
      imageWidth:90,
      showConfirmButton:false,
      allowOutsideClick:false
    })
    let that=this;
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#3880ff');
      this.statusBar.styleLightContent();
      
      that.afAuth.onAuthStateChanged(function(user) {
       
        if (user) {
          
          that.navCtrl.navigateRoot('/pages/tabs/tab1');
          Swal.close();
        }
        else{
          that.navCtrl.navigateRoot('/login');
          Swal.close();
        }
      });
      this.splashScreen.hide();
    });
  }
}
