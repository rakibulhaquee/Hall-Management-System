// Sample hall data
const halls = [
    {
        id: 1,
        name: "Grand Ballroom",
        image: "images/hall1.jpg",
        capacity: 300,
        facilities: "Projector, Stage, Sound System, Catering Kitchen",
        description: "Our largest hall with a spacious dance floor and elegant chandeliers. Perfect for weddings, galas, and large conferences.",
        price: "$1200/day"
    },
    {
        id: 2,
        name: "Conference Hall A",
        image: "images/hall2.jpg",
        capacity: 150,
        facilities: "Projector, Whiteboards, Sound System, WiFi",
        description: "Professional setting for business meetings, seminars, and workshops. Equipped with modern technology.",
        price: "$800/day"
    },
    {
        id: 3,
        name: "Conference Hall B",
        image: "images/hall3.jpg",
        capacity: 100,
        facilities: "Projector, Whiteboards, WiFi",
        description: "Smaller conference space ideal for team meetings, training sessions, and presentations.",
        price: "$600/day"
    },
    {
        id: 4,
        name: "Seminar Room",
        image: "images/hall4.jpg",
        capacity: 50,
        facilities: "Projector, Whiteboard, WiFi",
        description: "Intimate space for small group meetings, interviews, or study sessions.",
        price: "$400/day"
    },
    {
        id: 5,
        name: "Outdoor Pavilion",
        image: "images/hall5.jpg",
        capacity: 200,
        facilities: "Open-air, Stage, Sound System, Catering Area",
        description: "Beautiful outdoor venue for summer weddings, parties, and cultural events.",
        price: "$1000/day (seasonal)"
    }
];

// DOM Elements
const hallsContainer = document.getElementById('halls-container');
const hallDetailsModal = document.getElementById('hall-details-modal');
const applyFiltersBtn = document.getElementById('apply-filters');
const capacityFilter = document.getElementById('capacity');
const dateFilter = document.getElementById('date');

// Display halls
function displayHalls(hallsToDisplay) {
    if (!hallsContainer) return;
    
    hallsContainer.innerHTML = '';
    
    if (hallsToDisplay.length === 0) {
        hallsContainer.innerHTML = '<p class="no-results">No halls match your filters. Please try different criteria.</p>';
        return;
    }
    
    hallsToDisplay.forEach(hall => {
        const hallCard = document.createElement('div');
        hallCard.className = 'hall-card';
        hallCard.innerHTML = `
            <div class="hall-image">
                <img src="${hall.image}" alt="${hall.name}">
            </div>
            <div class="hall-info">
                <h3>${hall.name}</h3>
                <div class="hall-meta">
                    <span>Capacity: ${hall.capacity}</span>
                    <span>${hall.price}</span>
                </div>
                <p class="hall-description">${hall.description.substring(0, 100)}...</p>
                <a href="#" class="view-details" data-hall-id="${hall.id}">View Details</a>
            </div>
        `;
        hallsContainer.appendChild(hallCard);
    });
    
    // Add event listeners to view details buttons
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const hallId = parseInt(btn.getAttribute('data-hall-id'));
            showHallDetails(hallId);
        });
    });
}

// Show hall details in modal
function showHallDetails(hallId) {
    const hall = halls.find(h => h.id === hallId);
    if (!hall || !hallDetailsModal) return;
    
    document.getElementById('hall-modal-title').textContent = hall.name;
    document.getElementById('hall-modal-image').src = hall.image;
    document.getElementById('hall-modal-image').alt = hall.name;
    document.getElementById('hall-modal-capacity').textContent = hall.capacity;
    document.getElementById('hall-modal-facilities').textContent = hall.facilities;
    document.getElementById('hall-modal-availability').textContent = "Available";
    document.getElementById('hall-modal-description').textContent = hall.description;
    
    hallDetailsModal.style.display = 'block';
}

// Filter halls
function filterHalls() {
    const capacity = capacityFilter.value;
    const date = dateFilter.value;
    
    let filteredHalls = [...halls];
    
    // Filter by capacity
    if (capacity !== 'all') {
        const cap = parseInt(capacity);
        filteredHalls = filteredHalls.filter(hall => {
            if (capacity === '300') {
                return hall.capacity > 200;
            }
            return hall.capacity <= cap;
        });
    }
    
    // Note: In a real app, you would also filter by date availability
    // This would require checking against booked dates in your database
    
    displayHalls(filteredHalls);
}

// Event Listeners
if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', filterHalls);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    if (hallsContainer) {
        displayHalls(halls);
    }
    
    // Set default date to today
    if (dateFilter) {
        const today = new Date().toISOString().split('T')[0];
        dateFilter.value = today;
        dateFilter.min = today;
    }
});