export default function formatFamily(input: number) {
  if (input < 3) {
    return " 1 - 2";
  }
  if (input > 5) {
    return " 6+";
  } else {
    return " 3 - 5";
  }
}
