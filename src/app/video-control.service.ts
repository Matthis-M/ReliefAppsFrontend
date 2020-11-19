import { Injectable, ɵSafeResourceUrl } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoControlService {
  // Regex that allows to check that the URL is in a correct Youtube format :
  // It includes http and https, with or without "www.", and no "embed" URL
  private youtubeUrlRegexp = new RegExp(
    '^https?:\\/\\/(w{3}\\.)?youtube\\.com\\/watch\\?v=([A-Za-z0-9_-]{11})'
  );
  // Regex that allows the extraction of the videoId from the URL
  private videoIdRegexp = new RegExp('watch\\?v=([A-Za-z0-9_-]{11})');
  // Default video to show on the player
  public defaultVideo = 'https://www.youtube.com/watch?v=AYRwF3SCalU';
  // Contains the URL source of the video. It cannot be a simple string for XSS-security reasons
  // It's also a subject that will be observed for the player to use the new value when it changes
  private videoSourceSource = new Subject<ɵSafeResourceUrl>();
  // string holding the URL source of the currently playing video in the "watch?v=" format
  private videoSourceString = '';

  public videoSource$ = this.videoSourceSource.asObservable();

  constructor(private domSanitizer: DomSanitizer) {}

  // Load a new video from the provided URL if it's correct
  public loadVideo(newVideoUrl: string) {
    // Check the validity of the URL
    const videoUrlValidationResult = this.youtubeUrlRegexp.exec(newVideoUrl);

    // If it's valid
    if (videoUrlValidationResult) {
      // Update the string source
      this.videoSourceString = newVideoUrl;

      // Get the video ID from the "watch?v=" formatted new URL
      const videoId = this.videoIdRegexp.exec(newVideoUrl)[1];

      // Change the URL to an "embed" format so it can be used by the player
      // Also use a sanitizer to certify the safety of the URL
      const safeNewVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
        'http://www.youtube.com/embed/' + videoId
      );

      // Update the value of the source and inform the listening subscribers
      this.videoSourceSource.next(safeNewVideoUrl);
    } else {
      // If the URL was found to be invalid, ask the user to provid a valid one
      window.alert(
        "The chosen Youtube URL is invalid, please try again with a valid one.\nIt should be similar to this : 'https://www.youtube.com/watch?v=AYRwF3SCalU'"
      );
    }
  }

  // Return the URL of the currently playing video, as a string and
  // in a "watch?v=" format so it can be used by the other components
  public getVideoSource() {
    return this.videoSourceString;
  }
}
