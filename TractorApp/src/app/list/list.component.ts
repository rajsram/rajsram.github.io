import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { EntryModel } from '../model/entry.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  entries: EntryModel[] = [];
  constructor(private storageService: StorageService,
    private dbService: NgxIndexedDBService) {
    this.dbService.getAll('Entry').then((entries: EntryModel[]) => {
      this.entries = entries;
    }, error => {
      console.log(error);
    });
    // this.entries = storageService?.Entries;
  }

  ngOnInit(): void {
  }
  delete(entry) {
    let index = this.entries.findIndex(e => e.EntryGuid === entry.EntryGuid);
    if (index > -1) {
      if (confirm('Are you sure you want to delete?')) {
        this.entries.splice(index, 1);
        this.storageService.Entries = this.entries;
      }
    }
  }

  async importEntries(e) {
    let file = e.target.files[0];
    const fileContent = await this.readFileContent(file);
    let inEntries: EntryModel[] = JSON.parse(fileContent);
    inEntries.forEach(ie => {
      if (this.entries.findIndex(e => e.EntryGuid === ie.EntryGuid) < 0) {
        this.entries.push(ie);
      }
    });
    this.storageService.Entries = this.entries;
  }

  clearEntries() {
    if (confirm('Are you sure you want to clear all entries?')) {
      if (confirm('Really!, you want to clear all entries?')) {
        this.downloadJson();
        this.storageService.clearLocalStorage();
        this.entries = [];
      }
    }
  }

  downloadJson() {
    var sJson = JSON.stringify(this.storageService.localAccountsData);
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
