import { Component, OnInit } from '@angular/core';
import { DatabaseLinkService } from '../database-link.service';
import { VideoControlService } from '../video-control.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  toggleButtonText = 'Show bookmarks';
  numberOfBookmarks;
  private bookmarksListSelector = 'bookmarksList';
  private videoControl: VideoControlService;
  private databaseLink: DatabaseLinkService;
  bookmarksList = [];

  constructor(
    dataBaseLinkService: DatabaseLinkService,
    videoControlService: VideoControlService
  ) {
    this.databaseLink = dataBaseLinkService;
    this.videoControl = videoControlService;

    this.databaseLink.mockBookmarks$.subscribe((newBookmarks) => {
      this.refreshBookmarks(newBookmarks);
    });
  }

  ngOnInit(): void {
    this.databaseLink.fetchBookmarks();
  }

  userClick(videoUrl: string) {
    this.videoControl.loadVideo(videoUrl, false);
  }

  addToBookmarks() {
    const currentVideoUrl = this.videoControl.getVideoSource().toString();
    console.log(currentVideoUrl);
    this.databaseLink.addToBookmarks(currentVideoUrl);
    console.log('user wants to add current video to  bookmarks');
  }

  refreshBookmarks(newBookmarks: string[]) {
    this.numberOfBookmarks = newBookmarks.length;
    this.bookmarksList = newBookmarks;
  }

  toggleBookmarks() {
    const bookmarksList = document.getElementById(this.bookmarksListSelector);

    bookmarksList.classList.toggle('open');
    this.toggleButtonText === 'Show bookmarks'
      ? (this.toggleButtonText = 'Hide bookmarks')
      : (this.toggleButtonText = 'Show bookmarks');
  }
}
