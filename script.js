document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    let cartCount = 0;
    let totalAmount = 0;
    
    const cartCountElement = document.getElementById('cart-count');
    const cartModal = document.getElementById('camera-modal');
    const cartItems = document.getElementById('camera-items');
    const totalElement = document.getElementById('total');
    const checkoutButton = document.getElementById('checkout');
    const closeCartButton = document.querySelector('.close-cart');
    const purchaseModal = document.getElementById('purchase-modal');
    const closePurchaseButton = document.getElementById('close-purchase');

    // Agregar productos al carrito
    const addToCartButtons = document.querySelectorAll('.add-to-card');
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.card-productos');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(
                productCard.querySelector('.price').textContent
                    .replace('$', '')      // Eliminar el símbolo de dólar
                    .replace(/\./g, '')    // Eliminar los puntos de los miles
                    .replace(',', '.')     // Reemplazar coma decimal por punto
            );
            
            addToCart(productName, productPrice);
        });
    });

    // Función para añadir productos al carrito
    function addToCart(name, price) {
        cart.push({ name, price });
        cartCount++;
        totalAmount += price;
        
        updateCart();
    }

    // Actualizar el carrito de compras (cantidad y total)
    function updateCart() {
        cartCountElement.textContent = cartCount;
        totalElement.textContent = `Total: $${totalAmount.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
        cartItems.innerHTML = '';

        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
            cartItems.appendChild(listItem);
        });
    }

    // Mostrar el carrito de compras
    document.getElementById('cart-icon').addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    // Cerrar el carrito
    closeCartButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Finalizar compra
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('No hay productos en el carrito.');
            return;
        }

        // Mostrar mensaje de compra finalizada
        cartModal.style.display = 'none';
        purchaseModal.style.display = 'flex';

        // Resetear carrito
        cart = [];
        cartCount = 0;
        totalAmount = 0;
        updateCart();
    });

    // Cerrar mensaje de compra finalizada
    closePurchaseButton.addEventListener('click', () => {
        purchaseModal.style.display = 'none';
    });
});
