import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseLinkService } from '../database-link.service';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss'],
})
export class VideoViewComponent implements OnInit {
  sanitizer
  videoPlayer;
  videoRatio;
  videoSource;

  constructor(private domSanitizer: DomSanitizer, private databaseLinkService : DatabaseLinkService) {
    this.videoRatio = 9 / 16;

    this.videoSource = this.domSanitizer.bypassSecurityTrustResourceUrl(
      'http://www.youtube.com/embed/9NK35FGIBjo'
    );
  }

  ngOnInit(): void {
    this.videoPlayer = document.getElementById('videoPlayer');
    this.setVideoHeight();
  }

  private setVideoHeight() {
    console.log('resize happening');

    const currentWidth = this.videoPlayer.offsetWidth;
    const newHeight = Math.round(currentWidth * this.videoRatio) + 'px';
    this.videoPlayer.style.height = newHeight;
  }

  public loadVideo (newVideoUrl: string) {
    newVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(newVideoUrl);
    this.videoSource = newVideoUrl;
  }
}
