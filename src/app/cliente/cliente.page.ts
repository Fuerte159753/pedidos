import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  mensaje: string = '';
  id: number = 0;
  nombreCliente: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

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
  }
  orden(categoria: string){
    let navigationExtras: NavigationExtras = {
      state: {
        id: this.id,
        cat: categoria
      }
    };
    this.router.navigate(['cliente/pedido'], navigationExtras);
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
  logout() {
    this.router.navigate(['/login'])
  }
  isTabActive(tab: string): boolean {
    return this.router.url.includes(tab);
  }
}
