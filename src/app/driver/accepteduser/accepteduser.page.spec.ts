import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccepteduserPage } from './accepteduser.page';

describe('AccepteduserPage', () => {
  let component: AccepteduserPage;
  let fixture: ComponentFixture<AccepteduserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccepteduserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccepteduserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
