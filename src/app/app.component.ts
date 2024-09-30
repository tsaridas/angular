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
  searchTimeout: ReturnType<typeof setTimeout> | undefined;
  randomData: any; // Added to hold random data
  private subscription: any; // Added to hold the subscription to WebSocket

  constructor(private manifestService: ManifestService) {}

  ngOnInit(): void {
    this.manifestService.getManifest().subscribe(data => {
      this.manifestData = data;
    });
    this.loadUsersByPage(this.currentPage);
    this.getRandomData(); // Call getRandomData on initialization
    this.startWebSocketSubscription(); // Start WebSocket subscription
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
    clearTimeout(this.searchTimeout); // Clear any existing timeout
    this.searchTimeout = setTimeout(() => { // Set a new timeout
      if (this.searchName) {
        this.manifestService.getUsersByName(this.searchName).subscribe(data => {
          if (data && Array.isArray(data.users)) { // Check if data.users is an array
            this.users = data; // Assign the entire response
          } else {
            console.error('Unexpected response structure', data);
          }
        }, error => {
          console.error('Error fetching users:', error); // Handle errors
        });
      } else {
        this.loadUsersByPage(this.currentPage); // Optionally reload users if search is empty
      }
    }, 500); // Wait for 500ms before calling the API
  }

  getRandomData() {
    this.manifestService.getRandomData().subscribe(data => {
      console.log('Random data received:', data); // Log the received data
      this.randomData = data; // Assign the random data
    }, error => {
      console.error('Error fetching random data:', error); // Log the error
    });
  }

  startWebSocketSubscription() {
    this.subscription = this.manifestService.getRandomData().subscribe(data => {
      console.log('WebSocket data received:', data); // Log the received WebSocket data
      this.randomData = data; // Assign the WebSocket data
    }, error => {
      console.error('Error receiving WebSocket data:', error); // Log the error
    });
  }

}
