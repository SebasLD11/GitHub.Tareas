import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AuthComponent } from './auth/auth.component';  // Asegúrate de que esta ruta es correcta
import { ServicesComponent } from './services/services.component';
import { ProfileComponent } from './pages/profile/profile.component';  // Asegúrate de que esta ruta es correcta
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AdminService } from './admin/admin.service';

import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AuthComponent,
    ServicesComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ 
    provideHttpClient(withInterceptorsFromDi()),
    AuthService,
    UserService, 
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export { routes };
