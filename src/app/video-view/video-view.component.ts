import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent implements OnInit {
  videoPlayer;
  videoRatio;
  videoPlayerControl;

  constructor() {}

  ngOnInit(): void {
    this.videoPlayer = document.getElementById('videoPlayer');
    this.videoRatio = 9 / 16;

    this.setVideoHeight();
    this.initVideo();
  }

  private initVideo() {
    //window.videoPlayerControl.loadVideoById('iHCE8SVxbBM', 5, 'large');
  }

  private setVideoHeight() {
    console.log('resize happening');

    const currentWidth = this.videoPlayer.offsetWidth;
    const newHeight = Math.round(currentWidth * this.videoRatio) + 'px';
    this.videoPlayer.style.height = newHeight;
  }
}
