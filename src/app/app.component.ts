import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManifestService } from './manifest.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Ensure this import
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, FormsModule], // Add HttpClientModule here
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ManifestService]
})
export class AppComponent implements OnInit {
  title = 'src';
  manifestData: any;
  users: any = { users: [] }; // Initialize users as an object with a users array
  currentPage = 1;
  searchName: string = ''; // Added for search functionality

  constructor(private manifestService: ManifestService) {}

  ngOnInit(): void {
    this.manifestService.getManifest().subscribe(data => {
      this.manifestData = data;
    });
    this.loadUsersByPage(this.currentPage);
  }

  refreshData() { // Add this method to call retrieveData
    this.manifestService.getManifest().subscribe((data) => {
      this.manifestData = data;
    });
    this.loadUsersByPage(1);
  }

  loadUsersByPage(page: number) {
    this.manifestService.getUsersByPage(page).subscribe(data => {
      if (data && Array.isArray(data.users)) { // Check if data.users is an array
        this.users = data; // Assign the entire response
      } else {
        console.error('Unexpected response structure', data);
      }
    });
  }

  loadMoreUsers() {
    this.currentPage = this.users.page + 1;
    this.loadUsersByPage(this.currentPage);
  }

  searchUsersByName() {
    if (this.searchName) {
      this.manifestService.getUsersByName(this.searchName).subscribe(data => {
        if (data && Array.isArray(data.users)) { // Check if data.users is an array
          this.users = data; // Assign the entire response
        } else {
          console.error('Unexpected response structure', data);
        }
      });
    } else {
      console.error('Search name is required');
    }
  }
}
