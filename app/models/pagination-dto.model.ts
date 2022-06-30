export default interface PaginationDto {
  total: number,
  count: number,
  before: number | null,
  after: number | null,
  limit: number,
}
