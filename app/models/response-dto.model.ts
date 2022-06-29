import type PaginationDto from "~/models/pagination-dto.model"

export default interface ResponseDto<T> {
  status: 'error' | 'success',
  message: string, 
  data: T, 
  metaData?: {
    pagination: PaginationDto,
  }
}
