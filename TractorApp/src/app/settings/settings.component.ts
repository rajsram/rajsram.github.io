import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { TractorDataModel } from '../model/data.model';
import { EntryModel } from '../model/entry.model';
import { PaymentModel } from '../model/payment-model';
import { IncomeModel } from '../model/income.model';
import { ExpenseModel } from '../model/expense.model';
import { PersonModel } from '../model/person.model';
import { DriverModel } from '../model/driver-model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  fileName: string = '';
  importedCount = 0;
  constructor(private dbService: NgxIndexedDBService) { }

  ngOnInit(): void {
  }

  async importData(e) {
    let file: File = e.target.files[0];
    this.fileName = file.name;
    const fileContent = await this.readFileContent(file);
    let data: TractorDataModel = JSON.parse(fileContent);
    let totalCount = data.persons.length + data.entries.length + data.expenses.length
      + data.incomes.length + data.payments.length + data.drive.length;
    this.importedCount = 0;
    if (data.persons.length > 0)
      data.persons.forEach(p => {
        this.dbService.getByID('Person', p.PersonGuid).then(e => {
          if (!e) {
            this.dbService.add('Person', p).then(() => {
              this.checkComplete(totalCount);
            }, error => {
              console.log(error);
              alert(error);
            });
          } else { this.checkComplete(totalCount); }
        }, error => {
          console.log(error);
          alert(error);
        });
      });
    if (data.entries.length > 0)
      data.entries.forEach(ie => {
        this.dbService.getByID('Entry', ie.EntryGuid).then(e => {
          if (!e) {
            this.dbService.add('Entry', ie).then(() => {
              this.checkComplete(totalCount);
            }, error => {
              console.log(error);
              alert(error);
            });
          } else { this.checkComplete(totalCount); }
        }, error => {
          console.log(error);
          alert(error);
        });
      });
    if (data.payments.length > 0)
      data.payments.forEach(pay => {
        this.dbService.getByID('Payment', pay.PaymentGuid).then(e => {
          if (!e) {
            this.dbService.add('Payment', pay).then(() => {
              this.checkComplete(totalCount);
            }, error => {
              console.log(error);
              alert(error);
            });
          } else { this.checkComplete(totalCount); }
        }, error => {
          console.log(error);
          alert(error);
        });
      });
    if (data.incomes.length > 0)
      data.incomes.forEach(inc => {
        this.dbService.getByID('Income', inc.IncomeGuid).then(e => {
          if (!e) {
            this.dbService.add('Income', inc).then(() => {
              this.checkComplete(totalCount);
            }, error => {
              console.log(error);
              alert(error);
            });
          } else { this.checkComplete(totalCount); }
        }, error => {
          console.log(error);
          alert(error);
        });
      });
    if (data.expenses.length > 0)
      data.expenses.forEach(ex => {
        this.dbService.getByID('Expense', ex.ExpenseGuid).then(e => {
          if (!e) {
            this.dbService.add('Expense', ex).then(() => {
              this.checkComplete(totalCount);
            }, error => {
              console.log(error);
              alert(error);
            });
          } else { this.checkComplete(totalCount); }
        }, error => {
          console.log(error);
          alert(error);
        });
      });
    if (data.drive.length > 0)
      data.drive.forEach(dr => {
        this.dbService.getByID('Driver', dr.DriverGuid).then(e => {
          if (!e) {
            this.dbService.add('Driver', dr).then(() => {
              this.checkComplete(totalCount);
            }, error => {
              console.log(error);
              alert(error);
            });
          } else { this.checkComplete(totalCount); }
        }, error => {
          console.log(error);
          alert(error);
        });
      });
  }

  checkComplete(tot: number) {
    this.importedCount++;
    if (tot === this.importedCount) {
      alert('Import Completed!');
      this.fileName = '';
    }
  }

  clearData() {
    if (confirm('Are you sure you want to clear all entries?')) {
      if (confirm('Really!, you want to clear all entries?')) {
        this.exportData(true);
      }
    }
  }

  clearDataAfterBackup() {
    this.dbService.clear('Entry').then(() => {
      this.dbService.clear('Payment').then(() => {
        this.dbService.clear('Income').then(() => {
          this.dbService.clear('Driver').then(() => {
            this.dbService.clear('Expense').then(() => {
              alert('Data cleared.');
            }, error => {
              console.log(error);
              alert(error);
            });
          }, error => {
            console.log(error);
            alert(error);
          });
        }, error => {
          console.log(error);
          alert(error);
        });
      }, error => {
        console.log(error);
        alert(error);
      });
    }, error => {
      console.log(error);
      alert(error);
    });
  }

  exportData(clear = false) {
    let data = new TractorDataModel();
    this.dbService.getAll('Person').then((persons: PersonModel[]) => {
      data.persons = persons;
      this.dbService.getAll('Entry').then((entries: EntryModel[]) => {
        data.entries = entries;
        this.dbService.getAll('Payment').then((payments: PaymentModel[]) => {
          data.payments = payments;
          this.dbService.getAll('Income').then((incomes: IncomeModel[]) => {
            data.incomes = incomes;
            this.dbService.getAll('Driver').then((driver: DriverModel[]) => {
              data.drive = driver;
              this.dbService.getAll('Expense').then((expenses: ExpenseModel[]) => {
                data.expenses = expenses;
                this.exportFile(data);
                if (clear)
                  this.clearDataAfterBackup();
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
    alert('File exported...');
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
