import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatabaseLinkService } from '../database-link.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  databaseLink;
  bookmarksList = [];

  constructor(dataBaseLinkService: DatabaseLinkService) {
    this.databaseLink = dataBaseLinkService;

    this.databaseLink.mockBookmarks$.subscribe((newBookmarks) => {
      this.refreshBookmarks(newBookmarks);
    });
  }

  @Output() LoadVideoRequest = new EventEmitter<string>();
  @Output() AddToBookmarksRequest = new EventEmitter<any>();

  ngOnInit(): void {
    this.databaseLink.fetchBookmarks();
  }

  userClick(videoUrl: string) {
    this.LoadVideoRequest.emit(videoUrl);
  }

  addToBookmarks() {
    console.log("user wants to add current video to  bookmarks");
  }

  refreshBookmarks(newBookmarks: string[]) {
    this.bookmarksList = newBookmarks;
  }
}
