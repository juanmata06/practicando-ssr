import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  private _pageTitle = 'Pricing page';
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle(this._pageTitle);
    this.meta.updateTag({name: 'description', content: 'This is the pricing page.'});
    this.meta.updateTag({name: 'og:title', content: this._pageTitle});
    this.meta.updateTag({name: 'keywords', content: 'Pokemon,Pikachu,Bulbasaur'});
  }
}
