import { ColumnConfig } from './table-content';

export function updateSortedColumn(columnsConfig: ColumnConfig[], newSortedColumnKey: string, defaultSortAscending = true) {
  return columnsConfig.map(column => column.key == newSortedColumnKey
    ? {
      ...column,
      isSortedAsc: (!column.isSortedAsc && !column.isSortedDesc) ? defaultSortAscending : !!column.isSortedDesc,
      isSortedDesc: (!column.isSortedAsc && !column.isSortedDesc) ? !defaultSortAscending : !!column.isSortedAsc,
    }
    : {
      ...column,
      isSortedAsc: false,
      isSortedDesc: false
    }
  )
}