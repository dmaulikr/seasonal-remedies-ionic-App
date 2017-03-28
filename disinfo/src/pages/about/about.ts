import { Component } from '@angular/core';
import { NavController, Platform,AlertController } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native';
import * as moment from 'moment';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
    notifyTime: any = "8:00 AM" ;
    notifications: any[] = [];
    days: any[];
    chosenHours: number;
    chosenMinutes: number;
   constructor(
     public navCtrl: NavController,
      public platform: Platform,
       public alertCtrl: AlertController) {
 
        this.notifyTime = moment(new Date()).format();
 
        this.chosenHours = new Date().getHours();
        this.chosenMinutes = new Date().getMinutes();
 
        this.days = [
            {title: 'Monday', dayCode: 1, checked: true},
            {title: 'Tuesday', dayCode: 2, checked: true},
            {title: 'Wednesday', dayCode: 3, checked: true},
            {title: 'Thursday', dayCode: 4, checked: true},
            {title: 'Friday', dayCode: 5, checked: true},
            {title: 'Saturday', dayCode: 6, checked: true},
            {title: 'Sunday', dayCode: 0, checked: true}
        ];
 
    }

 ionViewDidLoad(){
 
    }
    toggle(){
        this.days = [
            {title: 'Monday', dayCode: 1, checked: false},
            {title: 'Tuesday', dayCode: 2, checked: false},
            {title: 'Wednesday', dayCode: 3, checked: false},
            {title: 'Thursday', dayCode: 4, checked: false},
            {title: 'Friday', dayCode: 5, checked: false},
            {title: 'Saturday', dayCode: 6, checked: false},
            {title: 'Sunday', dayCode: 0, checked: false    }
        ];
    }
    timeChange(time){
       this.chosenHours = time.hour.value;
      this.chosenMinutes = time.minute.value;
    }
 
    addNotifications(){
       let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
 
    for(let day of this.days){
 
        if(day.checked){
 
            let firstNotificationTime = new Date();
            let dayDifference = day.dayCode - currentDay;
 
            if(dayDifference < 0){
                dayDifference = dayDifference + 7; // for cases where the day is in the following week
            }
 
            firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
            firstNotificationTime.setHours(this.chosenHours);
            firstNotificationTime.setMinutes(this.chosenMinutes);
 
            let notification = {
                id: day.dayCode,
                title: 'Typhoid',
                text: 'Have Hot Water, Avoid impure Intakes',
                at: firstNotificationTime,
                every: 'week'
            };
 
            this.notifications.push(notification);
 
        }
 
    }
 
    console.log("Notifications to be scheduled: ", this.notifications);
 
    if(this.platform.is('cordova')){
 
        // Cancel any existing notifications
        LocalNotifications.cancelAll().then(() => {
 
            // Schedule the new notifications
            LocalNotifications.schedule(this.notifications);
 
            this.notifications = [];
 
            let alert = this.alertCtrl.create({
                subTitle: 'Notifications set',
                buttons: ['Ok']
            });
 
            alert.present();
 
        });
 
    }
    }
 
    cancelAll(){
        LocalNotifications.cancelAll();
 
    let alert = this.alertCtrl.create({
        subTitle: 'Successfully Disabled Notifications',
        buttons: ['Ok']
    });
 
    alert.present();
    }

}