import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopComponent } from './pop/pop.component';
import { PopulationModel } from './models/population';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'SZPK_PopulationCensus';
  Population: PopulationModel[] = [];
  new: PopulationModel | undefined = undefined;
  modify: PopulationModel | undefined = undefined;

  constructor(private dataService: DataService) {}
  

  newPop(){
    this.new = {
      id : undefined,
      population: 0,
      culture: "",
      profession: "",
      religion: ""
    }
  }

  doDelete(pop: PopulationModel){
    this.dataService.deletePopulationGroup(pop.id!).subscribe({
      next: (response) => {
        this.Population = this.Population.filter(r => r.id !== response.id);
      },
      error: (error) => console.log(error)
      })
  }

  saveModify(pop: PopulationModel){
    this.dataService.modifyPopulationGroup(pop).subscribe({
      next: (response) => {
        const index = this.Population.findIndex(r => r.id === response.id) ;
        this.Population[index] = response;
        this.modify = undefined;
      },
      error: (error) => console.log(error)
      })
}

  doModify(pop: PopulationModel){
    this.modify = JSON.parse(JSON.stringify(pop));
    console.log(this.modify);
  }

  
  saveNew(pop: PopulationModel){
    this.dataService.addPopulationGroup(pop).subscribe({
      next: (response) => {
        this.Population.push(response);
        this.new = undefined;
      },
      error: (error) => console.log(error)
      })
  }

  ngOnInit(): void {
    this.dataService.getPopulation().subscribe(
      {
        next: response => this.Population = response,
        error: error  => console.log(error)
      }
    )
  }
}
