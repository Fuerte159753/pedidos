import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Camera, CameraResultType } from '@capacitor/camera';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  mensaje: string='';
  id: string = '';
  cl: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService,) { }

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
    this.oc()
  }
  us() {
    let navigationExtras: NavigationExtras = {
      state:{
        id: this.id
      }
    }
    this.router.navigate(['cliente/perfil'], navigationExtras);
  }
  oc() {
    this.authService.per(parseInt(this.id)).subscribe(
      response => {this.cl = response;},
      error => {console.error('Error al obtener el perfil del cliente:', error);});
  }
  edit() {
    let navigationExtras: NavigationExtras = {
      state:{
        id: this.id
      }
    }
    this.router.navigate(['cliente/edit-p'], navigationExtras);
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

  async takePhoto() {
    try {
      const capturedPhoto = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
      
      // Genera un nombre aleatorio para la imagen
      const imageName = this.generateRandomName();
      
      // Guarda la imagen en la carpeta de activos (src/assets) con el nombre aleatorio
      const savedImageFile = await this.saveImageToAssets(capturedPhoto, imageName);

      // Guarda la ubicación de la imagen junto con el nombre en la base de datos usando tu servicio AuthService
      //this.authService.guardarImagen(savedImageFile.webPath, imageName);

      // Actualiza la URL de la imagen en la vista
      this.cl.avatarUrl = savedImageFile.webPath;
    } catch (error) {
      console.error('Error al capturar la foto:', error);
    }
  }

  async saveImageToAssets(capturedPhoto: any, imageName: string) {
    // Lógica para guardar la imagen en la carpeta de activos
    return capturedPhoto; // Devuelve el archivo guardado
  }

  generateRandomName(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

}
