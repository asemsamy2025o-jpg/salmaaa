
const heart = document.getElementById("heart");
const holder = document.getElementById("loveWords");

const nameElement = document.getElementById("name");
const subtitle = document.getElementById("subtitle");
const stars = document.getElementById("stars");

// =================================
// SETTINGS
// =================================

const WORD_COUNT = 150;
const DRAW_DURATION = 3.5;
const NAME_DELAY = 9;
const LETTER_SPEED = 0.75;
const ROTATION_SPEED = 0.065;


// =================================
// BACKGROUND STARS
// =================================

for (let i = 0; i < 35; i++) {

    const star = document.createElement("span");

    star.className = "star";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.animationDelay =
        Math.random() * 3 + "s";

    stars.appendChild(star);
}


// =================================
// HEART MATHEMATICAL SHAPE
// =================================

function heartPoint(t) {

    const x = 16 * Math.pow(Math.sin(t), 3);

    const y = -(
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t)
    );

    return { x, y };
}


// =================================
// CREATE HEART PATH
// =================================

const samples = 3000;
const points = [];

let totalLength = 0;

for (let i = 0; i <= samples; i++) {

    const t = (i / samples) * Math.PI * 2;

    const p = heartPoint(t);

    if (i > 0) {

        const previous = points[i - 1];

        const dx = p.x - previous.x;
        const dy = p.y - previous.y;

        totalLength += Math.sqrt(
            dx * dx + dy * dy
        );
    }

    points.push({
        x: p.x,
        y: p.y,
        distance: totalLength
    });
}


// =================================
// GET POSITION ON HEART
// =================================

function getHeartPosition(progress) {

    const target = progress * totalLength;

    let low = 0;
    let high = points.length - 1;

    while (low < high) {

        const mid = Math.floor(
            (low + high) / 2
        );

        if (points[mid].distance < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    const p = points[low];

    return {
        x: 50 + p.x * 2.55,
        y: 48 + p.y * 2.45
    };
}


// =================================
// CREATE LOVE WORDS
// =================================

const words = [];

for (let i = 0; i < WORD_COUNT; i++) {

    const word = document.createElement("span");

    word.className = "word";
    word.textContent = "I LOVE YOU";

    holder.appendChild(word);

    words.push(word);
}


// =================================
// HEART ENTRANCE
// =================================

setTimeout(() => {

    heart.classList.add("show");

}, 200);


// =================================
// WORDS ANIMATION
// =================================

const startTime = performance.now();

function animate(now) {

    const elapsed =
        (now - startTime) / 1000;

    words.forEach((word, i) => {

        const revealTime =
            (i / WORD_COUNT) * DRAW_DURATION;

        if (elapsed >= revealTime) {

            word.style.opacity = "1";

        }

        const progress =
            (i / WORD_COUNT +
            elapsed * ROTATION_SPEED) % 1;

        const position =
            getHeartPosition(progress);

        word.style.left =
            position.x + "%";

        word.style.top =
            position.y + "%";

    });

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);


// =================================
// SALMA LETTER ANIMATION
// =================================

setTimeout(() => {

    const name = "SALMA";

    name.split("").forEach((letter, index) => {

        const span = document.createElement("span");

        span.textContent = letter;

        span.style.animationDelay =
            (index * LETTER_SPEED) + "s";

        nameElement.appendChild(span);

    });

    setTimeout(() => {

        subtitle.classList.add("show");

    }, name.length * LETTER_SPEED + 300);

}, NAME_DELAY);

// Floating hearts and roses
const decor = document.getElementById("floatingDecor");

const decorations = ["❤️", "💕", "💗", "💖", "🌹", "🌸"];

function createDecoration() {
    const item = document.createElement("span");

    item.className = "floating-item";
    item.textContent =
        decorations[Math.floor(Math.random() * decorations.length)];

    item.style.left = Math.random() * 100 + "vw";
    item.style.fontSize = (15 + Math.random() * 22) + "px";

    const duration = 7 + Math.random() * 8;
    item.style.animationDuration = duration + "s";

    decor.appendChild(item);

    setTimeout(() => {
        item.remove();
    }, duration * 1000);
}

setInterval(createDecoration, 180);
