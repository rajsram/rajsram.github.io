import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  orderByDate(list: any[]) {
    list = list.sort((a, b) => new Date(a.Date).toISOString().localeCompare(new Date(b.Date).toISOString()));
    return list;
  }

  orderByDateDesc(list: any[]) {
    list = this.orderByDate(list);
    return list.reverse();
  }

  dateFilter(list: any[], fromDate: Date, toDate: Date) {
    fromDate = new Date(fromDate.toLocaleDateString());
    toDate = new Date(toDate.toLocaleDateString());
    list = list.filter(p => new Date(new Date(p.Date).toLocaleDateString()) >= fromDate
      && new Date(new Date(p.Date).toLocaleDateString()) <= toDate);
    return list;
  }
}