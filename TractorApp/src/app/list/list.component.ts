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
    this.entries = entryService.getEntries();
  }

  ngOnInit(): void {
  }
  delete(entry) {
    let index = this.entries.findIndex(e => e.Guid === entry.Guid);
    if (index > -1) {
      if (confirm('Are you sure you want to delete?')) {
        this.entries[index].Deleted = true;
        this.entryService.setEntries(this.entries);
        this.entries = this.entryService.getEntries();
      }
    }
  }

  async importEntries(e) {
    let file = e.target.files[0];
    const fileContent = await this.readFileContent(file);
    let inEntries: EntryModel[] = JSON.parse(fileContent);
    inEntries.forEach(ie => {
      if (this.entries.findIndex(e => e.Guid === ie.Guid) < 0) {
        this.entries.push(ie);
      }
    });
    this.entryService.setEntries(this.entries);
    this.entries = this.entryService.getEntries();
  }

  clearEntries() {
    if (confirm('Are you sure you want to clear all entries?')) {
      if (confirm('Really!, you want to clear all entries?')) {
        this.entryService.clearEntries();
        this.entries = [];
      }
    }
  }

  downloadJson() {
    var sJson = JSON.stringify(this.entries);
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=UTF-8,' + encodeURIComponent(sJson));
    element.setAttribute('download', 'Tractor Entry_' + (new Date().toLocaleString()) + '.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }

  readFileContent(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!file) {
        resolve('');
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = reader.result.toString();
        resolve(text);
      };
      reader.readAsText(file);
    });
  }
}
