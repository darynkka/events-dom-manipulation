"use strict";

const blocksList = [];

document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".block");
  blocks.forEach((block) => {
    blocksList.push(block);
  });
});

const outerDiv = document.getElementById("outerDiv");
document.body.append(outerDiv);

function getBlocksProperties() {
  let information = "";

  blocksList.forEach((block, index) => {
    const width = block.offsetWidth;
    const height = block.offsetHeight;
    const coordinateContainerLeft = block.offsetLeft; // відносно контейнера
    const coordinateContainerTop = block.offsetTop;
    const BoundingClientRect = block.getBoundingClientRect();
    const coordinateBrowserTop = window.scrollY + BoundingClientRect.top; // відносно вікна браузера
    const coordinateBrowserLeft = window.scrollX + BoundingClientRect.left; // відносно вікна браузера
    const scrollTop = outerDiv.scrollTop;
    const scrollLeft = outerDiv.scrollLeft;

    information += `
            Блок ${index + 1}:\n
            Ширина: ${width}px\n
            Висота: ${height}px\n
            Координати (відносно контейнера):\n
              Top: ${coordinateContainerTop}px\n
              Left: ${coordinateContainerLeft}px\n
            Координати (відносно вікна):\n
              Top: ${coordinateBrowserTop}px\n
              Left: ${coordinateBrowserLeft}px\n
            Поточна позиція прокрутки контейнера:\n
              Top: ${scrollTop}px\n
              Left: ${scrollLeft}px\n\n`;
  });

  const elementsInfo = document.getElementById("elementsInfo");
  elementsInfo.innerText = information;
}

const getPropertiesBtn = document.getElementById("getSizeBtn");
getPropertiesBtn.addEventListener("click", getBlocksProperties);

const editSizeBtn = document.getElementById("editSizeBtn");
editSizeBtn.addEventListener("click", () => {
  const blockDataName = prompt(
    "Введіть data-name блоку, який ви хочете змінити (block(цифра)):"
  );
  const newWidth = prompt("Введіть нову ширину блоку:");
  const newHeight = prompt("Введіть нову висоту блоку:");

  if (blockDataName && newWidth && newHeight) {
    const blockToEdit = document.querySelector(
      `.block[data-name="${blockDataName}"]`
    );
    if (blockToEdit) {
      blockToEdit.style.width = `${newWidth}px`;
      blockToEdit.style.height = `${newHeight}px`;

      getBlocksProperties();
    } else {
      alert("Блок з таким data-name не знайдено!");
    }
  }
});

const addBlockButton = document.getElementById("addBlockBtn");
addBlockButton.addEventListener("click", () => {
  const newDataName = prompt("Введіть назву нового блоку:");
  const elemForToggle = prompt("Введіть назву елементу для перемикання:");
  const newItem = document.createElement("div");
  newItem.textContent = newDataName;
  newItem.classList.add("new-block");
  newItem.setAttribute("data-name", newDataName);
  newItem.setAttribute("data-toggle-id", elemForToggle);
  newItem.addEventListener("click", toggleBlock);

  blocksList.push(newItem);
  outerDiv.appendChild(newItem);
});

function toggleBlock(event) {
  const toggleName = event.currentTarget.getAttribute('data-toggle-id');
  const elForToggle = document.querySelector(`[data-name="${toggleName}"]`);
  elForToggle.style.display = (elForToggle.style.display === 'none') ? 'block' : 'none';
}

