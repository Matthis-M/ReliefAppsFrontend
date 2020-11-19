import { Component, OnInit } from '@angular/core';
import { VideoControlService } from '../video-control.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  private videoControl: VideoControlService;

  constructor(videoControlService: VideoControlService) {
    this.videoControl = videoControlService;
  }

  ngOnInit(): void {}

  // Asks the video control service to load the video. It's the only role of the searchBar
  loadVideo(userInput: string) {
    this.videoControl.loadVideo(userInput);
  }
}
