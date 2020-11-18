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
  
  public historyList = [];

  constructor(
    databaseLinkService: DatabaseLinkService,
    videoControlService: VideoControlService
  ) {
    this.databaseLink = databaseLinkService;
    this.videoControl = videoControlService;

    this.databaseLink.History$.subscribe((newHistory) => {
      this.refreshHistory(newHistory);
    });

    this.videoControl.videoSource$.subscribe(() => {

      const newUrl = this.videoControl.getVideoSource();
      const isInHistory = this.historyList.find(
        (url) => (url === newUrl)
      );

      if(!isInHistory && newUrl !== this.videoControl.defaultVideo) {
        this.addToHistory(newUrl);
      }
    });
  }

  ngOnInit(): void {
    this.databaseLink.fetchHistory();
  }

  userClick(videoUrl: string) {
    this.videoControl.loadVideo(videoUrl);
  }

  refreshHistory(newHistory: string[]) {
    this.historyList = newHistory;
  }

  addToHistory(newEntry) {
    this.databaseLink.addToHistory(newEntry);
  }
}
