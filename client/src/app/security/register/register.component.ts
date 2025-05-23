import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'

import {FormsModule, NgForm} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  imports: [ MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, FlexLayoutModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  value = 'Clear me';

  registerUser(form: NgForm) {
    console.log(form)
  }
}
