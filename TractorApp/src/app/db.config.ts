import { DBConfig } from 'ngx-indexed-db';

// export function migrationFactory() {
//     return {
//         1: (db, transaction) => {
//             const store = transaction.objectStore('people');
//             store.createIndex('country', 'country', { unique: false });
//         },
//         3: (db, transaction) => {
//             const store = transaction.objectStore('people');
//             store.createIndex('age', 'age', { unique: false });
//         }
//     };
// }

export const dbConfig: DBConfig = {
    name: 'TractorAccountsDb',
    version: 1,
    objectStoresMeta: [{
        store: 'Person',
        storeConfig: { keyPath: 'PersonGuid', autoIncrement: false, options: { unique: true } },
        storeSchema: [
            { name: 'Name', keypath: 'Name', options: { unique: true } },
            { name: 'Mobile', keypath: 'Mobile', options: { unique: false } }
        ]
    }, {
        store: 'Entry',
        storeConfig: { keyPath: 'EntryGuid', autoIncrement: false, options: { unique: true } },
        storeSchema: [
            { name: 'PersonGuid', keypath: 'PersonGuid', options: { unique: false } },
            { name: 'Date', keypath: 'Date', options: { unique: false } },
            { name: 'Kalappai', keypath: 'Kalappai', options: { unique: false } },
            { name: 'HrAmount', keypath: 'HrAmount', options: { unique: false } },
            { name: 'Time', keypath: 'Time', options: { unique: false } },
            { name: 'Amount', keypath: 'Amount', options: { unique: false } },
            { name: 'Settled', keypath: 'Settled', options: { unique: false } }
        ]
    }, {
        store: 'Payment',
        storeConfig: { keyPath: 'PaymentGuid', autoIncrement: false, options: { unique: true } },
        storeSchema: [
            { name: 'PersonGuid', keypath: 'PersonGuid', options: { unique: false } },
            { name: 'Date', keypath: 'Date', options: { unique: false } },
            { name: 'Amount', keypath: 'Amount', options: { unique: false } },
            { name: 'New', keypath: 'New', options: { unique: false } }
        ]
    }, {
        store: 'Expense',
        storeConfig: { keyPath: 'ExpenseGuid', autoIncrement: false, options: { unique: true } },
        storeSchema: [
            { name: 'Date', keypath: 'Date', options: { unique: false } },
            { name: 'Particular', keypath: 'Particular', options: { unique: false } },
            { name: 'Amount', keypath: 'Amount', options: { unique: false } },
        ]
    }, {
        store: 'Income',
        storeConfig: { keyPath: 'IncomeGuid', autoIncrement: false, options: { unique: true } },
        storeSchema: [
            { name: 'Date', keypath: 'Date', options: { unique: false } },
            { name: 'Particular', keypath: 'Particular', options: { unique: false } },
            { name: 'Amount', keypath: 'Amount', options: { unique: false } },
        ]
    }],
    // // provide the migration factory to the DBConfig
    // migrationFactory
};