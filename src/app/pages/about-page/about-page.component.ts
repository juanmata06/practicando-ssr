import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {
  private _pageTitle = 'About page';
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle(this._pageTitle);
    this.meta.updateTag({name: 'description', content: 'This is the about page.'});
    this.meta.updateTag({name: 'og:title', content: this._pageTitle});
    this.meta.updateTag({name: 'keywords', content: 'Pokemon,Pikachu,Bulbasaur'});
  }
}
