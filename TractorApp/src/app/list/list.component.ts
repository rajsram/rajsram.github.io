import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EntryModel } from '../model/entry.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { PaymentModel } from '../model/payment-model';
import { MatDialog } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';
import { DataService } from '../services/data.service';
import { PersonModel } from '../model/person.model';

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
  @Output() personEntry: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private dbService: NgxIndexedDBService,
    public dialog: MatDialog,
    private dataService: DataService) {
  }

  ngOnInit(): void {
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

  delete(entry: EntryModel) {
    let index = this.entries.findIndex(e => e.EntryGuid === entry.EntryGuid);
    if (index > -1) {
      if (confirm('Are you sure you want to delete?')) {
        this.dbService.getByIndex('Payment', 'EntryGuid', entry.EntryGuid).then(
          (payments: PaymentModel[]) => {
            payments.forEach(p => {
              this.dbService.delete('Payment', p.PaymentGuid).then(
                () => {

                },
                error => {
                  console.log(error);
                  alert(error);
                });
            })
            this.dbService.delete('Entry', entry.EntryGuid).then(
              () => {

              },
              error => {
                console.log(error);
                alert(error);
              });
          },
          error => {
            console.log(error);
            alert(error);
          }
        );
      }
    }
  }
}
