import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './core/services/loader.service';
import { AuthService } from './core/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mini-crm';
  isLoading$: Observable<boolean>;
  constructor(private loader: LoaderService) {
   this.isLoading$ = this.loader.loading$;
  }
}


/** WIRE LOADER IN APPCOMPONENT
 * I wire global UI elements like loaders in AppComponent because it persists across route changes and avoids duplicating logic in feature components.”
 */