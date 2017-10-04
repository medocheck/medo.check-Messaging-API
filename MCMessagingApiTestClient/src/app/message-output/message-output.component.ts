import { MessageStoreService } from './../common/message-store.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Rx';

interface MessageList {
  messages: Array<string>;
}

@Component({
  selector: 'mc-message-output',
  templateUrl: './message-output.component.html',
  styleUrls: ['./message-output.component.scss']
})
export class MessageOutputComponent implements OnInit, OnChanges {

  @Input() apiToken = '';
  pollingSubscription: any;
  apiKeyValid = false;
  messages = [];
  constructor(private store: MessageStoreService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.stopPolling();
    if (this.apiToken && this.apiToken.length > 0) {
      this.startPolling(changes.apiToken.currentValue);
    }
  }

  startPolling(apiToken) {
    this.apiKeyValid = true;
    this.pollingSubscription = Observable.interval(5000)
      .switchMap(() => this.store.getMessageList(apiToken))
      .subscribe((messages: MessageList) => {
        messages.messages.forEach(element => {
          this.store.acknowledgeMessage(this.apiToken, element).subscribe(message => {
            this.messages.push(message);
          });
        });
      }, error => {
        this.stopPolling();
        if (error.status === 401) {
          this.apiKeyValid = false;
        }
      });
  }

  stopPolling() {
    this.apiKeyValid = false;
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

}
