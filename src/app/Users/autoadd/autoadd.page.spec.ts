import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutoaddPage } from './autoadd.page';

describe('AutoaddPage', () => {
  let component: AutoaddPage;
  let fixture: ComponentFixture<AutoaddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoaddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutoaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
