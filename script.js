const $ = str => document.querySelector(str);
const $$ = str => document.querySelectorAll(str);

// Romantic captions for each image
const romanticQuotes = [
    "You are my favorite kind of magic ❤️",
    "Every love story is beautiful, but ours is my favorite 💕",
    "With you, every moment is special 🌹",
    "Falling for you was the best thing I ever did 💖",
    "In your arms, I found my forever ✨",
    "You are the reason my heart beats faster 💘",
    "Loving you is like breathing – I can’t stop 😍",
    "Together is my favorite place to be 🥰"
];

(function () {
    if (!window.app) {
        window.app = {};
    }
    app.carousel = {
        removeClass: function (el, classname = '') {
            if (el) {
                if (classname === '') {
                    el.className = '';
                } else {
                    el.classList.remove(classname);
                }
                return el;
            }
            return;
        },
        reorder: function () {
            let childcnt = $("#carousel").children.length;
            let childs = $("#carousel").children;
            for (let j = 0; j < childcnt; j++) {
                childs[j].dataset.pos = j;
            }
        },
        move: function (el) {
          console.log("Caption Element:", document.getElementById("carousel-caption"));
          console.log("Selected Element:", app.selected);
          
            let selected = el;

            if (typeof el === "string") {
                selected = (el === "next") ? $(".selected").nextElementSibling : $(".selected").previousElementSibling;
            }

            let curpos = parseInt(app.selected.dataset.pos);
            let tgtpos = parseInt(selected.dataset.pos);
            let shift = Math.abs(curpos - tgtpos);
            let dir = (curpos < tgtpos) ? -1 : 1;

            for (let i = 0; i < shift; i++) {
                let el = (dir === -1) ? $("#carousel").firstElementChild : $("#carousel").lastElementChild;
                if (dir === -1) {
                    el.dataset.pos = $("#carousel").children.length;
                    $("#carousel").append(el);
                } else {
                    el.dataset.pos = 0;
                    $("#carousel").prepend(el);
                }
                app.carousel.reorder();
            }

            app.selected = selected;

            // Update the romantic caption text
            const caption = document.getElementById("carousel-caption");
            if (caption) {
                const selectedIndex = parseInt(selected.dataset.pos) % romanticQuotes.length;
               
                console.log("Updating caption to:", romanticQuotes[selectedIndex]);
                
                caption.innerHTML = romanticQuotes[selectedIndex]; // Update caption text
                caption.style.opacity = "0"; // Start hidden
                setTimeout(() => {
                    caption.innerHTML = romanticQuotes[selectedIndex];
                    caption.style.opacity = "1"; // Fade in smoothly
                    console.log("Caption should now be visible:", caption.innerHTML);
                  }, 300);
            }

            let next = selected.nextElementSibling;
            let prev = selected.previousElementSibling;
            let prevSecond = prev ? prev.previousElementSibling : $("#carousel").lastElementChild;
            let nextSecond = next ? next.nextElementSibling : $("#carousel").firstElementChild;

            selected.className = '';
            selected.classList.add("selected");

            app.carousel.removeClass(prev).classList.add("prev");
            app.carousel.removeClass(next).classList.add("next");
            app.carousel.removeClass(nextSecond).classList.add("nextRightSecond");
            app.carousel.removeClass(prevSecond).classList.add("prevLeftSecond");

            app.carousel.nextAll(nextSecond).forEach(item => {
                item.className = '';
                item.classList.add("hideRight");
            });

            app.carousel.prevAll(prevSecond).forEach(item => {
                item.className = '';
                item.classList.add("hideLeft");
            });
        },
        nextAll: function (el) {
            let els = [];
            if (el) {
                while (el = el.nextElementSibling) {
                    els.push(el);
                }
            }
            return els;
        },
        prevAll: function (el) {
            let els = [];
            if (el) {
                while (el = el.previousElementSibling) {
                    els.push(el);
                }
            }
            return els;
        },
        keypress: function (e) {
            switch (e.which) {
                case 37: // Left arrow
                    app.carousel.move('prev');
                    break;
                case 39: // Right arrow
                    app.carousel.move('next');
                    break;
                default:
                    return;
            }
            e.preventDefault();
            return false;
        },
        previous: function (e) {
            app.carousel.move('prev');
        },
        next: function (e) {
            app.carousel.move('next');
        },
        init: function () {
            document.addEventListener("keydown", app.carousel.keypress);
            $("#carousel").addEventListener("mousedown", app.carousel.doDown);
            $("#carousel").addEventListener("touchstart", app.carousel.doDown);
            $("#carousel").addEventListener("mouseup", app.carousel.doUp);
            $("#carousel").addEventListener("touchend", app.carousel.doUp);

            app.carousel.reorder();
            $('#prev').addEventListener("click", app.carousel.previous);
            $('#next').addEventListener("click", app.carousel.next);
            app.selected = $(".selected");

            // Ensure initial caption appears
            const caption = document.getElementById("carousel-caption");
            if (caption) {
                caption.innerHTML = romanticQuotes[0];
                caption.style.opacity = "1";
            }
        },
        state: {}
    };

    app.carousel.init();
})();
document.addEventListener("DOMContentLoaded", function () {
  const musicButton = document.getElementById("music-button");
  const audio = document.getElementById("carousel-music");

  musicButton.addEventListener("click", function () {
      if (audio.paused) {
          audio.play();
          musicButton.innerText = "⏸ Pause Music";
      } else {
          audio.pause();
          musicButton.innerText = "🎵 Play Music";
      }
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("messageModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeBtn = document.querySelector(".close-btn"); // Close (×) button
    const closeModalBtn = document.querySelector(".closeModalBtn"); // Close button inside modal
    
    console.log("Script loaded");
    // Function to open modal
    function openModal() {
        console.log("openModal function triggered!"); // Debugging check
        const modal = document.getElementById("messageModal");
        if (modal) {
            modal.style.display = "block";
        }
    }

    // Function to close modal
    function closeModal() {
        modal.style.display = "none";
    }

    // Open modal only when button is clicked
    if (openModalBtn) {
        openModalBtn.addEventListener("click", openModal);
    }

    // Close modal when either button is clicked
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }
    // Close modal when clicking outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    function createFallingRoses() {
        const roseContainer = document.getElementById("falling-roses");

        setInterval(() => {
            const petal = document.createElement("div");
            petal.classList.add("rose-petal"); // Matches CSS selector
            petal.style.left = Math.random() * 100 + "vw"; // Random horizontal position
            petal.style.animationDuration = Math.random() * 3 + 3 + "s"; // 3-6s fall time

            roseContainer.appendChild(petal);

            setTimeout(() => {
                petal.remove(); // Remove after animation to prevent overflow
            }, 6000);
        }, 300); // New petal every 300ms
    }

    createFallingRoses(); // Start the effect
});


