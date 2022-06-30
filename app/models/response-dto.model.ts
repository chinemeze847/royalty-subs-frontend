import type PaginationDto from "~/models/pagination-dto.model"

export default interface ResponseDto<T> {
  statusCode: number;
  status: 'error' | 'success',
  message: string, 
  data: T, 
  metaData?: {
    pagination: PaginationDto,
  }
}
