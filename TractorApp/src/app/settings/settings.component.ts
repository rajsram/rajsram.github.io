import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { TractorDataModel } from '../model/data.model';
import { EntryModel } from '../model/entry.model';
import { PaymentModel } from '../model/payment-model';
import { IncomeModel } from '../model/income.model';
import { ExpenseModel } from '../model/expense.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  fileName: string = '';
  constructor(private dbService: NgxIndexedDBService) { }

  ngOnInit(): void {
  }

  async importData(e) {
    let file: File = e.target.files[0];
    this.fileName = file.name;
    const fileContent = await this.readFileContent(file);
    let data: TractorDataModel = JSON.parse(fileContent);
    data.entries.forEach(ie => {
      this.dbService.add('Entry', ie).then(() => {
      }, error => {
        console.log(error);
        alert(error.message);
      });
    });
    data.payments.forEach(pay => {
      this.dbService.add('Payment', pay).then(() => {
      }, error => {
        console.log(error);
        alert(error.message);
      });
    });
    data.incomes.forEach(inc => {
      this.dbService.add('Income', inc).then(() => {
      }, error => {
        console.log(error);
        alert(error.message);
      });
    });
    data.expenses.forEach(ex => {
      this.dbService.add('Expense', ex).then(() => {
      }, error => {
        console.log(error);
        alert(error.message);
      });
    });
  }

  clearData() {
    if (confirm('Are you sure you want to clear all entries?')) {
      if (confirm('Really!, you want to clear all entries?')) {
        this.exportData();
        this.dbService.clear('Entry').then(() => {
          this.dbService.clear('Payment').then(() => {
            this.dbService.clear('Income').then(() => {
              this.dbService.clear('Expense').then(() => {
                alert('Data cleared.');
              }, error => {
                console.log(error);
                alert(error.message);
              });
            }, error => {
              console.log(error);
              alert(error.message);
            });
          }, error => {
            console.log(error);
            alert(error.message);
          });
        }, error => {
          console.log(error);
          alert(error.message);
        });
      }
    }
  }

  exportData() {
    let data = new TractorDataModel();
    this.dbService.getAll('Entry').then((entries: EntryModel[]) => {
      data.entries = entries;
      this.dbService.getAll('Payment').then((payments: PaymentModel[]) => {
        data.payments = payments;
        this.dbService.getAll('Income').then((incomes: IncomeModel[]) => {
          data.incomes = incomes;
          this.dbService.getAll('Expense').then((expenses: ExpenseModel[]) => {
            data.expenses = expenses;
            this.exportFile(data);
          }, error => {
            console.log(error);
          });
        }, error => {
          console.log(error);
        });
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  exportFile(data: TractorDataModel) {
    var sJson = JSON.stringify(data);
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=UTF-8,' + encodeURIComponent(sJson));
    element.setAttribute('download', 'Tractor Data_' + (new Date().toLocaleString()) + '.json');
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
