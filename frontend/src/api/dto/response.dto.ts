export class ResponseDto<T> {
  resultCode = 0;

  resultMsg = '';

  data?: T;

  totalCount = 0;

  constructor(data?: any) {
    if (data.resultCode) this.resultCode = data.resultCode;
    if (data.resultMsg) this.resultMsg = data.resultMsg;
    if (data.data) this.data = data.data;
    if (data.totalCount) this.totalCount = data.totalCount;
  }
}
