import { Component, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private network: Network, private platform: Platform, private alertController: AlertController) { }
  OnInit(){
    this.email = '';
    this.password = '';
  }
  login() {
    if (this.platform.is('cordova')) {
      if (this.network.type === 'none') {
        this.presentAlert('Error de conexión', 'Por favor, conéctate a internet para continuar.');
        return;
      }
    }
    this.authService.login(this.email, this.password).subscribe(response => {
      if (response.success) {
        if (response.tipo == 0) {
          if (response.code == 0){
              let navigationExtras: NavigationExtras = {
                state: {
                  id: response.id
                }
            };
            this.router.navigate(['/cliente'], navigationExtras);
          } else if(response.code ==1){
            let navigationExtras: NavigationExtras = {
              state: {
                id: response.id
              }
            };
            this.router.navigate(['/verificar'], navigationExtras);
          }
        } else if (response.tipo == 1) {
          let navigationExtras: NavigationExtras = {
            state: {
              id: response.id
            }
        };
          this.router.navigate(['/repartidor'], navigationExtras);
        }
      } else {
        this.presentAlert('Error', response.message);
      }
    }, error => {
      console.log("Error al intentar iniciar sesión. " + error.message);
      this.presentAlert('Error', 'Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }  
}
