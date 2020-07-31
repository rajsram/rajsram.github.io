import { EntryModel } from './entry.model';
import { ExpenseModel } from './expense.model';
import { PaymentModel } from './payment-model';
import { IncomeModel } from './income.model';
import { PersonModel } from './person.model';

export class TractorDataModel {
    persons: PersonModel[];
    entries: EntryModel[];
    expenses: ExpenseModel[];
    payments: PaymentModel[];
    incomes: IncomeModel[];
}