import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'mc-api-key-input',
  templateUrl: './api-key-input.component.html',
  styleUrls: ['./api-key-input.component.scss']
})
export class ApiKeyInputComponent implements OnInit {

  apiTokenControl = new FormControl('', [
    Validators.required]);

  @Output() apiTokenChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.apiTokenControl.valueChanges.debounceTime(1000).distinctUntilChanged() .subscribe(value => {
      this.apiTokenChanged.emit(value);
    });
  }

}
