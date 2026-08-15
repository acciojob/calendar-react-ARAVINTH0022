import React, { useState } from "react";
import '../styles/App.css';

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const App = () => {
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState(year.toString());

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDay = new Date(year, monthIndex, 1).getDay();

  const handlePrevMonth = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear((y) => {
        const ny = y - 1;
        setYearInput(ny.toString());
        return ny;
      });
    } else {
      setMonthIndex((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear((y) => {
        const ny = y + 1;
        setYearInput(ny.toString());
        return ny;
      });
    } else {
      setMonthIndex((m) => m + 1);
    }
  };

  const handlePrevYear = () => {
    setYear((y) => {
      const ny = y - 1;
      setYearInput(ny.toString());
      return ny;
    });
  };

  const handleNextYear = () => {
    setYear((y) => {
      const ny = y + 1;
      setYearInput(ny.toString());
      return ny;
    });
  };

  const handleMonthChange = (e) => {
    const val = e.target.value;
    const selected = MONTHS.indexOf(val);
    if (selected !== -1) {
      setMonthIndex(selected);
    } else if (!isNaN(val)) {
      setMonthIndex(parseInt(val, 10));
    }
  };

  const handleYearSubmit = () => {
    const parsed = parseInt(yearInput, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setYear(parsed);
    } else {
      setYearInput(year.toString());
    }
    setIsEditingYear(false);
  };

  const rows = [];
  let currentDay = 1;

  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        row.push("");
      } else if (currentDay > daysInMonth) {
        row.push("");
      } else {
        row.push(currentDay);
        currentDay++;
      }
    }
    rows.push(row);
    if (currentDay > daysInMonth) break;
  }

  return (
    <div id="main">
      <h1 id="heading" className="header">Calendar</h1>

      <div className="controls" style={{ marginBottom: "15px" }}>
        <select
          id="month"
          className="month-select"
          value={MONTHS[monthIndex]}
          onChange={handleMonthChange}
        >
          {MONTHS.map((m, idx) => (
            <option key={idx} value={m}>
              {m}
            </option>
          ))}
        </select>

        {isEditingYear ? (
          <input
            id="year-text-box"
            type="number"
            value={yearInput}
            onChange={(e) => setYearInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleYearSubmit();
            }}
            onBlur={handleYearSubmit}
            autoFocus
            style={{ marginLeft: "10px" }}
          />
        ) : (
          <span
            id="year"
            className="year-val"
            onDoubleClick={() => {
              setYearInput(year.toString());
              setIsEditingYear(true);
            }}
            style={{ cursor: "pointer", marginLeft: "10px", marginRight: "10px", fontWeight: "bold" }}
          >
            {year}
          </span>
        )}
      </div>

      <div className="nav-buttons" style={{ marginBottom: "15px" }}>
        <button id="prev-year" onClick={handlePrevYear} style={{ marginRight: "5px" }}>
          &lt;&lt;
        </button>
        <button id="prev-month" onClick={handlePrevMonth} style={{ marginRight: "10px" }}>
          &lt;
        </button>
        <button id="next-month" onClick={handleNextMonth} style={{ marginRight: "5px" }}>
          &gt;
        </button>
        <button id="next-year" onClick={handleNextYear}>
          &gt;&gt;
        </button>
      </div>

      <table id="calendar-table" border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => (
                <td key={cIdx}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
