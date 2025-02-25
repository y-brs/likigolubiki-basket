export function getDeclension(num, singular, few, many) {
  if (num % 10 === 1 && num % 100 !== 11) {
    return singular;
  } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
    return few;
  } else {
    return many;
  }
}
