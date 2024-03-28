import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-his-pedi',
  templateUrl: './his-pedi.page.html',
  styleUrls: ['./his-pedi.page.scss'],
})
export class HisPediPage implements OnInit {

  pedidos: any[] = [];
  id: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private alertController: AlertController, private authService:AuthService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['id']) {
        this.id = params['id'];
      } else {
        const navigation = this.router.getCurrentNavigation();
        if (navigation && navigation.extras && navigation.extras.state) {
          this.id = navigation.extras.state['id'];
        }
      }
    });
    this.obpedi();
  }
  obpedi(){
    this.authService.obpedi(parseInt(this.id)).subscribe(
      (response) => {
        this.pedidos = response;
      },
      (error) => {
        console.error('Error al obtener los pedidos', error);
      }
    );
  }
  navigateBackToClientePage() {
    let navigationExtras: NavigationExtras = {
      state:{
        id: this.id
      }
    }
    this.router.navigate(['cliente'], navigationExtras);
  }
  getColorByEstado(estado: string): string {
    switch (estado) {
      case 'cancelado':
        return 'danger'; // Rojo
      case 'en espera':
        return 'warning'; // Amarillo
      case 'pendiente':
        return 'primary'; // Azul
      case 'entregado':
        return 'success'; // Verde
      default:
        return 'medium';
    }
  }
  eliminarPedido(pedidoId: string) {
    console.log('ID del pedido:', pedidoId);
  
    const presentAlertRedError = async () => {
      const alertRedError = await this.alertController.create({
        header: 'Error de Red',
        message: 'Ha ocurrido un error de red. Por favor, verifica tu conexión e inténtalo de nuevo.',
        buttons: ['Aceptar']
      });
      await alertRedError.present();
    };
  
    const presentAlertPedidoCancelado = async () => {
      const alertPedidoCancelado = await this.alertController.create({
        header: 'Pedido Cancelado',
        message: 'El pedido ha sido cancelado exitosamente.',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              setTimeout(async () => {
                this.ped()
              }, 500);
            }
          }
        ]
      });
      await alertPedidoCancelado.present();
      this.obpedi();
    };
    const presentAlertError = async () => {
      const alertError = await this.alertController.create({
        header: 'Error',
        message: 'Error al cancelar el pedido. Por favor, inténtalo de nuevo.',
        buttons: ['Aceptar']
      });
      await alertError.present();
    };
  
    const alert = this.alertController.create({
      header: 'Confirmar Cancelación',
      message: '¿Estás seguro de cancelar este pedido?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: async () => {
            try {
              await this.authService.eliminarped(pedidoId).toPromise();
              await presentAlertPedidoCancelado();
            } catch (error) {
              console.error('Error al cancelar el pedido:', error);
              await presentAlertError();
            }
          }
        }
      ]
    }).then(alert => alert.present());
  }
  
  us() {
    let navigationExtras: NavigationExtras = {
      state:{
        id: this.id
      }
    }
    this.router.navigate(['cliente/perfil'], navigationExtras);
  }
  ped() {
    let navigationExtras: NavigationExtras = {
      state:{
        id: this.id
      }
    }
    this.router.navigate(['cliente/his-pedi'], navigationExtras);
  }
  home(){
    let navigationExtras: NavigationExtras = {
      state:{
        id: this.id
      }
    }
    this.router.navigate(['cliente'], navigationExtras);
  }
  async logout() {
    const alert = await this.alertController.create({
        header: 'Cerrar sesión',
        message: '¿Estás seguro de que deseas cerrar sesión?',
        buttons: [
            {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                    console.log('Operación cancelada');
                }
            }, {
                text: 'Sí',
                handler: () => {
                    // Redirigir al usuario a la página de inicio de sesión si confirma
                    this.router.navigate(['/login']);
                }
            }
        ]
    });

    await alert.present();
}
  isTabActive(tab: string): boolean {
    return this.router.url.includes(tab);
  }

}
