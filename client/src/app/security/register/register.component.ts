import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  value = 'Clear me';

  constructor(
    private securityService: SecurityService
  ) {}

  registerUser(form: NgForm) {
    this.securityService.register({
      email: form.value.email,
      password: form.value.password,
      name: form.value.name,
      lastNames: form.value.lastNames,
      userId: '',
      userName: ''
    });
  }
}
