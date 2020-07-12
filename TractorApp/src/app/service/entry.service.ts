import { Injectable } from '@angular/core';
import { EntryModel } from '../model/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor() { }

  getEntries(): EntryModel[] {
    // Get the existing data
    let localData = localStorage.getItem('tractorEntries');
    let entires: EntryModel[] = [];
    if (localData) {
      entires = JSON.parse(localData);
    }
    return entires;
  }

  setEntries(entries: EntryModel[]) {
    // Save back to localStorage
    localStorage.setItem('tractorEntries', JSON.stringify(entries));
  }

}
