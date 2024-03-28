import { AuthService } from 'src/app/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-repartidor',
  templateUrl: './repartidor.page.html',
  styleUrls: ['./repartidor.page.scss'],
})
export class RepartidorPage implements OnInit {

  mensaje: string = '';
  repaId: string = '';
  pedidos: any[] = [];
  id: string = '';
  nombre:string='';

  constructor(private alertController: AlertController, private route: ActivatedRoute, private http: HttpClient, private router: Router, private authService:AuthService) {}
  
  async marcarPedidoEntregado(pedidoId: number) {
    const alert = await this.alertController.create({
        header: 'Confirmar entrega',
        message: '¿Estás seguro de que deseas marcar este pedido como entregado?',
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
                    // Llamar al método cambio_entre del AuthService para marcar el pedido como entregado
                    this.authService.cambio_entre(pedidoId).subscribe(
                        (response: any) => {
                            console.log('Respuesta del servidor:', response);
                            if (response.success) {
                                // Si el pedido se marcó como entregado correctamente, cargar los pedidos pendientes
                                this.cargarPedidosPendientes();
                                // Mostrar una alerta indicando que el pedido se marcó como entregado con éxito
                                this.presentAlertPedidoEntregado();
                            }
                        },
                        (error) => {
                            // Si hay un error al enviar el pedido, mostrar un mensaje de error
                            console.error('Error al enviar el pedido:', error);
                            this.presentAlertError();
                        }
                    );
                }
            }
        ]
    });

    await alert.present();
}

// Función para mostrar la alerta de pedido entregado exitosamente
async presentAlertPedidoEntregado() {
    const alert = await this.alertController.create({
        header: 'Pedido Entregado',
        message: 'El pedido se ha marcado como entregado exitosamente.',
        buttons: ['OK']
    });

    await alert.present();
}

// Función para mostrar la alerta de error
async presentAlertError() {
    const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error al enviar el pedido. Por favor, inténtalo de nuevo más tarde.',
        buttons: ['OK']
    });

    await alert.present();
}
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
    const hora = new Date().getHours();
    if (hora >= 0 && hora < 12) {
      this.mensaje = 'Buenos Días';
    } else if (hora >= 12 && hora < 18) {
      this.mensaje = 'Buenas Tardes';
    } else {
      this.mensaje = 'Buenas Noches';
    }
    this.cargarPedidosPendientes();
  }
  cargarPedidosPendientes() {
    this.authService.obrepa(this.id).subscribe(
      (data: any) => {
        if (data && data.pedidos_pendientes) {
          this.pedidos = data.pedidos_pendientes;
        } else {
          console.error('Error al cargar los pedidos pendientes en el array:', data?.message || 'Error desconocido');
        }
      },
      (error) => {
        console.error('Error al cargar los pedidos pendientes de la base de datos:', error);
      }
    );
  }
  
  
  
  navigatelogin(){
    this.router.navigate(['/login']);
  }
}

