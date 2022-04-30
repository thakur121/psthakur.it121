import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherridelistPage } from './otherridelist.page';

describe('OtherridelistPage', () => {
  let component: OtherridelistPage;
  let fixture: ComponentFixture<OtherridelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherridelistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherridelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
