import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginData } from '../login-data.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [
    SecurityService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  constructor(private securityService: SecurityService) {}

  login(form: NgForm) {
    if (form.valid) {
      const loginData: LoginData = {
        email: form.value.email,
        password: form.value.password
      };
      
      this.securityService.login(loginData);
    }
  }
}
