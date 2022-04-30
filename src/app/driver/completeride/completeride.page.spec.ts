import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompleteridePage } from './completeride.page';

describe('CompleteridePage', () => {
  let component: CompleteridePage;
  let fixture: ComponentFixture<CompleteridePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteridePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompleteridePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
