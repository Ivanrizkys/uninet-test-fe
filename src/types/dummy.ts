export interface Dummy {
  status: string;
  data: Data;
}

export interface Data {
  system_message: string;
  response: Response;
  trace: Trace;
}

export interface Response {
  additionaldata: any[];
  billdetails: Billdetail[];
  bilename: string;
  inqueryid: string;
  paymenttype: string;
  responsecode: string;
  responsemsg: string;
  subscriberid: string;
  subscribername: string;
}

export interface Billdetail {
  adminfee: string;
  billid: string;
  currency: string;
  title: string;
  totalamount: string;
  descriptions: null;
  body: Body;
}

export interface Body {
  DENOM: number;
}

export interface Trace {
  session_id: string;
  request_date_time: string;
  words: string;
  biller_id: string;
  account_number: string;
  systrace: number;
  inquery_id: string;
}
