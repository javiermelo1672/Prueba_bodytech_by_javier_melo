import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { SeeDataPage } from '../pages/see-data/see-data/see-data.page';
import { AuthService } from '../services/firebase/auth.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  data=[];
  showData=false;
  constructor(private authser:AuthService,private _modalController: ModalController,
    private http: HTTP) {}

  ionViewWillEnter(){

    this.getData();
  }

  getData(){
    this.http.get('https://jsonplaceholder.typicode.com/posts/', {}, {})
  .then(data => {
    data.status==200?this.data=JSON.parse(data.data):null;
    this.showData=true;
  })
  .catch(error => {

    this.showToasts("Error al obetner datos","error");
    this.showData=false;

  });
  }

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

  async openModal(data){
    const modal = await this._modalController.create({
      component: SeeDataPage,
      componentProps: {
        'userId':data.userId,
        'id':data.id,
        'title':data.title,
        'body':data.body
      }
    });
   await modal.present();
  }

  salir(){
    this.authser.CerrarSesion();
  }


 


}
