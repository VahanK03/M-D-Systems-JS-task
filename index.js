let slides = [
    {
        "color": "#f42a2a",
        "id": 1716480297366,
        "isActive": false
    },
    {
        "color": "#f42ad9",
        "id": 1716480300400,
        "isActive": false
    },
    {
        "color": "#2a31f4",
        "id": 1716480302715,
        "isActive": false
    },
    {
        "color": "#2af0f4",
        "id": 1716480305345,
        "isActive": false
    },
    {
        "color": "#41f42a",
        "id": 1716480308265,
        "isActive": false
    }
];

let activeSlideID = 1716480308265;

const colorPicker = document.querySelector('#colorPicker');
const addButton = document.querySelector('#addButton');
const colorList = document.querySelector('#colorList');
const slider = document.querySelector('.slider');

const onDelete = (e) => {
    e.stopPropagation();

    const colorNode = e.target.parentNode;
    const colorID = +colorNode.getAttribute('data-index');

    if (slides.length > 1) {
        if (activeSlideID === colorID) {
            prevSlide()
        }
    } else {
        document.querySelector('.slider').classList.add('dn')
    }
    slides = slides.filter(i => i.id !== colorID)
    colorList.removeChild(colorNode);

}

const handleColorMenuClick = (e) => {
    const colorNode = e.target;
    activeSlideID = +colorNode.getAttribute('data-index');
    document.querySelector('.sliderItem').style.backgroundColor = slides.find((slide) => slide.id === activeSlideID).color;
    setActiveSlide(activeSlideID)
}

const handleAddColorNode = (color, colorID) => {

    const colorNode = document.createElement('div');
    colorNode.className = 'colorListElement';
    colorNode.setAttribute('data-index', colorID);
    colorNode.style.backgroundColor = color;

    const closeButton = document.createElement('button');
    closeButton.className = 'closeButton';
    closeButton.innerText = 'X';
    closeButton.onclick = onDelete;

    colorNode.onclick = handleColorMenuClick
    document.querySelector('.sliderItem').style.backgroundColor = color;

    colorNode.appendChild(closeButton);
    slider.appendChild(colorNode);

    colorList.appendChild(colorNode);
}

const handleAddColor = () => {
    document.querySelector('.dn')?.classList.remove('dn');

    const colorID = Date.now()
    activeSlideID = colorID;
    slides.push({ color: colorPicker.value, id: colorID, isActive: colorID === activeSlideID });
    handleAddColorNode(colorPicker.value, colorID);
    setActiveSlide(activeSlideID);
}

const setActiveSlide = (colorID) => {
    const activeSlideNode = document.querySelector('.activeSlide');
    console.log('colorID', colorID)
    if (activeSlideNode) {
        activeSlideNode.classList.remove('activeSlide');
    }

    document.querySelector(`[data-index="${colorID}"]`).classList.add('activeSlide');
}

const nextSlide = () => {
    const activeSlideItemIndex = slides.findIndex((slide) => slide.id === activeSlideID)
    if (activeSlideItemIndex === slides.length - 1) {
        activeSlideID = slides[0].id
        setActiveSlide(activeSlideID);
        document.querySelector('.sliderItem').style.backgroundColor = slides.find((slide) => slide.id === activeSlideID).color
        return
    }
    activeSlideID = slides[activeSlideItemIndex + 1].id
    setActiveSlide(activeSlideID);
    document.querySelector('.sliderItem').style.backgroundColor = slides.find((slide) => slide.id === activeSlideID).color
}

const prevSlide = () => {
    const activeSlideItemIndex = slides.findIndex((slide) => slide.id === activeSlideID)
    if (activeSlideItemIndex === 0) {
        activeSlideID = slides[slides.length - 1].id
        setActiveSlide(activeSlideID);
        document.querySelector('.sliderItem').style.backgroundColor = slides.find((slide) => slide.id === activeSlideID).color
        return;
    }
    activeSlideID = slides[activeSlideItemIndex - 1].id
    setActiveSlide(activeSlideID);
    document.querySelector('.sliderItem').style.backgroundColor = slides.find((slide) => slide.id === activeSlideID).color

}

addButton.onclick = handleAddColor;

slides.forEach(element => {
    handleAddColorNode(element.color, element.id)
});
setActiveSlide(slides[slides.length - 1]?.id)