import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout()
    .then(() => {
      console.log("logged out");
      this.router.navigate(['/login'])
    })
    .catch();
  }
}
