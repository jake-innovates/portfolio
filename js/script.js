// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to use animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');
    let scrollable = document.documentElement.scrollHeight - window.innerHeight;
    let scrolled = window.scrollY;

    if (Math.ceil(scrolled) === scrollable) {
        footer.classList.add('show-animate');
    }
    else {
        footer.classList.remove('show-animate');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript file loaded');
    
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                form.reset();
                document.getElementById('contactForm').style.display = 'none';
                document.getElementById('thankYouMessage').style.display = 'block';
                setTimeout(() => {
                    window.location.hash = '#home';
                }, 3000); // Redirect after 3 seconds
            } else {
                alert('There was a problem with the submission.');
            }
        })
        .catch(error => {
            alert('There was a problem with the submission.');
        });
    });
});