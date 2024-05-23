import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl: string = environments.baseUrl
  private user?: User

  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined {
    if(!this.user) return undefined
    return structuredClone(this.user)
  }

  login(email: string, password: string):Observable<User> {

    //

    return this.http.get<User[]>(`${this.baseUrl}/users?id=1`).pipe(
      map(user => user[0]),
      tap(user => console.log(user.id)),
      tap( user => this.user = user),
      tap( user => localStorage.setItem('token', JSON.stringify(user.id)) )
    )
  }

  checkAuthentication(): Observable<boolean> {
    if(!localStorage.getItem('token')) return of(false)
    const token = localStorage.getItem('token')
    return this.http.get<User[]>(`${this.baseUrl}/users?id=1`).pipe(
      map(user => user[0]),
      tap( user => this.user = user ),
      map( user => !!user),
      catchError( err => of(false))
    )
  }

  logout() {
    this.user = undefined

    localStorage.clear()
  }

}
