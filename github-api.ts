import { GithubUsers } from './module';
import * as request from 'request-promise';

const fetchUser = (username : String) : PromiseLike<GithubUsers> =>
  request({
    uri: `https://api.github.com/users/${username}`,
    headers: { 'User-Agent': 'Request-Promise' },
    json: true
  });

export default {
  fetchUser
}