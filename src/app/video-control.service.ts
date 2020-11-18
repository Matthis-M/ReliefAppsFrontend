import { Injectable, ɵSafeResourceUrl } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoControlService {
  private youtubeUrlRegexp = new RegExp(
    '^https?:\\/\\/(w{3}\\.)?youtube\\.com\\/watch\\?v=([A-Za-z0-9_-]{11})'
  );
  private videoIdRegexp = new RegExp('watch\\?v=([A-Za-z0-9_-]{11})');

  public defaultVideo = 'https://www.youtube.com/watch?v=AYRwF3SCalU';

  private videoSourceSource = new Subject<ɵSafeResourceUrl>();

  private videoSourceString = '';

  videoSource$ = this.videoSourceSource.asObservable();

  constructor(private domSanitizer: DomSanitizer) {}

  public loadVideo(newVideoUrl: string) {
    const videoUrlValidationResult = this.youtubeUrlRegexp.exec(newVideoUrl);

    if (videoUrlValidationResult) {
      this.videoSourceString = newVideoUrl;

      const videoId = this.videoIdRegexp.exec(newVideoUrl)[1];

      const safeNewVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
        'http://www.youtube.com/embed/' + videoId
      );

      this.videoSourceSource.next(safeNewVideoUrl);
    } else {
      window.alert(
        "The chosen Youtube URL is invalid, please try again with a valid one.\nIt should be similar to this : 'https://www.youtube.com/watch?v=AYRwF3SCalU'"
      );
    }
  }

  public getVideoSource() {
    return this.videoSourceString;
  }
}
