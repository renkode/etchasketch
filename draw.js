const container = document.querySelector('.grid-container');
const slider = document.querySelector('#slider');
const dimension = document.querySelector('#sliderValue');
const dimensionsLabel = document.querySelector('.size-label');
let nodeList = [];

dimensionsLabel.textContent = ` x ${dimension.value}`

slider.addEventListener('input', function (e) {
    dimension.value = e.target.value;
    dimensionsLabel.textContent = ` x ${dimension.value}`;
});

slider.addEventListener('change', function (e) {
    clearGrid(dimension.value);
});

dimension.addEventListener('change', function (e) {
    let num = parseInt(e.target.value);
    if (num < e.target.min) dimension.value = e.target.min;
    if (num > e.target.max) dimension.value = e.target.max;
    if (!Number.isInteger(num)) dimension.value = 32;
    slider.value = dimension.value;
    dimensionsLabel.textContent = ` x ${dimension.value}`;
    clearGrid(dimension.value);
});



function createGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size*size; i++) {
        let node = document.createElement("div");
        nodeList.push(node);
    }
    nodeList.forEach(node => {
        node.classList.add("cell");
        node.addEventListener('mouseenter', function(e) {
            //e.target.style.backgroundColor = "#000000";
            e.target.classList.add("active");
        }, {once:true})
        container.appendChild(node);
    })
}

function clearGrid(newSize) {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
      }
    nodeList = [];
    createGrid(newSize);
}

createGrid(dimension.value);

  