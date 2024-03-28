import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.page.html',
  styleUrls: ['./verificar.page.scss'],
})
export class VerificarPage implements OnInit {
  id: number = 0;
  codigo=0;

  constructor(private route: ActivatedRoute, private router: Router, private authservice: AuthService, private alertController: AlertController) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
    this.id = navigation.extras.state['id'];
    };
  }
  ver(){
    this.authservice.verifi(this.id, this.codigo).subscribe(response =>{
      if(response.success){
        this.router.navigate(['/login'])
      }else{
        this.alert('Error',response.message)
        return
      }
    })
  }
  async alert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}