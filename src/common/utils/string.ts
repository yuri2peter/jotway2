import md5 from 'md5';

// 检查字符串是否是以某些字符开头,支持传入除外列表
// 如 startsWith('abc', ['a']) === true
// 但是 startsWith('abc', ['a'], ['ab']) === false
export function startsWith(
  str: string,
  checkList: string[],
  excludeList: string[] = []
) {
  const inList = (list: string[]) => {
    return list.some((item) => {
      return str.startsWith(item);
    });
  };
  return inList(checkList) && !inList(excludeList);
}

// 获取随机字符串，可指定长度
export function getRandomString(length = 8) {
  return md5(Math.random().toString(36)).substring(0, length);
}

// 连字符转驼峰
export function hyphen2Camel(str: string) {
  const re = /-(\w)/g;
  return str.replace(re, ($0, $1) => {
    return $1.toUpperCase();
  });
}

// 首字母改为大写
export function upperCaseFirst(str: string) {
  if (!str) {
    return '';
  }
  return str[0].toUpperCase() + str.slice(1, str.length);
}

// 字节加单位
export function bytesToSize(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024, // or 1024
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
