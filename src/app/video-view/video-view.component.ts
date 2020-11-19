import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { VideoControlService } from '../video-control.service';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss'],
})
export class VideoViewComponent implements OnInit {
  // Ratio of classic youtube video player
  private videoRatio = 9 / 16;
  // The service which will be used to control the video
  private videoControl: VideoControlService;
  // The actual video player element (Youtube IFrame)
  private videoPlayer: HTMLElement;
  // The source URL for the IFrame, in the "embed format". It can't be a simple string for XSS-security reasons
  public videoSource: SafeResourceUrl;

  constructor(private videoControlService: VideoControlService) {
    this.videoControl = videoControlService;

    // Observe the source URL described in the video control service
    this.videoControl.videoSource$.subscribe((newSource) => {
      // Whenever its value changes, automatically update the player's source with the new value
      this.videoSource = newSource;
    });
  }

  // On initialization of the component
  ngOnInit(): void {
    // A request is made to the video control service to load the default welcoming video
    this.videoControl.loadVideo(this.videoControl.defaultVideo);
    // The size of the player is automatically fixed to the proper ratio
    this.videoPlayer = document.getElementById('videoPlayer');
    this.setVideoHeight();
  }

  // Set the height of the player to keep the 16:9 ration
  // Usually, one should rely on CSS-based solution for this kind of matters, but the relative width in percents
  // of the player makes it difficult in pure CSS, so I think this lightweight fix is an appropriate solution 
  private setVideoHeight() {
    // Get the current width of the player in pixels
    const currentWidth = this.videoPlayer.offsetWidth;
    // Calculate what height would be needed to match the 16:9 ratio
    const newHeight = Math.round(currentWidth * this.videoRatio) + 'px';
    // Apply the new height
    this.videoPlayer.style.height = newHeight;
  }
}
