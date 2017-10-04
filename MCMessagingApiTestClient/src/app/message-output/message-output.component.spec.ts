import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageOutputComponent } from './message-output.component';

describe('MessageOutputComponent', () => {
  let component: MessageOutputComponent;
  let fixture: ComponentFixture<MessageOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
