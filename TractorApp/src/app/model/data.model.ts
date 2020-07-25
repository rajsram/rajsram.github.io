import { EntryModel } from './entry.model';
import { ExpenseModel } from './expense.model';
import { PaymentModel } from './payment-model';
import { IncomeModel } from './income.model';

export class TractorDataModel {
    entries: EntryModel[];
    expenses: ExpenseModel[];
    payments: PaymentModel[];
    incomes: IncomeModel[];
}