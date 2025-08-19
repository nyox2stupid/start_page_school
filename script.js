document.addEventListener('DOMContentLoaded', () => {
    // Clock functionality
    const clockElement = document.getElementById('clock');

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}`;
    }

    updateClock();
    setInterval(updateClock, 1000);

    // Schedule functionality
    const scheduleTableBody = document.querySelector('#schedule-table tbody');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = 10;

    function generateSchedule() {
        for (let i = 1; i <= hours; i++) {
            const row = document.createElement('tr');
            
            const hourCell = document.createElement('th');
            hourCell.textContent = `Hour ${i}`;
            row.appendChild(hourCell);

            days.forEach(day => {
                const cell = document.createElement('td');
                cell.setAttribute('contenteditable', 'true');
                const cellId = `cell-${day}-${i}`;
                cell.id = cellId;
                cell.addEventListener('input', () => saveCellContent(cellId, cell.textContent));
                row.appendChild(cell);
            });
            scheduleTableBody.appendChild(row);
        }
    }

    function saveCellContent(id, content) {
        localStorage.setItem(id, content);
    }

    function loadSchedule() {
        for (let i = 1; i <= hours; i++) {
            days.forEach(day => {
                const cellId = `cell-${day}-${i}`;
                const cell = document.getElementById(cellId);
                if (cell) {
                    const savedContent = localStorage.getItem(cellId);
                    if (savedContent) {
                        cell.textContent = savedContent;
                    }
                }
            });
        }
    }

    generateSchedule();
    loadSchedule();
});

