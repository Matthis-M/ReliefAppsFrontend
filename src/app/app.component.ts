import { Component, ViewChild } from '@angular/core';
import { VideoViewComponent } from './video-view/video-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ReliefAppsFrontend';

  constructor() {}

  @ViewChild(VideoViewComponent)
  private videoViewComponent: VideoViewComponent;

  loadVideo(msg: string) {
    console.log(msg);
    this.videoViewComponent.loadVideo(msg);
  }
}
