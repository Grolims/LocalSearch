import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage-angular";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AuthInterceptorService } from "./auth/auth-interceptor.service";


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(), LeafletModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Geolocation, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true,}],
  bootstrap: [AppComponent],

})
export class AppModule {}
