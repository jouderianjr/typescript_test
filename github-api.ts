import { GithubUser } from './module';
import * as request from 'request-promise';

const fetchUser = (username : String) : PromiseLike<GithubUser> =>
  request({
    uri: `https://api.github.com/users/${username}`,
    headers: { 'User-Agent': 'Request-Promise' },
    json: true
  });

export default {
  fetchUser
}