import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateperDePage } from './updateper-de.page';

describe('UpdateperDePage', () => {
  let component: UpdateperDePage;
  let fixture: ComponentFixture<UpdateperDePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateperDePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateperDePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
