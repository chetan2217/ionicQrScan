import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    constructor(public alertController: AlertController) { }

    async presentAlert(header:string , msg:string) {
        const alert = await this.alertController.create({
          header: header,
          message: msg,
          buttons: ['OK'],
        });
    
        await alert.present();
      }
}