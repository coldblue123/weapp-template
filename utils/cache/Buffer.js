import ExpireCache from './ExpireCache';

export default class Buffer extends ExpireCache {
  static cacheMap = new Map();
}
