    document.addEventListener("DOMContentLoaded", () => {
        const themeSwitch = document.querySelector("#checkbox");
        themeSwitch.addEventListener("change", () => {
            document.body.setAttribute("data-theme", themeSwitch.checked ? "dark" : "light");
        });

        const burger = document.querySelector(".burger");
        const nav = document.querySelector(".nav-links");
        const navLinks = document.querySelectorAll(".nav-links li");

        burger.addEventListener("click", () => {
            nav.classList.toggle("active");
            burger.classList.toggle("active");
        });

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute("href")).scrollIntoView({
                    behavior: "smooth",
                });
            });
        });

        const typed = new Typed(".typed-text", {
            strings: ["Mahasiswi", "Semester 4", "Teknik Informatika"],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
        });

        AOS.init({
            duration: 1000,
            once: true,
        });

        const filterButtons = document.querySelectorAll(".filter-btn");
        const projectItems = document.querySelectorAll(".project-item");

        filterButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const filter = button.getAttribute("data-filter");

                filterButtons.forEach((btn) => btn.classList.remove("active"));
                button.classList.add("active");

                projectItems.forEach((item) => {
                    if (filter === "all" || item.getAttribute("data-category") === filter) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                });
            });
        });

        // Scroll Top Button Logic
        const scrollTopBtn = document.querySelector(".scroll-top");

        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 100) {
                scrollTopBtn.classList.add("active");
            } else {
                scrollTopBtn.classList.remove("active");
            }
        });

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });

        // Stats Animation Logic
        const stats = document.querySelectorAll(".stat-number");
        const statsSection = document.querySelector("#about");

        const countUp = (element, target) => {
            let count = 0;
            const timer = setInterval(() => {
                count++;
                element.textContent = count;
                if (count === target) {
                    clearInterval(timer);
                }
            }, 2000 / target);
        };

        const animateStats = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    stats.forEach((stat) => {
                        const target = Number.parseInt(stat.getAttribute("data-count"));
                        countUp(stat, target);
                    });
                    observer.unobserve(entry.target);
                }
            });
        };

        const statsObserver = new IntersectionObserver(animateStats, {
            threshold: 0.5,
        });

        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Background Waves Logic
        const canvas = document.getElementById("background-canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const waves = [
            { y: 0.3, length: 0.01, amplitude: 20, speed: 0.03, offset: 0 },
            { y: 0.5, length: 0.02, amplitude: 15, speed: 0.02, offset: 0 },
            { y: 0.7, length: 0.015, amplitude: 25, speed: 0.01, offset: 0 },
        ];

        function drawWave(wave, color) {
            ctx.beginPath();
            ctx.moveTo(0, canvas.height * wave.y);

            for (let x = 0; x < canvas.width; x++) {
                const dx = x * wave.length;
                const y = Math.sin(dx + wave.offset) * wave.amplitude + canvas.height * wave.y;
                ctx.lineTo(x, y);
            }

            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();

            ctx.fillStyle = color;
            ctx.fill();
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, "rgba(52, 152, 219, 0.2)");
            gradient.addColorStop(1, "rgba(46, 204, 113, 0.2)");

            waves.forEach((wave, index) => {
                wave.offset += wave.speed;
                drawWave(wave, gradient);
            });

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Skill Progress Bar Animation Logic
        const skillItems = document.querySelectorAll(".skill-item");

        const animateSkills = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector(".progress");
                    if (progressBar) {
                        const percentage = progressBar.style.width;
                        progressBar.style.width = "0%";
                        setTimeout(() => {
                            progressBar.style.width = percentage;
                        }, 100);
                    }
                    observer.unobserve(entry.target);
                }
            });
        };

        const skillsObserver = new IntersectionObserver(animateSkills, {
            threshold: 0.5,
        });

        skillItems.forEach((item) => {
            skillsObserver.observe(item);
        });

        // Image Lazy Load Logic
        const images = document.querySelectorAll("img[data-src]");
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute("data-src");
                    img.removeAttribute("data-src");
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach((img) => imageObserver.observe(img));

        // Current Year Display
        const currentYear = new Date().getFullYear();
        document.getElementById("current-year").textContent = currentYear;

        // ScrollReveal for animations
        const ScrollRevealInstance = ScrollReveal();
        ScrollRevealInstance.reveal(".hero-content", {
            delay: 200,
            distance: "50px",
            origin: "bottom",
        });

        ScrollRevealInstance.reveal(".about-content", {
            delay: 200,
            distance: "50px",
            origin: "left",
        });

        ScrollRevealInstance.reveal(".skills-slider-container", {
            delay: 200,
            distance: "50px",
            origin: "right",
        });

        ScrollRevealInstance.reveal(".project-item", {
            delay: 200,
            distance: "50px",
            origin: "bottom",
            interval: 200,
        });

        // Custom Cursor Logic
        const cursor = document.querySelector(".custom-cursor");

        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });

        document.addEventListener("mousedown", () => cursor.classList.add("click"));
        document.addEventListener("mouseup", () => cursor.classList.remove("click"));

        // Hero Section Background Scroll Logic
        const heroSection = document.querySelector(".hero");
        window.addEventListener("scroll", () => {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.7 + "px";
        });

        // Testimonial Logic
        const testimonials = document.querySelectorAll(".testimonial");
        let currentTestimonial = 0;

        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                if (i === index) {
                    testimonial.classList.add("active");
                } else {
                    testimonial.classList.remove("active");
                }
            });
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }

        if (testimonials.length > 0) {
            setInterval(nextTestimonial, 5000);
            showTestimonial(currentTestimonial);
        }
    });
