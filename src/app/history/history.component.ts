import { Component, OnInit } from '@angular/core';
import { DatabaseLinkService } from '../database-link.service';
import { VideoControlService } from '../video-control.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  private videoControl: VideoControlService;
  private databaseLink: DatabaseLinkService;
  historyList = [];

  constructor(
    databaseLinkService: DatabaseLinkService,
    videoControlService: VideoControlService
  ) {
    this.databaseLink = databaseLinkService;
    this.videoControl = videoControlService;

    this.databaseLink.mockHistory$.subscribe((newHistory) => {
      this.refreshHistory(newHistory);
    });

    this.videoControl.videoSource$.subscribe((newSource) => {
      this.addToHistory(this.videoControl.getVideoSource());
    });
  }

  ngOnInit(): void {
    this.databaseLink.fetchHistory();
  }

  userClick(videoUrl: string) {
    this.videoControl.loadVideo(videoUrl, false);
  }

  refreshHistory(newHistory: string[]) {
    this.historyList = newHistory;
  }

  addToHistory(newEntry) {
    this.databaseLink.addToHistory(newEntry);
  }
}
