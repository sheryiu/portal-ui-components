import { get } from 'lodash-es';
import { ColumnConfig } from './table-content';

export function computeSortFunction<T>(
  columnsConfig: ColumnConfig[]
): ((a: T, b: T) => number) {
  const sortedBy = columnsConfig.find(config => config.isSortedAsc || config.isSortedDesc);
  if (!sortedBy) return () => 0;
  const isDesc = sortedBy.isSortedDesc ? -1 : 1;
  if (sortedBy.fieldConfiguration?.type == 'date-time') {
    return (a, b) => {
      const aDate = valueOf(a, sortedBy);
      const bDate = valueOf(b, sortedBy);
      if (aDate == null && bDate == null) return 0;
      if (aDate instanceof Date && bDate instanceof Date) return (aDate.getTime() - bDate.getTime()) * isDesc;
      if (aDate instanceof Date) return 1 * isDesc;
      return -1 * isDesc;
    }
  }
  return (a, b) => {
    switch (sortedBy.key) {
      default: return (valueOf(a, sortedBy) > valueOf(b, sortedBy))
        ? (isDesc)
        : (valueOf(a, sortedBy) < valueOf(b, sortedBy))
        ? (-1 * isDesc)
        : 0;
    }
  }
}

function valueOf<T>(value: T, sortedBy: ColumnConfig) {
  if (sortedBy.path) return get(value, sortedBy.path)
  return (value as any)[sortedBy.key]
}