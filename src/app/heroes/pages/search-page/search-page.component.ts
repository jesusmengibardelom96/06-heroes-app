import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public searchInput = new FormControl('')

  public heroes: Hero[] = []

  constructor(private heroesService:HeroesService){}

  searchHero() {
    const value: string = this.searchInput.value || ''
    this.heroesService.getSuggestions(value).subscribe(heroes=>this.heroes = heroes)
    console.log(value, this.heroes);
  }

}
