import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { SummerPage } from '../pages/summer/summer';
import { WinterPage } from '../pages/winter/winter';
import { SpringPage } from '../pages/spring/spring';
import { AutumnPage } from '../pages/autumn/autumn';
import { AboutPage } from '../pages/about/about';
import { TellPage } from '../pages/tell/tell';
import { RatePage } from '../pages/rate/rate';
import { TutorialPage } from '../pages/tutorial/tutorial';

export function provideStorage() {
   return new Storage();
 }

@NgModule({
  declarations: [
    MyApp,
    MainPage,
    SummerPage,
    WinterPage,
    SpringPage,
    AutumnPage,
    HomePage,
    AboutPage,
    TellPage,
    RatePage,
    TutorialPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainPage,
    SummerPage,
    WinterPage,
    SpringPage,
    AutumnPage,
    HomePage,
    AboutPage,
    TellPage,
    RatePage,
    TutorialPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              {provide: Storage, useFactory: provideStorage}]
})
export class AppModule {}
