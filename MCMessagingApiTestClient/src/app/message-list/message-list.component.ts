import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mc-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  @Input() messages: any;

  constructor() { }

  ngOnInit() {
  }

}
