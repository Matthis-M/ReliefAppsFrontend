import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseLinkService {
  private HistorySource = new BehaviorSubject<string[]>([]);
  private BookmarksSource = new BehaviorSubject<string[]>([]);

  History$ = this.HistorySource.asObservable();
  Bookmarks$ = this.BookmarksSource.asObservable();

  private bookmarksEndpoint = 'https://127.0.0.1:8000/bookmarks';
  private historyEndpoint = 'https://127.0.0.1:8000/history';

  constructor(private httpClient: HttpClient) {
    this.fetchBookmarks();
    this.fetchHistory();
  }

  public async fetchBookmarks() {
    const request = this.httpClient.get(this.bookmarksEndpoint);
    request.subscribe(
      (response: string) => {
        const updatedBookmarks = JSON.parse(response);
        this.BookmarksSource.next(updatedBookmarks);
      },
      (error) => {
        console.log(
          'error: impossible to fetch data from "' +
            this.bookmarksEndpoint +
            '". Check the following error message for more information. Maybe try to reboot the server or check the CORS parameters.'
        );
        console.log(error);
      }
    );
  }

  public addToBookmarks(videoUrl: string) {
    const isAlreadyBookmarked = this.BookmarksSource.getValue().find(
      (url) => url === videoUrl
    );

    if (isAlreadyBookmarked) {
      alert('This video is already bookmarked !');

      return;
    }

    if (videoUrl) {
      const JsonData = {
        videoUrl: videoUrl,
      };

      this.httpClient.post(this.bookmarksEndpoint, JsonData).subscribe(
        (response: string) => {
          console.log(response);
        },
        () => {
          this.fetchBookmarks();
        }
      );
    }
  }

  public async fetchHistory() {
    const request = this.httpClient.get(this.historyEndpoint);
    request.subscribe(
      (response: string) => {
        const updatedHistory = JSON.parse(response);
        this.HistorySource.next(updatedHistory);
      },
      (error) => {
        console.log(
          'error during the api call to "' +
            this.historyEndpoint +
            '". Check the following error message for more informations. Maybe check your CORS parameters.'
        );
        console.log(error);
      }
    );
  }

  public addToHistory(videoUrl: string) {
    this.fetchHistory();

    if (videoUrl) {
      const JsonData = {
        videoUrl: videoUrl,
      };

      this.httpClient.post(this.historyEndpoint, JsonData).subscribe(
        (response: string) => {
          console.log(response);
        },
        () => {
          this.fetchHistory();
        }
      );
    }
  }
}
