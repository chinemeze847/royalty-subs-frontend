export default interface ResponseDto<T> {
  status: 'error' | 'success',
  message: string, 
  data: T, 
  metaData?: any
}
