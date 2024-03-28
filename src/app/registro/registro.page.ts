import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular'; // Importa LoadingController
import { rutas } from './rutas';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm: FormGroup;
  rutas: string[] = rutas;
  loading: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rutaSeleccionada: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      p_verifi: ['', Validators.required]
    });
  }
  ngOnInit() {
  }
  async on() {
    if (this.registroForm.valid) {
      const password = this.registroForm.get('password');
      const p_verifi = this.registroForm.get('p_verifi');

      if (password && p_verifi) {
        const passwordValue = password.value;
        const p_verifiValue = p_verifi.value;

        if (passwordValue !== p_verifiValue) {
          await this.presentAlert('Error', 'Las contraseñas no coinciden');
          return;
        }
      } else {
        await this.presentAlert('Error', 'No se encontraron los campos de contraseña');
        return;
      }

      // Mostrar el loading
      this.loading = await this.loadingController.create({
        message: 'Cargando...', // Mensaje de carga
        spinner: 'circles', // Tipo de spinner
        translucent: true, // Fondo semitransparente
        cssClass: 'custom-loading' // Clase CSS personalizada
      });
      await this.loading.present();

      const registroData = this.registroForm.value;
      this.authService.reg(registroData).subscribe(
        async (response: any) => {
          if (response.message === 'success') {
            this.registroForm.reset();
            this.router.navigate(['/login']);
          } else {
            await this.presentAlert('Error', response.message);
          }
          await this.loading.dismiss(); // Ocultar el loading
        },
        async (error) => {
          await this.presentAlert('Error', 'Error durante el registro');
          console.error('Error durante el registro:', error);
          await this.loading.dismiss(); // Ocultar el loading en caso de error
        }
      );
    } else {
      await this.presentAlert('Error', 'Por favor completa el formulario correctamente');
    }
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
