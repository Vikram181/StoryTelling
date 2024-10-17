// Getting buttons and text from the HTML
const speakButton = document.getElementById('speakButton');
const stopButton = document.getElementById('stopButton');
const resumeButton = document.getElementById('resumeButton');
const restartButton = document.getElementById('restartButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const textElement = document.getElementById('text');
const imageElement = document.getElementById('image');

// Array of pages with text and image URLs
const pages = [
    {
        text: "Once upon a time, in a sunny meadow, there lived a speedy Hare who bragged about how fast he could run. The other animals admired him but often found his boasting annoying. One day, a wise Tortoise decided he had enough of the Hare's arrogance. I challenge you to a race, the Tortoise said. The Hare laughed loudly, A race? You must be joking! You’ll never win!",
        image: "image1/page1.jpg"
    },
    {
        text: "The next morning all the animals gathered to watch the race The starting line was marked and the excitement filled the air The Fox acted as the judge and shouted On your marks get set go The Hare took off like a lightning bolt while the Tortoise plodded along at his slow and steady pace",
        image: "image1/page2.jpg"
    },
    {
        text: "As the Hare dashed ahead he looked back and saw the Tortoise far behind Feeling confident he decided to take a quick nap under a shady tree There is no way he can catch up to me the Hare thought closing his eyes Meanwhile the Tortoise continued on focusing on the finish line",
        image: "image1/page3.jpg"
    },
    {
        text: "Slowly but surely, the Tortoise moved forward, never stopping to rest. He passed the sleeping Hare, who was completely unaware. The other animals cheered for the Tortoise, amazed by his determination and persistence. “I can do this!” the Tortoise thought, pushing on.",
        image: "image1/page4.jpg"
    },
    {
        text: "After a refreshing nap, the Hare woke up and realized how much time had passed. He jumped up in shock! “Oh no! The Tortoise is almost at the finish line!” The Hare sprinted as fast as he could, but it was too late. The Tortoise was already crossing the finish line, and the crowd erupted in cheer",
        image: "image1/page5.jpg"
    },
    {
        text: "The animals celebrated the Tortoise's victory, and the Hare, feeling embarrassed, learned an important lesson. “I should never underestimate anyone, no matter how slow they seem,” he admitted. The Tortoise smiled and said, “Slow and steady wins the race.” From that day on, the Hare was humble, and the Tortoise became a symbol of perseverance for everyone.",
        image: "image1/page6.jpg"
    }
];

let currentPage = 0; // Start at the first page
let isPaused = false;
let speech = new SpeechSynthesisUtterance(pages[currentPage].text);

// Function for creating speech for the current page
function createSpeech() {
    speech = new SpeechSynthesisUtterance(pages[currentPage].text);
    speech.onend = () => { isPaused = false; };
    speech.onpause = () => { isPaused = true; };
    speech.onresume = () => { isPaused = false; };
}

createSpeech();

// Event listener for the Speak button
speakButton.addEventListener('click', function() {
    createSpeech();
    window.speechSynthesis.speak(speech);
});

// Event listener for the Stop button
stopButton.addEventListener('click', function() {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        isPaused = true;
    }
});

// Event listener for the Resume button
resumeButton.addEventListener('click', function() {
    if (isPaused) {
        window.speechSynthesis.resume();
        isPaused = false;
    }
});

// Event listener for the Restart button
restartButton.addEventListener('click', function() {
    window.speechSynthesis.cancel();
    createSpeech();
    window.speechSynthesis.speak(speech);
});

// Navigation button event listeners
prevButton.addEventListener('click', function() {
    if (currentPage > 0) {
        currentPage--;
        updatePage();
    }
});

nextButton.addEventListener('click', function() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        updatePage();
    }
});

// Function to update the page content
function updatePage() {
    textElement.innerText = pages[currentPage].text; // Update text
    imageElement.src = pages[currentPage].image; // Update image source
    window.speechSynthesis.cancel(); // Stop any current speech
    createSpeech(); // Prepare new speech for the current page
}
