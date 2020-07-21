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
        store: 'Entry',
        storeConfig: { keyPath: 'EntryGuid', autoIncrement: false, options: { unique: true } },
        storeSchema: [
            { name: 'Name', keypath: 'Name', options: { unique: false } },
            { name: 'Date', keypath: 'Date', options: { unique: false } },
            { name: 'Mobile', keypath: 'Mobile', options: { unique: false } },
            { name: 'Kalappai', keypath: 'Kalappai', options: { unique: false } },
            { name: 'KalappaiAmount', keypath: 'KalappaiAmount', options: { unique: false } },
            { name: 'FromTime', keypath: 'FromTime', options: { unique: false } },
            { name: 'ToTime', keypath: 'ToTime', options: { unique: false } },
            { name: 'Hours', keypath: 'Hours', options: { unique: false } },
            { name: 'Minutes', keypath: 'Minutes', options: { unique: false } },
            { name: 'Amount', keypath: 'Amount', options: { unique: false } },
            { name: 'Settled', keypath: 'Settled', options: { unique: false } }
        ]
    }, {
        store: 'Payment',
        storeConfig: { keyPath: 'PaymentGuid', autoIncrement: false, options: { unique: true } },
        storeSchema: [
            { name: 'EntryGuid', keypath: 'EntryGuid', options: { unique: false } },
            { name: 'Date', keypath: 'Date', options: { unique: false } },
            { name: 'Amount', keypath: 'Amount', options: { unique: false } },
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