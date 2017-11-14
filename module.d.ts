export interface GithubUser {
  id : number;
  location? : String;
  login? : String;
  name? : String;
  company? : String;

}

export interface DBOptions { 
  host      : string;
  database  : string;
  user?     : string;
  password? : string;
  port?     : number;
}