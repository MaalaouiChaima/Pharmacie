import { Component, OnInit } from '@angular/core';
import { LaboratoireService } from './sharedL/laboratoire.service';

@Component({
  selector: 'app-laboratoires',
  templateUrl: './laboratoires.component.html',
  styleUrls: ['./laboratoires.component.css']
})
export class LaboratoiresComponent implements OnInit {

  constructor(private laboratoireService : LaboratoireService) { }

  ngOnInit() {
  }

}
