import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-see-data',
  templateUrl: './see-data.page.html',
  styleUrls: ['./see-data.page.scss'],
})
export class SeeDataPage implements OnInit {
  userId: Number;
  id: Number;
  title: String;
  body: String;

  constructor(public navParams: NavParams,
    private modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){

    this.userId=this.navParams.get('userId');
    this.id=this.navParams.get('id');
    this.title=this.navParams.get('title');
    this.body=this.navParams.get('body');
  }

  salir(){
    this.modalController.dismiss();
}



}
