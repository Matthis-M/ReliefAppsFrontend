import { Component, OnInit } from '@angular/core';
import { DatabaseLinkService } from '../database-link.service';
import { VideoControlService } from '../video-control.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  private videoControl: VideoControlService;
  private databaseLink: DatabaseLinkService;
  // List containing all the history entries for the template
  public historyList = [];

  constructor(
    databaseLinkService: DatabaseLinkService,
    videoControlService: VideoControlService
  ) {
    // Dependency injection to use both services
    this.databaseLink = databaseLinkService;
    this.videoControl = videoControlService;

    // Observer that refreshes the history as soon as the value gets changed from an API call to the backend
    this.databaseLink.History$.subscribe((newHistory) => {
      this.refreshHistory(newHistory);
    });

    // Observer that automatcally add the new video URL to history when it changes, if it's not already present
    this.videoControl.videoSource$.subscribe(() => {
      // Get the video URL from the video control service
      const newUrl = this.videoControl.getVideoSource();
      // Try to get fin the new URL in the current history
      const isInHistory = this.historyList.find((url) => url === newUrl);

      // Add the URL if it isn't already in the history and it's not the default video (we don't want to add that one)
      if (!isInHistory && newUrl !== this.videoControl.defaultVideo) {
        this.addToHistory(newUrl);
      }
    });
  }

  ngOnInit(): void {
    // Initially gets the latest values from the database at initialization of the component
    this.databaseLink.fetchHistory();
  }

  // Send an order to the service to load the link clicked by the user.
  userClick(videoUrl: string) {
    this.videoControl.loadVideo(videoUrl);
  }

  // Update the values of the history to match the latest information received from the backend
  refreshHistory(newHistory: string[]) {
    this.historyList = newHistory;
  }

  // Ask the database service to save the entry
  addToHistory(newEntry) {
    this.databaseLink.addToHistory(newEntry);
  }
}
