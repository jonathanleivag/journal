const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export default function getDayMonthYear(dateString) {
  const date = new Date(dateString);
  return {
    day: date.getDay(),
    month: months[date.getMonth()],
    yearDay: `${date.getFullYear()}, ${days[date.getDay()]}`,
  };
}
