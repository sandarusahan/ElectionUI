import { TransactionsService } from './../Services/transactions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-all-transactions',
  templateUrl: './view-all-transactions.component.html',
  styleUrls: ['./view-all-transactions.component.css']
})
export class ViewAllTransactionsComponent implements OnInit {

  txns:any[] = []
  constructor(private txnService:TransactionsService) { }

  ngOnInit() {
    this.txnService.getAllTransactions().subscribe(txns => {
      this.txns = txns;
    })
  }

  get sortData() {
    return this.txns.sort((a, b) => {
      return <any>new Date(b.transactionTimestamp) - <any>new Date(a.transactionTimestamp);
    });
  }

}
