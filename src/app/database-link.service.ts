import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseLinkService {
  private storage;
  private bookmarksKey = 'RA-VideoPlayerBookmarks';
  private historyKey = 'RA-VideoPlayerHistory';

  constructor() {
    this.storage = window.localStorage;
  }

  public listBookmarks() {}

  public addToBookmarks(videoUrl: string) {}

  public listHistory() {}

  public addToHistory(videoUrl: string) {}
}
