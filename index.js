const assamHolidays = {
  '2026-01-14': 'Magh Bihu',
  '2026-01-15': 'Tusu Puja',
  '2026-01-23': 'Netaji Jay.',
  '2026-01-26': 'Rep Day',
  '2026-01-27': 'Bathou San',
  '2026-01-31': 'Me-Dam-Phi',
  '2026-02-01': 'Bir Chilaray',
  '2026-03-03': 'Dol Jatra',
  '2026-03-21': 'Id-Ul-Fitre',
  '2026-04-03': 'Good Fri',
  '2026-04-14': 'Bohag Bihu',
  '2026-04-15': 'Bohag Bihu',
  '2026-04-16': 'Bohag Bihu',
  '2026-04-18': 'Tithi Dam.',
  '2026-04-21': 'Sati Sad.',
  '2026-05-01': 'Buddha Purn.',
  '2026-05-01': 'May Day',
  '2026-05-27': 'Id-Uz-Zuha',
  '2026-06-01': 'Madhav Dev Tithi',
  '2026-08-15': 'Indep Day',
  '2026-09-01': 'Tirobhab T.',
  '2026-09-04': 'Janmastomi',
  '2026-09-12': 'T.T.Shankardeva',
  '2026-09-21': 'J.Shankardeva',
  '2026-09-22': 'Karam Puja',
  '2026-10-02': 'Gandhi',
  '2026-10-18': 'Maha Saptami',
  '2026-10-18': 'Kati Bihu',
  '2026-10-19': 'Maha Ashtami',
  '2026-10-20': 'Vijaya Dashami',
  '2026-10-20': 'Maha Navami',
  '2026-10-21': 'Dashami',
  '2026-10-25': 'Lakshmi Puja',
  '2026-11-08': 'Diwali',
  '2026-11-08': 'Kali Puja',
  '2026-11-11': 'Bhatri Dwit.',
  '2026-11-15': 'Chhat Puja',
  '2026-11-24': 'Guru Nanak J.',
  '2026-11-24': 'Lachit Divas',
  '2026-12-02': 'Asom Divas',
  '2026-12-25': 'Christmas'
};

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const calendarDays = document.getElementById('days');
const monthYearLabel = document.getElementById('monthYear');
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');

let today = new Date();
let currentYear = 2026;
let currentMonth = today.getFullYear() === 2026 ? today.getMonth() : 0;

function renderCalendar(year, month) {
  calendarDays.innerHTML = '';
  monthYearLabel.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.classList.add('day', 'empty');
    calendarDays.appendChild(emptyDiv);
  }

  for (let date = 1; date <= daysInMonth; date++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');

    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;

    // Highlight today
    if (year === today.getFullYear() && month === today.getMonth() && date === today.getDate()) {
      dayDiv.classList.add('today');
    }

    // Mark Sundays
    const weekDay = new Date(year, month, date).getDay();
    if (weekDay === 0) {
      dayDiv.classList.add('holiday');
    }

    // Mark 2nd and 4th Saturdays and add "2s" or "4s"
    if (weekDay === 6) {
      const saturdayNum = Math.floor((date - 1) / 7) + 1;
      if (saturdayNum === 2 || saturdayNum === 4) {
        dayDiv.classList.add('holiday');
        const satLabel = document.createElement('div');
        satLabel.classList.add('sat-label');
        satLabel.textContent = saturdayNum === 2 ? '2s' : '4s';
        dayDiv.appendChild(satLabel);
      }
    }

    // Mark Assam public holidays and add holiday name
    if (assamHolidays[dateStr]) {
      dayDiv.classList.add('holiday');
      const nameSpan = document.createElement('div');
      nameSpan.classList.add('name');
      nameSpan.textContent = assamHolidays[dateStr];
      dayDiv.appendChild(nameSpan);
    }

    // Add date number
    const dateSpan = document.createElement('div');
    dateSpan.classList.add('date');
    dateSpan.textContent = date;
    // Insert the dateSpan at the top so it is above any labels added
    dayDiv.insertBefore(dateSpan, dayDiv.firstChild);

    calendarDays.appendChild(dayDiv);
  }
}

prevBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentYear, currentMonth);
});

nextBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentYear, currentMonth);
});

document.addEventListener('DOMContentLoaded', () => {
  renderCalendar(currentYear, currentMonth);
});
