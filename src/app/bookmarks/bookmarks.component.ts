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
  }

  @Output() LoadVideoRequest = new EventEmitter<string>();

  ngOnInit(): void {
    this.fetchBookmarks();
  }

  userClick(videoUrl: string) {
    this.LoadVideoRequest.emit(videoUrl);
  }

  private fetchBookmarks() {
    this.bookmarksList = this.databaseLink.listBookmarks();
  }
}
