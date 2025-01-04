import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PopulationModel } from './models/population';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:3000/populationGroups';

  constructor(private http: HttpClient) { }

  getPopulation(): Observable<PopulationModel[]>{
    return this.http.get<PopulationModel[]>(this.url);
  }
  addPopulationGroup(pop: PopulationModel):Observable<PopulationModel>{
    return this.http.post<PopulationModel>(this.url, pop);
  }

  modifyPopulationGroup(pop: PopulationModel):Observable<PopulationModel>{
    return this.http.put<PopulationModel>(`${this.url}/${pop.id}`, pop);
  }
  deletePopulationGroup(id: string):Observable<PopulationModel>{
    return this.http.delete<PopulationModel>(`${this.url}/${id}`);
  }
}
