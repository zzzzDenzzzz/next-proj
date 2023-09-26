import { useState } from "react";

function Calendar() {
  const [date, setDate] = useState("");
  const [calendar, setCalendar] = useState([]);

  const generateCalendar = () => {
    if (date) {
      const [month, year] = date.split("-").map(Number);
      const daysInMonth = new Date(year, month, 0).getDate();
      console.log("дней в месяце:" + daysInMonth);
      let firstDayOfWeek = new Date(year, month - 1, 1).getDay();
      console.log("первый день месяца:" + firstDayOfWeek);
      const calendarData = [];

      if (firstDayOfWeek === 0) {
        firstDayOfWeek = 7;
      }

      console.log("сейчас" + firstDayOfWeek);
      let day = 1;
      for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
          if ((i === 0 && j < firstDayOfWeek - 1) || day > daysInMonth) {
            week.push("");
          } else {
            week.push(day);
            day++;
          }
        }
        calendarData.push(week);
        if (day > daysInMonth) {
          break;
        }
      }

      setCalendar(calendarData);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div>
      <h1>Календарь</h1>
      <div>
        <label htmlFor="date">Дата (ММ-ГГГГ): </label>
        <input type="text" id="date" value={date} onChange={handleDateChange} />
      </div>
      <button onClick={generateCalendar}>Сгенерировать календарь</button>
      {calendar.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Пн</th>
              <th>Вт</th>
              <th>Ср</th>
              <th>Чт</th>
              <th>Пт</th>
              <th>Сб</th>
              <th>Вс</th>
            </tr>
          </thead>
          <tbody>
            {calendar.map((week, index) => (
              <tr key={index}>
                {week.map((day, index) => (
                  <td key={index}>{day}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Calendar;
