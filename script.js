const stratagems = window.api.getAllImages();
const stratagemsByCategory = window.api.getStratagemsByCategory();


const imageElements = document.querySelectorAll('.grid-element img');
const gridDivs = document.querySelectorAll('.grid-element');
const pickerGrid = document.getElementById('pickerGrid');
const pickerPanel = document.getElementById('stratagem-picker');

let lockedGridIndices = new Set();
let lockedStratagems = new Set();

// Attach lock toggle on grid element click
gridDivs.forEach((div, index) => {
  div.addEventListener('click', () => {
    const img = div.querySelector('img');
    if (img.src && !lockedGridIndices.has(index)) {
      lockedGridIndices.add(index);
      div.classList.add('shuffleLocked');
    } else if (img.src && lockedGridIndices.has(index)) {
      div.classList.remove('shuffleLocked' )
      lockedGridIndices.delete(index)
    }
  });
});

function getRandomImages(arr, count, exclude = []) {
  const available = arr.filter(i => !exclude.includes(i));
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function shuffleImages() {
  const usedImages = Array.from(imageElements).map(img => img.src.split('/').pop());
  const excludeImages = [...lockedStratagems, ...usedImages.filter((_, idx) => lockedGridIndices.has(idx))];
  const newImages = getRandomImages(stratagems, 4 - lockedGridIndices.size, excludeImages);

  let newIdx = 0;
  imageElements.forEach((img, idx) => {
    if (!lockedGridIndices.has(idx)) {
      img.src = `stratagems/${newImages[newIdx++]}`;
    }
  });
}

function showStratagemBoard() {
  pickerGrid.innerHTML = '';
  lockedStratagems.clear();

  const airstrikes = stratagemsByCategory.airStrikes;
  const support = stratagemsByCategory.support;
  const sentriesAndFortifications = stratagemsByCategory.sentriesAndFortifications;

  const array = [...airstrikes, ...support, ...sentriesAndFortifications];

  array.forEach(filename => {
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

function dismissStratagemBoard() {
  const total = stratagems.length;
  const unlocked = total - lockedStratagems.size;
  if (unlocked < 4) {
    alert('You must have at least 4 unlocked stratagems.');
    return;
  }
  pickerPanel.classList.remove('visible');
}



window.onload = shuffleImages;