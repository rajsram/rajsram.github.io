import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EntryModel } from '../model/entry.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { PaymentModel } from '../model/payment-model';
import { MatDialog } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';
import { DataService } from '../services/data.service';
import { PersonModel } from '../model/person.model';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  persons: PersonModel[] = [];
  entries: EntryModel[] = [];
  paymentlist: PaymentModel[] = [];
  searchName = '';
  isAll: false;
  editPersonGuid = '';
  @Output() personEntry: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private dbService: NgxIndexedDBService,
    public dialog: MatDialog,
    private dataService: DataService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dbService.getAll('Person').then((persons: PersonModel[]) => {
      this.persons = persons;
      this.loadEntries();
      this.loadPayments();
    }, error => {
      console.log(error);
      alert(error);
    });
  }

  loadEntries() {
    this.persons.forEach((person: PersonModel) => {
      person.Amount = 0;
      this.dbService.getAllByIndex('Entry', 'PersonGuid', IDBKeyRange.only(person.PersonGuid))
        .then((entries: EntryModel[]) => {
          person.Entries = entries;
          if (entries.findIndex(se => !se.Settled) < 0)
            person.Settled = true;
          entries.forEach(e => {
            if (!e.Settled)
              person.Amount += e.Amount;
          })
        }, error => {
          console.log(error);
          alert(error);
        });
    });
  }

  loadPayments() {
    this.persons.forEach((person: PersonModel) => {
      person.Paid = 0;
      this.dbService.getAllByIndex('Payment', 'PersonGuid', IDBKeyRange.only(person.PersonGuid))
        .then((payments: PaymentModel[]) => {
          person.Payments = payments;
          payments.forEach(payment => {
            if (payment.New)
              person.Paid += payment.Amount;
          })
        }, error => {
          console.log(error);
          alert(error);
        });
    });
  }

  addEntry(person: PersonModel) {
    this.personEntry.emit(person.PersonGuid);
  }

  addPayment(entry) {
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: '250px',
      data: entry
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      entry = entry;
    });
  }

  settle(person: PersonModel) {
    if ((person.Amount - person.Paid) > 100) {
      if (confirm('Amount is ₹' + person.Amount + ' and paid ₹' + person.Paid + ', really settled?')) {
        this.settleEntry(person);
      }
    } else { this.settleEntry(person); }
  }

  settleEntry(person: PersonModel) {
    let tot = person.Entries.length + person.Payments.length;
    let com = 0;
    person.Entries.forEach(e => {
      e.Settled = true;
      this.dbService.update('Entry', e).then(
        () => {
          com++;
          if (tot === com) {
            person.Settled = true;
            alert('Payment Settled!');
          }
        },
        error => {
          console.log(error);
          alert(error);
        });
    });
    person.Payments.forEach(p => {
      p.New = false;
      this.dbService.update('Payment', p).then(
        () => {
          com++;
          if (tot === com) {
            person.Settled = true;
            alert('Payment Settled!');
          }
        },
        error => {
          console.log(error);
          alert(error);
        });
    });

  }

  updatePerson(person: PersonModel) {
    this.dbService.update('Person', person).then(() => {
      alert('Updated succesfully.');
      this.editPersonGuid = '';
    },
      error => {
        console.log(error);
        alert(error);
      })
  }
  personEditCancel(person: PersonModel, guid = '') {
    this.dbService.getByID('Person', person.PersonGuid).then(
      (_person: PersonModel) => {
        person.Name = _person.Name;
        person.Mobile = _person.Mobile;
        this.editPersonGuid = guid;
      }, error => {
        alert(error);
      });
  }

  cancelPersonEdit(newEditPersonGuid) {
    let person = this.persons.find(p => p.PersonGuid == this.editPersonGuid);
    this.personEditCancel(person, newEditPersonGuid);
  }

  delete(person: PersonModel) {
    if (confirm('Are you sure you want to delete?')) {
      let counts = person.Entries.length + person.Payments.length;
      let comp = 0
      person.Entries.forEach(async e => {
        await this.deleteEntry(e, true);
        comp++;
        this.checkComp(counts, comp);
      });
      person.Payments.forEach(async p => {
        await this.deletePayment(p, true);
        comp++;
        this.checkComp(counts, comp);
      });
    }
  }

  checkComp(tot: number, comp: number) {
    if (tot === comp) {
      alert('Deleted successfully.');
      this.loadData();
    }
  }

  async deleteEntry(entry: EntryModel, mul = false) {
    if (!mul) {
      if (!confirm('Are you sure you want to delete Entry?')) {
        return;
      }
    }
    await this.dbService.delete('Entry', entry.EntryGuid).then(
      () => {
        if (mul)
          return 1;
        else {
          alert('Entry Deleted.');
          this.loadData();
        }

      },
      error => {
        console.log(error);
        alert(error);
      });
  }

  async deletePayment(p: PaymentModel, mul = false) {
    if (!mul) {
      if (!confirm('Are you sure you want to delete Payment?')) {
        return;
      }
    }
    await this.dbService.delete('Payment', p.PaymentGuid).then(
      () => {
        if (mul)
          return 1;
        else {
          alert('Payment Deleted.');
          this.loadData();
        }
      },
      error => {
        console.log(error);
        alert(error);
      });
  }
}
