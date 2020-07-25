import { Component, OnInit } from '@angular/core';
import { EntryModel } from '../model/entry.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { PaymentModel } from '../model/payment-model';
import { MatDialog } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  entries: EntryModel[] = [];
  paymentlist: PaymentModel[] = [];
  searchName = '';
  constructor(
    private dbService: NgxIndexedDBService,
    public dialog: MatDialog,
    private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dbService.getAll('Entry').then((entries: EntryModel[]) => {
      this.entries = this.dataService.orderByDateDesc(entries);
      this.loadPayments();
    }, error => {
      console.log(error);
      alert(error.message);
    });
  }

  loadPayments() {
    this.entries.forEach(entry => {
      entry.Paid = 0;
      this.dbService.getAllByIndex('Payment', 'EntryGuid', IDBKeyRange.only(entry.EntryGuid))
        .then((payments: PaymentModel[]) => {
          entry.Payments = payments;
          payments.forEach(payment => {
            entry.Paid += payment.Amount;
          })
        }, error => {
          console.log(error);
          alert(error.message);
        });
    });
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

  settle(entry: EntryModel) {
    if ((entry.Amount - entry.Paid) > 100) {
      if (confirm('Amount is ₹' + entry.Amount + ' and paid ₹' + entry.Paid + ', really settled?')) {
        this.settleEntry(entry);
      }
    } else { this.settleEntry(entry); }
  }

  settleEntry(entry: EntryModel) {
    entry.Settled = true;
    this.dbService.update('Entry', entry).then(
      () => {
        alert('Payment Settled!');
      },
      error => {
        console.log(error);
        alert(error.message);
      }
    );
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
                  alert(error.message);
                });
            })
            this.dbService.delete('Entry', entry.EntryGuid).then(
              () => {

              },
              error => {
                console.log(error);
                alert(error.message);
              });
          },
          error => {
            console.log(error);
            alert(error.message);
          }
        );
      }
    }
  }
}
