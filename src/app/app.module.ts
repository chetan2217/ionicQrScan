import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QRCodeComponent } from 'angularx-qrcode';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Storage } from '@ionic/storage';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, QRCodeComponent, SocialSharing, Storage],
  bootstrap: [AppComponent],
})
export class AppModule {}
