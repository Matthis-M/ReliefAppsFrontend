import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(private domSanitizer: DomSanitizer) {
    this.videoRatio = 9 / 16;

    this.sanitizer = domSanitizer;
    this.videoSource = this.sanitizer.bypassSecurityTrustResourceUrl(
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
}
