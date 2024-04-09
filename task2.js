const heroDiv = document.getElementById('heroDiv');
heroDiv.classList.add('hero-div');
let blocks = [];

const colors = ["#A64253", "#8491A3", "#315C2B", "#BFA4A4", "#9EA93F"];
const widths = ["100px", "200px", "190px", "120px", "150px"];
const heights = ["90px", "180px", "200px", "120px", "150px"];
const texts = [
    "Hello World",
    "I'm hungry",
    "I wanna sleep",
    "I'm keen on ice late",
    "Stephen King is my love",
];

function setRandomProperties(item) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomWidth = widths[Math.floor(Math.random() * widths.length)];
    const randomHeight = heights[Math.floor(Math.random() * heights.length)];
    const randomText = texts[Math.floor(Math.random() * texts.length)];

    item.style.backgroundColor = randomColor;
    item.style.width = randomWidth;
    item.style.height = randomHeight;
    item.textContent = randomText;
}

function addBlock() {
    const blockId = prompt("Enter block id:");
    if (!blockId) return;

    const newBlock = document.createElement("div");
    newBlock.id = blockId;
    newBlock.classList.add("block"); 
    setRandomProperties(newBlock);
    heroDiv.appendChild(newBlock);

    setTimeout(() => {
        newBlock.classList.add("show");
    }, 100); 

    const prevColor = newBlock.style.backgroundColor; 
     newBlock.addEventListener('click', () => {
        const width = newBlock.offsetWidth;
        const height = newBlock.offsetHeight;
        const coordinateContainerLeft = newBlock.offsetLeft; // відносно контейнера
        const coordinateContainerTop = newBlock.offsetTop;
        const BoundingClientRect = newBlock.getBoundingClientRect();
        const coordinateBrowserTop = window.scrollY + BoundingClientRect.top; // відносно вікна браузера
        const coordinateBrowserLeft = window.scrollX + BoundingClientRect.left; // відносно вікна браузера
        const scrollTop = heroDiv.scrollTop;
        const scrollLeft = heroDiv.scrollLeft;

        const message = `
            Width: ${width}px\n
            Height: ${height}px\n
            Coordinate (relative to container):\n
              Top: ${coordinateContainerTop}px\n
              Left: ${coordinateContainerLeft}px\n
            Coordinate (relative to window):\n
              Top: ${coordinateBrowserTop}px\n
              Left: ${coordinateBrowserLeft}px\n
            Scroll position (of container):\n
              Top: ${scrollTop}px\n
              Left: ${scrollLeft}px\n
        `;
        alert(message);
    });
    newBlock.addEventListener('mouseover', () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        newBlock.style.transition = "background-color 0.5s ease";
        newBlock.style.backgroundColor = randomColor;
    });
    newBlock.addEventListener('mouseout', () => {
        newBlock.style.transition = "background-color 0.5s ease";
        newBlock.style.backgroundColor = prevColor; 
    });

    blocks.push(newBlock);
}
function removeBlock() {
    const blockIdToDelete = prompt("Enter the ID of the block you want to delete:");
    if (!blockIdToDelete) return;

    const blockToRemove = document.getElementById(blockIdToDelete);
    if (blockToRemove) {
        blockToRemove.remove();
        blocks = blocks.filter(block => block.id !== blockIdToDelete); 
    } else {
        alert(`Block with ID ${blockIdToDelete} not found.`);
    }
}

const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addBlock);

const removeBtn = document.getElementById('removeBtn');
removeBtn.addEventListener('click', removeBlock);