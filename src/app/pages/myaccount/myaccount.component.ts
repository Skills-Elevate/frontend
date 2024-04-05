import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../shared/services/users.service";

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css'],
})
export class MyaccountComponent implements OnInit {
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
    this.usersService.getProfil().subscribe({
      next: (profile: any) => {
        this.userProfile = profile;
      },
      error: (error: any) => {
        // Gérez l'erreur
      },
    });
  }

}
