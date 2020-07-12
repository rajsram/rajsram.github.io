import { Injectable } from '@angular/core';
import { EntryModel } from '../model/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  localDataEntries = 'tractorEntries';

  constructor() { }

  getEntries(): EntryModel[] {
    // Get the existing data
    let localData = localStorage.getItem(this.localDataEntries);
    let entires: EntryModel[] = [];
    if (localData) {
      entires = JSON.parse(localData);
    }
    return entires.filter(e => !e.Deleted || e.Deleted == undefined);
  }

  setEntries(entries: EntryModel[]) {
    // Save back to localStorage
    entries = entries.slice().sort((a, b) => {
      return <any>(b.Date) - <any>(a.Date);
    })
    localStorage.setItem(this.localDataEntries, JSON.stringify(entries));
  }

  clearEntries() {
    localStorage.removeItem(this.localDataEntries);
  }

}
