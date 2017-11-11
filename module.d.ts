export interface GithubUsers { 
  id : number;
}

export interface DBOptions { 
  host      : string;
  database  : string;
  user?     : string;
  password? : string;
  port?     : number;
}