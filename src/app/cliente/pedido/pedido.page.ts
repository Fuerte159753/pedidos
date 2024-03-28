import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { categorias } from './categorias';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
  mensaje: string = '';
  id: number = 0;
  cat: string = '';
  direcciones: any[] = [];
  categorias = categorias;
  subcategorias: string[] = [];
  pedidoTexto: string = '';
  categoria: string = '';
  subcategoria: string = '';
  pedidoTexto1: string = '';
  direccion: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['id']) {
        this.id = params['id'];
      } else {
        const navigation = this.router.getCurrentNavigation();
        if (navigation && navigation.extras && navigation.extras.state) {
          this.id = navigation.extras.state['id'];
          this.cat = navigation.extras.state['cat'];
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
    this.obtener();
    this.filtrarSubcategorias();
  }

  obtener() {
    this.authService.obtdire(this.id).subscribe(
      (data: string[]) => {
        this.direcciones = data;
      },
      (error) => {
        console.error('Error al obtener direcciones:', error);
      }
    );
  }
  obdire() {
    this.authService.obtrp(this.id).subscribe(
      (data: any[]) => {
        this.direcciones = data;
      },
      (error) => {
        console.error('Error al obtener direcciones:', error);
      }
    );
  }

  filtrarSubcategorias() {
    const categoriaEncontrada = this.categorias.find(c => c.nombre === this.cat);
    if (categoriaEncontrada) {
      this.subcategorias = categoriaEncontrada.subcategorias;
    }
  }

  enviarFormulario() {
    if (this.cat && this.subcategoria && this.pedidoTexto1 && this.direccion) {
      const datos = {
        id: this.id,
        cat: this.cat,
        subcategoria: this.subcategoria,
        pedidoTexto1: this.pedidoTexto1,
        direccion: this.direccion,
      };
      this.authService.addpedido(datos).subscribe(
        (respuesta) => {
          console.log('Respuesta del servidor:', respuesta);
          this.home();
        },
        (error) => {
          console.error('Error al enviar el pedido:', error);
        }
      );
    }
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
  logout() {
    this.router.navigate(['/login'])
  }
  isTabActive(tab: string): boolean {
    return this.router.url.includes(tab);
  }
}
