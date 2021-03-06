import * as Table from 'cli-table2';

export abstract class BaseTableBuilder<TJson, T extends IRowable> {
  public buildTable(data: TJson[], TClass: { new (d: any): T }) {
    const table = this.buildTableHeader();
    const rows = data.map(d => new TClass(d).toRow());
    table.push(...rows);
    return table;
  }

  public abstract buildTableHeader(): Table.GenericTable<Table.Cell[]>;
}

export interface IRowable {
  toRow(): Table.Cell[];
}
