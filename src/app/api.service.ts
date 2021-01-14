import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Employee } from './employee';
import { Init } from './init-employee';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends Init {

  constructor(
    private http: HttpClient
  ) {
    super();
    console.log('EmpService Works');
    this.load();
  }

  getEmps() {
    let emps = JSON.parse(localStorage.getItem('emps'));
    return emps;
  }

  addTodo(newTodo) {
    let emps = JSON.parse(localStorage.getItem('emps'));
    emps.push(newTodo);
    localStorage.setItem('emps', JSON.stringify(emps));
  }

  getTodoByID(id): Observable<any[]> {
    let emps = JSON.parse(localStorage.getItem('emps'));
    return of(emps.filter(x => x.empid == id)
    )
  }


  updateTodo(oldText, newText) {
    let emps = JSON.parse(localStorage.getItem('emps'));

    for (let i = 0; i < emps.length; i++) {
      if (emps[i].text == oldText) {
        emps[i].text = newText;
      }
    }
    localStorage.setItem('emps', JSON.stringify(emps));
  }


  deleteEmployee(id) {
    let emps = JSON.parse(localStorage.getItem('emps'));

    for(let i = 0; i <emps.length; i++) {
     if(emps[i].empid == id) {
         emps.splice(i, 1);
     }
  }
     localStorage.setItem('emps', JSON.stringify(emps));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCases(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${apiUrl}`)
      .pipe(
        tap(cases => console.log('fetched cases')),
        catchError(this.handleError('getCases', []))
      );
  }

  getCasesById(id: string): Observable<Employee> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap(_ => console.log(`fetched Employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployeeById id=${id}`))
    );
  }

  addCases(cases: Employee): Observable<Employee> {
    return this.http.post<Employee>(apiUrl, cases, httpOptions).pipe(
      tap((c: Employee) => console.log(`added product w/ id=${c._id}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  updateCases(id: string, cases: Employee): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, cases, httpOptions).pipe(
      tap(_ => console.log(`updated Employee id=${id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  deleteCases(id: string): Observable<Employee> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Employee>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Employee id=${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }




}
