import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseLinkService {
  // List of all the URLs of the backend API
  private listBookmarksEndpoint = 'https://127.0.0.1:8000/listBookmarks';
  private addBookmarkEndpoint = 'https://127.0.0.1:8000/addBookmark';
  private listHistoryEndpoint = 'https://127.0.0.1:8000/listHistory';
  private addHistoryEndpoint = 'https://127.0.0.1:8000/addHistory';
  private clearAllEndpoint = 'https://127.0.0.1:8000/clearAll';

  // Subjects containing all the data that should be fetched from the backend API
  // Because other components rely on this data and need to have the most up-to-date
  // version, those two observables are being watch, and as soon as their values
  // are updated, the components are informed of it
  private HistorySource = new BehaviorSubject<string[]>([]);
  private BookmarksSource = new BehaviorSubject<string[]>([]);

  public History$ = this.HistorySource.asObservable();
  public Bookmarks$ = this.BookmarksSource.asObservable();

  // When this service is instanciated, it queries the API for the latest values
  constructor(private httpClient: HttpClient) {
    this.fetchBookmarks();
    this.fetchHistory();
  }

  // Fetch the bookmarks list from the backend API
  public async fetchBookmarks() {
    // httpClient makes the request to the API and store the answer
    const request = this.httpClient.get(this.listBookmarksEndpoint);
    request.subscribe(
      // According to the answer, initiate different actions
      (response: string) => {
        // Parse the JSON answer and update the values
        const updatedBookmarks = JSON.parse(response);
        this.BookmarksSource.next(updatedBookmarks);
      },
      (error) => {
        // If an error happens, discretly inform the user with a console log
        console.log(
          'error: impossible to fetch data from "' +
            this.listBookmarksEndpoint +
            '". Check the following information for more information. Maybe try to reboot the server or check the CORS parameters.'
        );
        console.log(error);
      }
    );
  }

  // Check if the URL is already bookmark and request the API if not
  public addToBookmarks(videoUrl: string) {
    // If the URL isn't an empty string
    if (videoUrl) {
      // Try to find the URL in the current bookmarks
      const isAlreadyBookmarked = this.BookmarksSource.getValue().find(
        (url) => (url === videoUrl)
      );

      // Inform the user if it is and cancel the rest of the operation
      if (isAlreadyBookmarked) {
        alert('This video is already bookmarked !');
        return;
      }

      // Set the body of the JSON for the request
      const JsonData = {
        videoUrl: videoUrl,
      };

      // Make a POST request to the API with the JSON data to add the bookmark
      this.httpClient.post(this.addBookmarkEndpoint, JsonData).subscribe(
        // If an error happens, discretly inform the user with a console log
        (error: string) => {
          console.log(
            'error: impossible to reach "' +
              this.addBookmarkEndpoint +
              '" to add the bookmark. Check the following information for more information. Maybe try to reboot the server or check the CORS parameters.'
          );
          console.log(error);
        },
        // When the answer is received, refresh the bookmarks list so it can include the new one
        () => {
          this.fetchBookmarks();
        }
      );
    }
  }

  // Fetch the history from the backend API
  public async fetchHistory() {
    // httpClient makes the request to the API and store the answer
    const request = this.httpClient.get(this.listHistoryEndpoint);
    request.subscribe(
      // According to the answer, initiate different actions
      (response: string) => {
        // Parse the JSON answer and update the values
        const updatedHistory = JSON.parse(response);
        this.HistorySource.next(updatedHistory);
      },
      (error) => {
        // If an error happens, discretly inform the user with a console log
        console.log(
          'error during the api call to "' +
            this.listHistoryEndpoint +
            '". Check the following information for more informations. Maybe check your CORS parameters.'
        );
        console.log(error);
      }
    );
  }

  // Request the API to add the history entry
  public addToHistory(videoUrl: string) {
    // If the URL isn't an empty string
    if (videoUrl) {
      // Set the body of the JSON for the request
      const JsonData = {
        videoUrl: videoUrl,
      };

      // Make a POST request to the API with the JSON data to add the bookmark
      this.httpClient.post(this.addHistoryEndpoint, JsonData).subscribe(
        // If an error happens, discretly inform the user with a console log
        (error: string) => {
          console.log(
            'error: impossible to reach "' +
              this.addHistoryEndpoint +
              '" to add the history entry. Check the following information for more information. Maybe try to reboot the server or check the CORS parameters.'
          );
          console.log(error);
        },
        // When the answer is received, refresh the bookmarks list so it can include the new one
        () => {
          this.fetchHistory();
        }
      );
    }
  }

  // Reset all history and bookmarks data
  public clearAll() {
    // Simple GET request to the API on the dedicated route
    this.httpClient.get(this.clearAllEndpoint).subscribe(
      // If an error happens, discretly inform the user with a console log
      (error: string) => {
        console.log(
          'error: impossible to reach "' +
            this.clearAllEndpoint +
            '" to clear all the data. Check the following information for more information. Maybe try to reboot the server or check the CORS parameters.'
        );
        console.log(error);
      },
      // When the answer is received, refresh the bookmarks and history lists
      () => {
        this.fetchBookmarks();
        this.fetchHistory();
      }
    );
  }
}
