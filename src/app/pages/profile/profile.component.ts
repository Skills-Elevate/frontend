import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../shared/services/users.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  newName: string = '';
  userProfile: any = null;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  updateName() {
    this.usersService.updateName(this.newName).subscribe({
      next: (response: any) => {
      },
      error: (error: any) => {
      },
    });
  }

  getProfile() {
    this.usersService.getProfile().subscribe({
      next: (profile: any) => {
        this.userProfile = profile;
      },
      error: (error: any) => {
        // Gérez l'erreur
      },
    });
  }

}
