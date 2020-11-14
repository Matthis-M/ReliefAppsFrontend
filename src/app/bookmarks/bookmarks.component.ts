import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  constructor() {}

  @Output() LoadVideoRequest = new EventEmitter<string>();

  ngOnInit(): void {}

  clicked() {
    this.LoadVideoRequest.emit('https://www.youtube.com/watch?v=fdixQDPA2h0');
  }
}
