import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  popular: Array<Movie>;
  theaters: Array<Movie>;
  kids: Array<Movie>;
  drama: Array<Movie>;
  searchRes: any;

  isSearch: boolean;

  constructor(private moviesService: MoviesService) { }

  search(myQuery) {
    this.moviesService
      .findAMovie(myQuery.search)
      .subscribe(data => {        
        this.searchRes = data;
        if(this.searchRes.results.length > 0){
          this.isSearch = true;
        }        
      })
  }

  ngOnInit() {
    this.moviesService
      .getPopular()
      .subscribe(data => {
        this.popular = data;
      });

    this.moviesService
      .getTheaters()
      .subscribe(data => {
        this.theaters = data;
      });

    this.moviesService
      .getKids()
      .subscribe(data => {
        this.kids = data;
      });

    this.moviesService
      .getDrama()
      .subscribe(data => {
        this.drama = data;
      });
  }
}
