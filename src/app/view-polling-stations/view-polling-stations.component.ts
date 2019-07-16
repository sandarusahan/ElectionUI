import { RemoveNamespaceService } from './../remove-namespace.service';
import { Division } from './../Model/Division';
import { DivisionService } from './../Services/division.service';
import { PolingStation } from './../Model/PolingStation';
import { PollingStationService } from './../Services/polling-station.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-polling-stations',
  templateUrl: './view-polling-stations.component.html',
  styleUrls: ['./view-polling-stations.component.css']
})
export class ViewPollingStationsComponent implements OnInit {

  pollingStations:PolingStation[] = []
  divisions:Division[]=[]
  constructor(private pollingStationService:PollingStationService, private divisionService:DivisionService, private removeNamespaceService:RemoveNamespaceService) { }

  ngOnInit() {
    this.divisionService.getAllDivisions().subscribe(divsions => {
        this.divisions = divsions
        this.pollingStationService.getAllPollingStations().subscribe(pollS => {
          pollS.forEach(ps => {
            let pollingSt = ps;
            let divId = this.removeNamespaceService.transform(ps.electoralDivision, "resource:org.evotedapp.biznet.Division#")
            let div = divsions.find(x => x.divisionId == divId)
            pollingSt.electoralDivision = div.name
            this.pollingStations.push(pollingSt);
          })
    
        })
    })
    
  }

}
