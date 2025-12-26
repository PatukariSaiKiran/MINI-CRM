import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/models/api.models';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

login(): void {
this.authService.login({
  email : 'saikiran@test.com',
  password : 'Test@123',
}).subscribe({
  next: (res) => {
    console.log('LOGIN SUCCESS', res);
    this.user = res.user;
  },

});
}
getProfile() {
  this.authService.me().subscribe({
    next: (user) => {
      console.log('PROFILE:', user);
      this.user = user;
    },
    error: (err) => {
      console.error('PROFILE ERROR:', err);
    }
  });
}
logout() {
  this.authService.logout().subscribe({
    next: (res) => {
      console.log('LOGOUT:', res.message);
      this.user = null;
    },
    error: (err) => {
      console.error('LOGOUT ERROR:', err);
    }
  });
}
}
