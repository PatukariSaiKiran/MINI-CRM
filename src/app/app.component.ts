import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoaderService } from './core/services/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading = false;
  title = 'mini-crm';
  constructor(private loader: LoaderService) {
    this.loader.loading$.subscribe((v) => {
      this.isLoading = v;
    });
  }
}


/** WIRE LOADER IN APPCOMPONENT
 * I wire global UI elements like loaders in AppComponent because it persists across route changes and avoids duplicating logic in feature components.”
 */