import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnterlocationPage } from './enterlocation.page';

describe('EnterlocationPage', () => {
  let component: EnterlocationPage;
  let fixture: ComponentFixture<EnterlocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterlocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterlocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
