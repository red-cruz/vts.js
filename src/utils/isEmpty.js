export default function isEmpty(obj) {
  for (const x in obj) {
    return false;
  }
  return true;
}
