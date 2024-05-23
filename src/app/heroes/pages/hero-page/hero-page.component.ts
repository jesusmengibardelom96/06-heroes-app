import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero


  constructor(private heroesService: HeroesService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  goBack():void{
    this.router.navigateByUrl('heroes/list')
  }
  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      delay(1500),
      switchMap(({ id }) => this.heroesService.getHeroesById(id))
    ).subscribe(hero => {
      if (!hero) this.router.navigate(['/heroes/list'])

      this.hero = hero
      console.log({hero});

    })
  }
}
