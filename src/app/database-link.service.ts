import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseLinkService {
  private listBookmarksEndpoint = 'https://127.0.0.1:8000/listBookmarks';
  private addBookmarkEndpoint = 'https://127.0.0.1:8000/addBookmark';
  private listHistoryEndpoint = 'https://127.0.0.1:8000/listHistory';
  private addHistoryEndpoint = 'https://127.0.0.1:8000/addHistory';
  private clearAllEndpoint = 'https://127.0.0.1:8000/clearAll';

  private HistorySource = new BehaviorSubject<string[]>([]);
  private BookmarksSource = new BehaviorSubject<string[]>([]);

  public History$ = this.HistorySource.asObservable();
  public Bookmarks$ = this.BookmarksSource.asObservable();

  constructor(private httpClient: HttpClient) {
    this.fetchBookmarks();
    this.fetchHistory();
  }

  public async fetchBookmarks() {
    const request = this.httpClient.get(this.listBookmarksEndpoint);
    request.subscribe(
      (response: string) => {
        const updatedBookmarks = JSON.parse(response);
        this.BookmarksSource.next(updatedBookmarks);
      },
      (error) => {
        console.log(
          'error: impossible to fetch data from "' +
            this.listBookmarksEndpoint +
            '". Check the following error message for more information. Maybe try to reboot the server or check the CORS parameters.'
        );
        console.log(error);
      }
    );
  }

  public addToBookmarks(videoUrl: string) {
    const isAlreadyBookmarked = this.BookmarksSource.getValue().find(
      (url) => (url === videoUrl)
    );

    if (isAlreadyBookmarked) {
      alert('This video is already bookmarked !');
      return;
    }

    if (videoUrl) {
      const JsonData = {
        videoUrl: videoUrl,
      };

      this.httpClient.post(this.addBookmarkEndpoint, JsonData).subscribe(
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
    const request = this.httpClient.get(this.listHistoryEndpoint);
    request.subscribe(
      (response: string) => {
        const updatedHistory = JSON.parse(response);
        this.HistorySource.next(updatedHistory);
      },
      (error) => {
        console.log(
          'error during the api call to "' +
            this.listHistoryEndpoint +
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

      this.httpClient.post(this.addHistoryEndpoint, JsonData).subscribe(
        (response: string) => {
          console.log(response);
        },
        () => {
          this.fetchHistory();
        }
      );
    }
  }

  public clearAll() {
    this.httpClient.get(this.clearAllEndpoint).subscribe(
      (response: string) => {
        console.log(response);
      },
      () => {
        window.alert("The data has been cleared.");
        this.fetchBookmarks();
        this.fetchHistory();
      }
    );
  }
}
