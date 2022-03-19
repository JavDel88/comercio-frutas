document.addEventListener('DOMContentLoaded', () => {
    const db = [
        {
            id: 1,
            nombre: 'Manzana lb.',
            precio: 5200,
            imagen: 'assets/apple.jpg'
        },
        {
            id: 2,
            nombre: 'Banano lb.',
            precio: 1500,
            imagen: 'assets/banana.jpg'
        },
        {
            id: 3,
            nombre: 'Naranja lb.',
            precio: 1600,
            imagen: 'assets/orange.jpg'
        },
        {
            id: 4,
            nombre: 'Fresas lb.',
            precio: 4300,
            imagen: 'assets/strawberry.jpg'
        }
    ];

    let carrito = [];
    const divisa = '$';
    const Products = document.getElementById('items');
    const car = document.getElementById('carrito');
    const total = document.getElementById('total');
    const clearButton = document.getElementById('clear');
    const buyButton = document.getElementById('buy')

    function renderizarProductos() {
        db.forEach((item) => {            
            const cardProduct = document.createElement('div');
            cardProduct.classList.add('card');
            
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            
            const cardTitle = document.createElement('h3');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = item.nombre;
            
            const cardImage = document.createElement('img');
            cardImage.setAttribute('src', item.imagen);
            
            const cardPrice = document.createElement('p');
            cardPrice.classList.add('card-text');
            cardPrice.textContent = `${divisa} ${item.precio}`;
          
            const cardAddButton = document.createElement('button');
            cardAddButton.classList.add('btn');
            cardAddButton.textContent = '+ Agregar';
            cardAddButton.setAttribute('marcador', item.id);
            cardAddButton.addEventListener('click', addToCar);
            
            cardBody.appendChild(cardImage);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardPrice);
            cardBody.appendChild(cardAddButton);
            cardProduct.appendChild(cardBody);
            Products.appendChild(cardProduct);
        });
    }

        function addToCar(evento) {
        carrito.push(evento.target.getAttribute('marcador'))        
        renderizarCarrito();
    }

    function renderizarCarrito() {
        car.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];        
        carritoSinDuplicados.forEach((item) => {
            const myItem = db.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });

            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            
            const carItem = document.createElement('li');           
            carItem.textContent = `${numeroUnidadesItem} x ${myItem[0].nombre} - ${divisa} ${myItem[0].precio}`;
            
            const botonBorrar = document.createElement('button');
            botonBorrar.classList.add('btn', 'danger');
            botonBorrar.textContent = 'x';
            botonBorrar.style.marginLeft = '1rem';
            botonBorrar.dataset.item = item;
            botonBorrar.addEventListener('click', borrarItemCarrito);
            
            carItem.appendChild(botonBorrar);
            car.appendChild(carItem);
        });
       
       total.textContent = calcularTotal();
    }

    function borrarItemCarrito(evento) {        
        const id = evento.target.dataset.item;        
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });

        renderizarCarrito();
    }

    function calcularTotal() {        
        return carrito.reduce((total, item) => {
            const miItem = db.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });

            return total + miItem[0].precio;
        }, 0);
    }
    
    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
    }

    function comprar () {
        const totalCompra = calcularTotal();
        alert(`Su compra fue por un total de $ ${totalCompra}`)
        vaciarCarrito();
        renderizarCarrito();
    }

    clearButton.addEventListener('click', vaciarCarrito);
    buyButton.addEventListener('click', comprar);

    
    renderizarProductos();
    renderizarCarrito();
});