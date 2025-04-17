const areaInput = document.getElementById('area-input');
const areaOutput = document.getElementById('area-output');

const lenInput = document.getElementById('len-input');
const lenOutput = document.getElementById('len-output');

const massInput = document.getElementById('mass-input');
const massOutput = document.getElementById('mass-output');

//units
const fromLen = document.getElementById('from-len');
const toLen = document.getElementById('to-len');

const fromMass = document.getElementById('from-mass');
const toMass = document.getElementById('to-mass');

const fromArea = document.getElementById('from-area');
const toArea = document.getElementById('to-area');

//buttons
const convertButton = document.querySelectorAll('.equal');
const clearBtn = document.querySelector('.clear-btn');
const delBtn = document.querySelector('.del-btn');

const unitCategories = {
  length: {
    base: 'm',
    units: {
      cm: 0.01,
      m: 1,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      mi: 1609.34,
    },
  },
  mass: {
    base: 'kg',
    units: {
      mg: 0.000001,
      g: 0.001,
      kg: 1,
      lb: 0.453592,
      oz: 0.0283495,
    },
  },
  area: {
    base: 'm2',
    units: {
      'cm²': 0.0001,
      'm²': 1,
      'km²': 1_000_000,
      'in²': 0.00064516,
      'ft²': 0.092903,
    },
  },
};

function convert(value, from, to, type) {
  const category = unitCategories[type];
  const baseValue = value * category.units[from];
  const converted = baseValue / category.units[to];
  return converted;
}

convertButton[0].addEventListener('click', () => {
  const input = parseFloat(lenInput.value);
  if (!isNaN(input)) {
    lenOutput.value = convert(input, fromLen.value, toLen.value, 'length');
  }
});

convertButton[1].addEventListener('click', () => {
  const input = parseFloat(massInput.value);
  if (!isNaN(input)) {
    massOutput.value = convert(input, fromMass.value, toMass.value, 'mass');
  }
});

convertButton[2].addEventListener('click', () => {
  const input = parseFloat(areaInput.value);
  if (!isNaN(input)) {
    areaOutput.value = convert(input, fromArea.value, toArea.value, 'area');
  }
});

//clear 
clearBtn.addEventListener('click', () => {
  [lenInput, lenOutput, massInput, massOutput, areaInput, areaOutput].forEach(el => el.value = '');
});
delBtn.addEventListener('click', () => {
  const active = document.activeElement;
  if (active && active.tagName === 'INPUT' && !active.disabled) {
    active.value = active.value.slice(0, -1);
  }
});