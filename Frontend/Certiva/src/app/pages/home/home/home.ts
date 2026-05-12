import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  constructor(private router: Router) {}

  logout(): void {   
    this.router.navigate(['/login']);
  }

}
