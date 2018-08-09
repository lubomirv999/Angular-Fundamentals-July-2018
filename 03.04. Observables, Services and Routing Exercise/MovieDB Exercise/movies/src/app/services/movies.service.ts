import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movies } from '../models/movies';
import { Movie } from '../models/movie';

const apiKey = '8863b65e7c0cd50e87a65bb6de1a6a99';

@Injectable()
export class MoviesService {
    path: string = 'https://api.themoviedb.org/3/';
    popular: string = 'discover/movie?sort_by=popularity.desc';
    theaters: string = 'discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22';
    kids: string = 'discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc';
    drama: string = 'discover/movie?with_genres=18&primary_release_year=2014';
    authentication: string = '&api_key=';
    movie: string = 'movie/';
    movieAuth: string = '?api_key='

    constructor(private http: HttpClient) { }

    getPopular(): Observable<Array<Movie>> {
        return this.http.get<Array<Movie>>(`${this.path}${this.popular}${this.authentication}${apiKey}`);
    }

    getTheaters(): Observable<Array<Movie>> {
        return this.http.get<Array<Movie>>(`${this.path}${this.theaters}${this.authentication}${apiKey}`);
    }

    getKids(): Observable<Array<Movie>> {
        return this.http.get<Array<Movie>>(`${this.path}${this.kids}${this.authentication}${apiKey}`);
    }

    getDrama(): Observable<Array<Movie>> {
        return this.http.get<Array<Movie>>(`${this.path}${this.drama}${this.authentication}${apiKey}`);
    }

    getMovie(id) {
        return this.http.get(`${this.path}${this.movie}${id}${this.movieAuth}${apiKey}`);
    }

    findAMovie(myQuery) {
        return this.http.get(`${this.path}search/movie?query=${myQuery}${this.authentication}${apiKey}`);
    }
}