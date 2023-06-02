export default function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if(minutes<10){
    minutes = '0'+minutes;
  }
  const amOrpm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  const dateString = date.toDateString();

  const formatted = `${hours}:${minutes} ${amOrpm}, ${dateString}`;
  return formatted;
}
