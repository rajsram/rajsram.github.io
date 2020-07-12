import { Component, OnInit } from '@angular/core';
import { EntryService } from '../service/entry.service';
import { EntryModel } from '../model/entry.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  entries: EntryModel[];
  constructor(private entryService: EntryService) {
    this.entries = entryService.getEntries().reverse();
  }

  ngOnInit(): void {
  }

}
