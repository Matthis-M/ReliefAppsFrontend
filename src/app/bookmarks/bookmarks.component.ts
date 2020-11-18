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

  public toggleButtonText = 'Show bookmarks';
  public numberOfBookmarks: number;
  public bookmarksList = [];

  constructor(
    dataBaseLinkService: DatabaseLinkService,
    videoControlService: VideoControlService
  ) {
    this.databaseLink = dataBaseLinkService;
    this.videoControl = videoControlService;

    this.databaseLink.Bookmarks$.subscribe((newBookmarks) => {
      this.refreshBookmarks(newBookmarks);
    });
  }

  ngOnInit(): void {
    this.databaseLink.fetchBookmarks();
  }

  userClick(videoUrl: string) {
    this.videoControl.loadVideo(videoUrl);
  }

  addToBookmarks() {
    const currentVideoUrl = this.videoControl.getVideoSource();
    this.databaseLink.addToBookmarks(currentVideoUrl);
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
