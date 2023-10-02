const element = document.getElementById('your-element-id');

// Добавляем обработчик события наведения мыши
element.addEventListener('mouseover', function(event) {
    // Получаем элемент, на который наведена мышь
    const targetElement = event.target;
    console.log(targetElement);
});

// получить списокэлементов, на наведенных элемент присвоить класс dropdown и у него