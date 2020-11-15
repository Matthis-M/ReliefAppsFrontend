import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseLinkService {
  constructor() {}

  public listBookmarks() {
    const mockBookmarks = [
      'https://www.youtube.com/watch?v=god7hAPv8f0',
      'https://www.youtube.com/watch?v=ezswBxBZhBc',
      'https://www.youtube.com/watch?v=I2dfGC1oziE',
      'wrongUrlTest',
    ];

    return mockBookmarks;
  }

  public addToBookmarks(videoUrl: string) {
    console.log('URL : ' + videoUrl + ' has been added to bookmarks');
  }

  public listHistory() {
    const mockHistory = [
      'https://www.youtube.com/watch?v=G9RA5v9Hy44',
      'https://www.youtube.com/watch?v=QD3Y40K-2-M',
      'https://www.youtube.com/watch?v=yoJ3nHNep-s',
    ];

    return mockHistory;
  }

  public addToHistory(videoUrl: string) {
    console.log('URL : ' + videoUrl + ' has been added to history');
  }
}
