const rows = ['A', 'B', 'C', 'D'];
const seats = [14, 12, 12, 14]; // Seat counts per row
let seatingPlan = [];

// Initialize seating plan
function initSeatingPlan() {
    rows.forEach((row, rowIndex) => {
        let rowSeats = [];
        for (let i = 1; i <= seats[rowIndex]; i++) {
            rowSeats.push(0); // 0 means available
            createSeatElement(row, i);
        }
        seatingPlan.push(rowSeats);
    });
}

// Create seat elements in the DOM
function createSeatElement(row, number) {
    const seat = document.createElement('div');
    seat.className = 'seat';
    seat.id = `${row}${number}`;
    seat.setAttribute('data-info', `Seat ${row}${number}: Available`);
    seat.onclick = () => selectSeat(row, number);
    document.getElementById('plane-seats').appendChild(seat);
}

// Select or Deselect a Seat
function selectSeat(row, number) {
    const seat = document.getElementById(`${row}${number}`);
    const rowIndex = rows.indexOf(row);
    if (seatingPlan[rowIndex][number - 1] === 0) { // If available
        if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
            seat.setAttribute('data-info', `Seat ${row}${number}: Available`);
        } else {
            seat.classList.add('selected');
            seat.setAttribute('data-info', `Seat ${row}${number}: Selected`);
        }
    } else {
        alert(`Seat ${row}${number} is already sold.`);
    }
}

// Show modal to confirm and process payment
function buySelectedSeats() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    if (selectedSeats.length === 0) {
        alert('No seats selected.');
        return;
    }

    // Display the payment modal
    document.getElementById('paymentModal').style.display = 'block';
}

// Process the payment and mark seats as sold
function processPayment(event) {
    event.preventDefault();
    const cardNumber = document.getElementById('cardNumber').value;
    const cardName = document.getElementById('cardName').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    // Simple validation for demonstration (in real-world, use more robust validation)
    if (cardNumber.length !== 16 || !cardName || !expiryDate || cvv.length !== 3) {
        alert('Please enter valid payment details.');
        return;
    }

    // Assuming payment is successful
    const selectedSeats = document.querySelectorAll('.seat.selected');
    selectedSeats.forEach(seat => {
        const row = seat.id.charAt(0);
        const number = parseInt(seat.id.slice(1));
        buySeat(row, number);
    });

    closeModal();
    alert('Payment successful! Seats have been purchased.');
}

// Close payment modal
function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
    document.getElementById('paymentForm').reset();
}

// Buy a seat
function buySeat(row, number) {
    const rowIndex = rows.indexOf(row);
    if (seatingPlan[rowIndex][number - 1] === 0) {
        seatingPlan[rowIndex][number - 1] = 1; // Mark as sold
        const seat = document.getElementById(`${row}${number}`);
        seat.classList.remove('selected');
        seat.classList.add('sold');
        seat.setAttribute('data-info', `Seat ${row}${number}: Sold`);
    }
}

// Find first available seat
function findFirstAvailable() {
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        for (let seatIndex = 0; seatIndex < seatingPlan[rowIndex].length; seatIndex++) {
            if (seatingPlan[rowIndex][seatIndex] === 0) {
                alert(`First available seat is ${rows[rowIndex]}${seatIndex + 1}`);
                return;
            }
        }
    }
    alert("No available seats found.");
}

// Show seating plan
function showSeatingPlan() {
    let plan = "Seating Plan:\n";
    rows.forEach((row, rowIndex) => {
        plan += row + ": ";
        seatingPlan[rowIndex].forEach((seat, seatIndex) => {
            plan += (seat === 0 ? "O" : "X") + " ";
        });
        plan += "\n";
    });
    alert(plan);
}

// Print ticket information
function printTicketsInfo() {
    let tickets = "Purchased Tickets:\n";
    rows.forEach((row, rowIndex) => {
        seatingPlan[rowIndex].forEach((seat, seatIndex) => {
            if (seat === 1) {
                tickets += `Seat ${rows[rowIndex]}${seatIndex + 1}\n`;
            }
        });
    });
    alert(tickets || "No tickets purchased yet.");
}

// Clear all seat selections
function clearSelections() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    selectedSeats.forEach(seat => {
        const row = seat.id.charAt(0);
        const number = parseInt(seat.id.slice(1));
        seat.classList.remove('selected');
        seat.setAttribute('data-info', `Seat ${row}${number}: Available`);
    });
}

// Initialize the seating plan on page load
initSeatingPlan();