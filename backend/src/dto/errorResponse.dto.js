export class ErrorResponseDto {
  constructor(error) {
    this.resultCode = error.resultCode || 1;
    this.resultMsg = error.resultMsg || error.message || 'Unknown Error';
    this.data = null;
    this.totalCount = 0;
  }
}
