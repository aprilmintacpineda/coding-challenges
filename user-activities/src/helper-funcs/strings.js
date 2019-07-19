const truncateMemoized = {};

export function truncate (str, len) {
  if (str in truncateMemoized) return truncateMemoized[str];

  if (str.length <= len) truncateMemoized[str] = str;
  else truncateMemoized[str] = `${str.substr(0, len)}...`;

  return truncateMemoized[str];
}

export function randomStr () {
  return Math.random().toString().substr(2);
}

export function trimSpaces (str) {
  return str
    .trim()
    .split(/\s/)
    .filter(part => part)
    .join(' ');
}
