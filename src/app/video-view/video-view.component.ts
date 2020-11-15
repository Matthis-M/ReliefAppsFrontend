import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseLinkService } from '../database-link.service';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss'],
})
export class VideoViewComponent implements OnInit {
  private youtubeUrlRegexp = new RegExp(
    '^https?:\\/\\/(w{3}\\.)?youtube\\.com\\/watch\\?v=([A-Za-z0-9_-]{11})'
  );
  private videoIdRegexp = new RegExp('watch\\?v=([A-Za-z0-9_-]{11})');

  private videoRatio = 9 / 16;
  private videoPlayer;
  private videoSource;

  constructor(
    private domSanitizer: DomSanitizer,
    private databaseLinkService: DatabaseLinkService
  ) {}

  ngOnInit(): void {
    this.loadVideo('http://youtube.com/watch?v=NYWzJrY3JPw');
    this.videoPlayer = document.getElementById('videoPlayer');
    this.setVideoHeight();
  }

  private setVideoHeight() {
    const currentWidth = this.videoPlayer.offsetWidth;
    const newHeight = Math.round(currentWidth * this.videoRatio) + 'px';
    this.videoPlayer.style.height = newHeight;
  }

  public loadVideo(newVideoUrl: string) {
    if (this.youtubeUrlRegexp.test(newVideoUrl)) {
      const videoId = this.videoIdRegexp.exec(newVideoUrl)[1];
      this.videoSource = this.domSanitizer.bypassSecurityTrustResourceUrl(
        'http://www.youtube.com/embed/' + videoId
      );
    } else {
      window.alert(
        "The chosen Youtube URL is invalid, please try again with a valid one.\nIt should be similar to this : 'https://www.youtube.com/watch?v=AYRwF3SCalU'"
      );
    }
  }

  public getVideoSource() {
    return this.videoSource;
  }
}
