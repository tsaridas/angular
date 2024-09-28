import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManifestService } from './manifest.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Ensure this import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ManifestService]
})
export class AppComponent implements OnInit {
  title = 'src';
  manifestData: any;

  constructor(private manifestService: ManifestService) {}
  

  ngOnInit(): void {
    this.manifestService.getManifest().subscribe(data => {
      this.manifestData = data;
    });
  }

  refreshData() { // Add this method to call retrieveData
    this.manifestService.getManifest().subscribe((data) => {
      this.manifestData = data;
    });
  }
}
