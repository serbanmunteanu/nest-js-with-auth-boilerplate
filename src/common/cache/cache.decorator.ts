import * as CacheManager from 'cache-manager';
import * as redisStore from 'cache-manager-redis';

const memoryCache = CacheManager.caching({
  store: redisStore,
  host: 'localhost',
  port: 6379,
  max: 1000,
  ttl: 300,
});

export function Cache({ key, ttl }: { key: string; ttl: number }) {
  return (
    _target: Record<string, any>,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const cachedValue = await memoryCache.get(key);
      if (cachedValue) {
        return cachedValue;
      }
      const result = await method.apply(this, args);
      memoryCache.set(key, result, ttl);
      return result;
    };
  };
}
