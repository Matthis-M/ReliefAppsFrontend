import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  onEnter(userInput:string) {
    console.log("user would like to play : " +userInput);

  }

}
