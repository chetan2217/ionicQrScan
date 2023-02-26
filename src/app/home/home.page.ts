import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BarcodeScanner, ScanOptions } from '@capacitor-community/barcode-scanner'
import { AlertController } from '@ionic/angular';
import { QRCodeComponent } from 'angularx-qrcode';
import {SocialSharing} from '@awesome-cordova-plugins/social-sharing/ngx';
import { retry } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy , AfterViewInit{
    qrCodeString = '';
    scannedResult: any;
    scanActive = false;
  
    constructor(
     private qrcode:QRCodeComponent , private socialSharing:SocialSharing , private alertController:AlertController) {}
  
    ngAfterViewInit(): void {
      BarcodeScanner.prepare();
    }
  
    async checkPermission() {
        // check or request permission
        const status = await BarcodeScanner.checkPermission({ force: true });
        if (status.granted) {
          // the user granted permission
          return true;
        } else if(status.denied)
        {
          const alert = await this.alertController.create({
            header: 'No Permission',
            message: 'Please allow camera',
            buttons: [{
              text: 'No',
              role: 'cancel'
            },
            {
              text: 'Open Setting',
              handler: () => {
                BarcodeScanner.openAppSettings();
              }
            }
           ]
          }
          );
        }
        return false;
        
    }
  
    async startScan() {
      const allowed = await this.checkPermission();
      if(allowed)
      {
        const options: ScanOptions= {
         
        }
        this.scanActive = true;
        await BarcodeScanner.hideBackground();
        const result = await BarcodeScanner.startScan(options);
        if(result?.hasContent)
        {
          this.scannedResult = result.content;
          this.scanActive = false;
        } 
      }
    }
  
    stopScan() {
      BarcodeScanner.stopScan();
      this.scanActive = false;
      this.qrcode.emitQRCodeURL
    }
  
    ngOnDestroy(): void {
    this.stopScan();
    }

    toggleTorch()
    {
      BarcodeScanner.toggleTorch();
    }


    socialShare()
    {
      const imgData = document.getElementsByTagName('canvas')[0].toDataURL();
      this.socialSharing.share('QR Code Share' , 'QR CODE' , imgData , this.qrCodeString)
      .then(response => {
        console.log(response);
      })  
      .catch(e => {
        console.log(e);
      });
    }

   
}
