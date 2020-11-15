import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoControlService } from '../video-control.service';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss'],
})
export class VideoViewComponent implements OnInit {
  private videoControl: VideoControlService;
  private videoRatio = 9 / 16;
  private videoPlayer: HTMLElement;
  videoSource: SafeResourceUrl;

  constructor(
    private domSanitizer: DomSanitizer,
    private videoControlService: VideoControlService
  ) {
    this.videoControl = videoControlService;

    this.videoControl.videoSource$.subscribe((newSource) => {
      this.videoSource = newSource;
    });
  }

  ngOnInit(): void {
    this.videoControl.loadVideo(
      'https://www.youtube.com/watch?v=AYRwF3SCalU',
      false
    );
    this.videoPlayer = document.getElementById('videoPlayer');
    this.setVideoHeight();
  }

  private setVideoHeight() {
    const currentWidth = this.videoPlayer.offsetWidth;
    const newHeight = Math.round(currentWidth * this.videoRatio) + 'px';
    this.videoPlayer.style.height = newHeight;
  }
}
