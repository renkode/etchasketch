const container = document.querySelector('.grid-container');
const slider = document.querySelector('#slider');
const dimension = document.querySelector('#sliderValue');
const dimensionsLabel = document.querySelector('.size-label');
const dropdown = document.getElementById('auto-manual');
const clearButton = document.getElementById('clear-grid');
const colorPicker = document.getElementById('color');
let grid = document.querySelector('.grid-container');
let nodeList = [];
let color = colorPicker.value;

let mouseDown = false;
document.body.onmousedown = function() { 
    mouseDown = true;
}
document.body.onmouseup = function() {
    mouseDown = false;
}

dimensionsLabel.textContent = ` x ${dimension.value}`

slider.addEventListener('input', function (e) {
    dimension.value = e.target.value;
    dimensionsLabel.textContent = ` x ${dimension.value}`;
});

slider.addEventListener('change', function (e) {
    createGrid(dimension.value);
});

colorPicker.addEventListener('change', function (e) {
    color = colorPicker.value;
});

let draw = function(e) {
    e.target.style.backgroundColor = color;
}

let holdToDraw = function(e) {
    if (mouseDown) e.target.style.backgroundColor = color;
}

function addListeners (node, drawMode) {
    if (drawMode === "manual") {
        node.addEventListener('mouseenter', holdToDraw);
        node.addEventListener('click',draw);
        node.removeEventListener('mouseenter', draw);
    } else {
        node.addEventListener('mouseenter', draw);
        node.removeEventListener('mouseenter', holdToDraw);
        node.removeEventListener('click', draw);
    }
}

dropdown.addEventListener('input', function(e){
    let drawMode = e.target.value;
    nodeList.forEach(node => addListeners(node,drawMode));
})

dimension.addEventListener('change', function (e) {
    let num = parseInt(e.target.value);
    if (num < e.target.min) dimension.value = e.target.min;
    if (num > e.target.max) dimension.value = e.target.max;
    if (!Number.isInteger(num)) dimension.value = 32;
    slider.value = dimension.value;
    dimensionsLabel.textContent = ` x ${dimension.value}`;
    createGrid(dimension.value);
});

clearButton.addEventListener('click', btn = () => {
    clearGrid();
    createGrid(dimension.value);
})

function createGrid(size) {
    clearGrid();
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size*size; i++) {
        let node = document.createElement("div");
        nodeList.push(node);
    }
    nodeList.forEach(node => {
        node.id = nodeList.indexOf(node);
        node.classList.add("cell");
        addListeners(node,dropdown.value);
        container.appendChild(node);
    })
}

function clearGrid() {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
      }
    nodeList = [];
}

createGrid(dimension.value);

  