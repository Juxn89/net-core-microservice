export interface Pagination<T> {
  pageSize: number,
  page: number,
  sort: string,
  sortDirecction: number,
  pageQuantity: number,
  data: T[],
  filterValue: {},
  totalRecords: number
}
