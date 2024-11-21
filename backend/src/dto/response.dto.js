export class ResponseDto {
  constructor(data = {}) {
    this.resultCode = data.resultCode || 0;
    this.resultMsg = data.resultMsg || '';
    this.data = data.data || null;
    this.totalCount = data.totalCount || 0;
  }
}
