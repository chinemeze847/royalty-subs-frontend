export default function useDateFormat() {
  return (value: string) => new Date(value).toUTCString();
}
