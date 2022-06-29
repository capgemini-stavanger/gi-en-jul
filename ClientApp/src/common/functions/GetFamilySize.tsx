export default function formatFamily(input: number) {
  if (input < 3) {
    return "< 3";
  }
  if (input > 5) {
    return "> 5";
  } else {
    return "3 - 5";
  }
}
