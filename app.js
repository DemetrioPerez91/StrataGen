/* eslint-env es2020, browser */
import { allImages } from './images.js';

/* ---------- DOM handles ---------- */
const imageElements = document.querySelectorAll('.grid-element img');
const gridDivs = document.querySelectorAll('.grid-element');
const pickerGrid = document.getElementById('pickerGrid');
const pickerPanel = document.getElementById('stratagem-picker');
const shuffleBtn = document.getElementById('shuffleBtn');
const toggleBtn = document.getElementById('toggleBtn');
const dismissBtn = document.getElementById('dismiss-button');

/* ---------- State ---------- */
const lockedGridIndices = new Set();
const lockedStratagems = new Set();

/* ---------- Helpers ---------- */
function getRandomImages(arr, count, exclude = []) {
  const available = arr.filter((i) => !exclude.includes(i));
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/* ---------- Grid logic ---------- */
function shuffleImages() {
  const usedImages = Array.from(imageElements).map((img) =>
    img.src.split('/').pop()
  );
  const excludeImages = [
    ...lockedStratagems,
    ...usedImages.filter((_, idx) => lockedGridIndices.has(idx))
  ];
  const newImages = getRandomImages(
    allImages,
    4 - lockedGridIndices.size,
    excludeImages
  );

  let newIdx = 0;
  imageElements.forEach((img, idx) => {
    if (!lockedGridIndices.has(idx)) {
      img.src = `stratagems/${newImages[newIdx++]}`;
    }
  });
}

function lockSlot(div, index) {
  const img = div.querySelector('img');
  if (img.src && !lockedGridIndices.has(index)) {
    lockedGridIndices.add(index);
    div.classList.add('locked');
  }
}

/* ---------- Picker logic ---------- */
function buildPicker() {
  pickerGrid.innerHTML = '';
  lockedStratagems.clear();

  allImages.forEach((filename) => {
    const div = document.createElement('div');
    div.className = 'stratagem-picker-element';
    div.setAttribute('isLocked', 'false');
    div.innerHTML = `<img src="stratagems/${filename}" alt="">`;

    div.addEventListener('click', () => {
      const current = div.getAttribute('isLocked') === 'true';
      div.setAttribute('isLocked', String(!current));

      if (current) {
        lockedStratagems.delete(filename);
      } else {
        lockedStratagems.add(filename);
      }
    });

    pickerGrid.appendChild(div);
  });

  pickerPanel.classList.add('visible');
}

function dismissPicker() {
  const total = allImages.length;
  const unlocked = total - lockedStratagems.size;

  if (unlocked < 4) {
    alert('You must have at least 4 unlocked stratagems.');
    return;
  }
  pickerPanel.classList.remove('visible');
}

/* ---------- Event wiring ---------- */
gridDivs.forEach((div, index) =>
  div.addEventListener('click', () => lockSlot(div, index))
);

shuffleBtn.addEventListener('click', shuffleImages);
toggleBtn.addEventListener('click', buildPicker);
dismissBtn.addEventListener('click', dismissPicker);

/* ---------- Init ---------- */
window.addEventListener('load', shuffleImages);
