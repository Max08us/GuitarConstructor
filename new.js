
console.log(GuitarElements);

let currentSelection = {
    body: GuitarElements.body[0],
    head: GuitarElements.head[0],
    neck: GuitarElements.neck[0]
};

function initPage() {
    populateDropdown('body-options', GuitarElements.body, 'body');
    populateDropdown('head-options', GuitarElements.head, 'head');
    populateDropdown('neck-options', GuitarElements.neck, 'neck');
    
    updateGuitarImage('body-area', currentSelection.body.img);
    updateGuitarImage('head-area', currentSelection.head.img);
    updateGuitarImage('neck-area', currentSelection.neck.img);
    
    updatePrices();
    initEventHandlers();
}

function populateDropdown(dropdownId, elements, type) {
    const dropdown = document.getElementById(dropdownId);
    
    elements.forEach((element, index) => {
        const option = document.createElement('div');
        // Добавляем отображение цены рядом с названием
        option.innerHTML = `${element.name} <span class="option-price">(${element.price} ₽)</span>`;
        option.setAttribute('data-img', element.img);
        option.setAttribute('data-price', element.price);
        option.setAttribute('data-index', index);
        option.setAttribute('data-type', type);
        
        if (index === 0) {
            option.classList.add('selected');
        }
        
        option.addEventListener('click', function() {
            const selectedIndex = this.getAttribute('data-index');
            currentSelection[type] = elements[selectedIndex];
            
            const targetArea = `${type}-area`;
            updateGuitarImage(targetArea, currentSelection[type].img);
            
            updatePrices();
            
            this.parentElement.querySelectorAll('div').forEach(item => {
                item.classList.remove('selected');
            });
            
            this.classList.add('selected');
            this.parentElement.classList.remove('show');
        });
        
        dropdown.appendChild(option);
    });
}


function updateGuitarImage(elementId, imgUrl) {
    const element = document.getElementById(elementId);
    element.style.backgroundImage = `url("${imgUrl}")`;
}

// Остальные функции остаются без изменений

function updatePrices() {
    document.getElementById('body-price').textContent = `${currentSelection.body.price} ₽`;
    document.getElementById('neck-price').textContent = `${currentSelection.neck.price} ₽`;
    document.getElementById('head-price').textContent = `${currentSelection.head.price} ₽`;
    
    const totalPrice = currentSelection.body.price + currentSelection.neck.price + currentSelection.head.price;
    document.getElementById('total-price').textContent = `${totalPrice} ₽`;
}

function initEventHandlers() {
    document.querySelectorAll('.dropdown-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                if (content !== this.nextElementSibling) {
                    content.classList.remove('show');
                }
            });
            
            const dropdownContent = this.nextElementSibling;
            dropdownContent.classList.toggle('show');
            
            if (dropdownContent.classList.contains('show')) {
                const selectedItem = dropdownContent.querySelector('.selected');
                if (selectedItem) {
                    selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                }
            }
        });
    });

    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown-btn')) {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.classList.remove('show');
            });
        }
    });
}

window.addEventListener('load', initPage);


