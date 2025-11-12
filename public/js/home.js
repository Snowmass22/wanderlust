document.addEventListener('DOMContentLoaded', () => {
    // Hero Image Carousel Logic
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselDots = document.querySelectorAll('.carousel-dots .dot');
    let activeItemIndex = 0;

    function updateCarousel() {
        carouselItems.forEach((item, index) => {
            item.classList.remove('active');
            carouselDots[index].classList.remove('active');
        });
        carouselItems[activeItemIndex].classList.add('active');
        carouselDots[activeItemIndex].classList.add('active');
    }

    carouselItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            activeItemIndex = index;
            updateCarousel();
        });
    });

    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            activeItemIndex = index;
            updateCarousel();
        });
    });

    // Optional: Auto-advance carousel
    // setInterval(() => {
    //     activeItemIndex = (activeItemIndex + 1) % carouselItems.length;
    //     updateCarousel();
    // }, 5000); // Change image every 5 seconds

    // Initialize the carousel
    updateCarousel();

    // Date Picker (using a simple input for now, but a library like flatpickr would be better)
    const dateInput = document.getElementById('date');
    dateInput.addEventListener('focus', () => {
        // In a real application, you'd initialize a date picker here.
        // For demonstration, we'll just show an alert or a simple prompt.
        // console.log("Date picker would open here.");
        // alert("A date picker would appear here for selecting dates!");
        // Example for a real date picker setup (requires a library like flatpickr):
        /*
        flatpickr("#date", {
            mode: "range",
            dateFormat: "d.m.Y",
            // other options
        });
        */
    });

    // Handle search button click
    const searchButton = document.querySelector('.btn-search');
    searchButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default form submission
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const date = document.getElementById('date').value;
        console.log(`Searching for: From ${from}, To ${to}, Date ${date}`);
        // Here you would typically send this data to a backend or navigate to a search results page.
        alert(`Searching for vacations from ${from} to ${to} on ${date}!`);
    });
});