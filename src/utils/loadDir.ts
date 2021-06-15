const load = (path: string, name: string) => (name ? require(path + name).default : require(path).default)

/**
 * 动态加载目录模块
 */
export default (dir: string) => new Proxy({}, { get: (obj, prop: string) => load(dir, prop) })
