import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseLinkService {
  private mockHistorySource = new BehaviorSubject<string[]>([]);
  private mockBookmarksSource = new Subject<string[]>();

  mockHistory$ = this.mockHistorySource.asObservable();
  mockBookmarks$ = this.mockBookmarksSource.asObservable();

  constructor() {}

  public fetchBookmarks() {
    //Make the API call to DB
    const mockBookmarks = [
      'https://www.youtube.com/watch?v=god7hAPv8f0',
      'https://www.youtube.com/watch?v=ezswBxBZhBc',
      'https://www.youtube.com/watch?v=I2dfGC1oziE',
      'wrongUrlTest',
    ];

    this.mockBookmarksSource.next(mockBookmarks);
  }

  public addToBookmarks(videoUrl: string) {
    if (videoUrl) {
      console.log('URL : ' + videoUrl + ' has been added to bookmarks');
      //make the API call

      this.fetchBookmarks();
    }
  }

  public fetchHistory() {
    //Make the API call to DB
    const mockHistory = [
      'https://www.youtube.com/watch?v=G9RA5v9Hy44',
      'https://www.youtube.com/watch?v=QD3Y40K-2-M',
      'https://www.youtube.com/watch?v=yoJ3nHNep-s',
    ];

    this.mockHistorySource.next(mockHistory);
  }

  public addToHistory(videoUrl: string) {

    const currentHistory = this.mockHistorySource.getValue();

    const previousLastEntry = currentHistory[(currentHistory.length-1)];

    if (videoUrl && previousLastEntry !== videoUrl) {

      console.log('URL : ' + videoUrl + ' has been added to history');
      //make the API call

      currentHistory.push(videoUrl);

      this.mockHistorySource.next(currentHistory);
    }
  }
}
