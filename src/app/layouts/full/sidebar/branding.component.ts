import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-branding',
  imports: [],
  template: `
    <a href="/admin" class="logo-wrapper d-flex align-items-center text-decoration-none text-dark">
      <img src="./assets/images/logos/logo.png" alt="MySneaker Logo" width="50" height="50" />
      <h3 class="m-0 fw-bold text-white">MySneaker Store</h3>
    </a>
  `,
})
export class BrandingComponent {
  options = this.settings.getOptions();
  constructor(private settings: CoreService) { }
}
