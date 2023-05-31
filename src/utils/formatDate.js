export default function formatDate(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrpm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  const dateString = date.toDateString();

  const formatted = `${hours}:${minutes} ${amOrpm}, ${dateString}`;
  return formatted;
}
