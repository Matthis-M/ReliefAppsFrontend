import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatabaseLinkService } from '../database-link.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  databaseLink;
  historyList = [];

  constructor(databaseLinkService: DatabaseLinkService) {
    this.databaseLink = databaseLinkService;
  }

  @Output() LoadVideoRequest = new EventEmitter<string>();

  ngOnInit(): void {
    this.fetchHistory();
  }

  userClick(videoUrl: string) {
    this.LoadVideoRequest.emit(videoUrl);
  }

  private fetchHistory() {
    this.historyList = this.databaseLink.listHistory();
  }
}
