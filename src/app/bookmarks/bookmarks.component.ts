import { Component, OnInit } from '@angular/core';
import { DatabaseLinkService } from '../database-link.service';
import { VideoControlService } from '../video-control.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  private bookmarksListSelector = 'bookmarksList';
  private videoControl: VideoControlService;
  private databaseLink: DatabaseLinkService;

  // Initial text for the "show bookmarks" button, it also serves as a condition
  public toggleButtonText = 'Show bookmarks';
  // Label showing the current number of bookmarks in the database
  public numberOfBookmarks: number;
  // List containing all the bookmarks for the template
  public bookmarksList = [];

  constructor(
    dataBaseLinkService: DatabaseLinkService,
    videoControlService: VideoControlService
  ) {
    // Dependency injection to use both services
    this.databaseLink = dataBaseLinkService;
    this.videoControl = videoControlService;

    // Observer that refreshes the bookmarks as soon as the value gets changed from an API call to the backend
    this.databaseLink.Bookmarks$.subscribe((newBookmarks) => {
      this.refreshBookmarks(newBookmarks);
    });
  }

  ngOnInit(): void {
    // Initially gets the latest values from the database at initialization of the component
    this.databaseLink.fetchBookmarks();
  }

  // Send an order to the service to load the link clicked by the user.
  userClick(videoUrl: string) {
    this.videoControl.loadVideo(videoUrl);
  }

  // This function is bound to the user clicking on the "add to bookmarks button"
  addToBookmarks() {
    // Get the current video's URL from the video service
    const currentVideoUrl = this.videoControl.getVideoSource();
    // Ask the database service to save it
    this.databaseLink.addToBookmarks(currentVideoUrl);
  }

  // Update the values of the private members to match the latest information received from the backend
  refreshBookmarks(newBookmarks: string[]) {
    // Update the bookmarks counter
    this.numberOfBookmarks = newBookmarks.length;
    // Update the bookmarks list
    this.bookmarksList = newBookmarks;
  }

  // Toggle the bookmark list on click
  toggleBookmarks() {
    const bookmarksList = document.getElementById(this.bookmarksListSelector);

    // Toggle the "open" class on the element for the CSS toggling effect to play
    bookmarksList.classList.toggle('open');
    // Toggle the text on the button
    this.toggleButtonText === 'Show bookmarks'
      ? (this.toggleButtonText = 'Hide bookmarks')
      : (this.toggleButtonText = 'Show bookmarks');
  }

  // Method to clear all the history and bookmarks data in the database
  clearAll() {
    const choice = window.confirm(
      'Do you really want to reset History and Bookmarks ? This action is irreversible'
    );
    this.databaseLink.clearAll();
  }
}
