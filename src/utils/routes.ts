const ad = "ad/";
const category = "category/";
const user = "user/";
const auth = "auth/";
const estimate = "estimate/";

// export const api = "https://srv549330.hstgr.cloud/api/";
export const api = "https://srv654666.hstgr.cloud/api/v1/";

// export const api = "http://192.168.1.15:3001/api/v1/";
// export const api = "http://localhost:3001/api/v1/";
// export const uri = "http://localhost:3001";
export const currentUrl = "http://localhost:3000";

export const imageApi = `${api}file/`;

export const gmailImageUrl = "https://lh3.googleusercontent.com";

export class ConstantApi {
  static category = `${category}all/`;
  static upload = ``;

  static constant = `${api}location/constant/`;
}

export class EstimateApi {
  static create = `${estimate}`;
  static update = `${estimate}update/`;
  static price = `${estimate}price/`;
}

export class AuthApi {
  static register = `${auth}register`;
  static login = `login`;
}

export class PaymentApi {
  static user = `${api}payment/user`;
  static transaction = `${api}payment/transaction`;
}

export class UserApi {
  static user = `${user}`;
  static get = `${user}get/`;
  static me = `${user}me`;
  static sendFeedback = `${user}feedback`;
  static bookmark = `${user}bookmark/`;
  static point = `${user}point/`;
  static update = `${user}update/`;
  static feedback = `${this.user}feedback/`;
  static feedbackGet = `${this.feedback}get/`;
}

export class AdApi {
  static view = `${ad}get/`;
  static search = `${ad}search/{value}?value=`;
  static create = `${ad}`;
  static many = `${ad}many/`;
  static filter = `${ad}filter/`;
  static category = `${ad}category/`;
  static id = `${ad}id/`;
  static admin = `${ad}admin/`;
  static suggestion = `${ad}suggestion/`;
  static update = `${ad}update/`;
  static my = `${ad}my/`;
}
export class CategoryApi {
  static filter = `${category}filters/`;
}
