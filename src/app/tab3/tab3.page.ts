import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

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
