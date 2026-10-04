// 1. Initial Menu Items List
let menuItems = [
    { name: 'कोल कॉफी', price: 60 },
    { name: 'मसाला चहा', price: 20 },
    { name: 'व्हेज बर्गर', price: 90 },
    { name: 'चीज सँडविच', price: 80 },
    { name: 'फ्रेंच फ्राईज', price: 70 },
    { name: 'कोल ड्रिंक', price: 40 }
];

let cart = [];

// 2. Menu Screen Render करणे
function loadMenu() {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;
    
    menuGrid.innerHTML = '';

    menuItems.forEach(item => {
        const cardHTML = `
            <div class="card" onclick="addToCart('${item.name}', ${item.price})">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
            </div>
        `;
        menuGrid.innerHTML += cardHTML;
    });
}

// 3. Admin Form द्वारे नवीन आयटम जोडणे
function addNewMenuItem() {
    const nameInput = document.getElementById('newItemName');
    const priceInput = document.getElementById('newItemPrice');

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);

    if (name === '' || isNaN(price) || price <= 0) {
        alert('कृपया योग्य आयटमचे नाव आणि किंमत टाका!');
        return;
    }

    menuItems.push({ name, price });
    loadMenu();

    nameInput.value = '';
    priceInput.value = '';
}

// 4. Cart मध्ये आयटम जोडणे
function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

// 5. Cart आणि Bill अपडेट करणे (Action & Remove बटनसह)
function updateCart() {
    let cartBody = document.getElementById('cartBody');
    if (!cartBody) return;

    cartBody.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        let total = item.price * item.quantity;
        subtotal += total;

        let row = `<tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>
                <button class="btn-qty" onclick="decreaseQuantity(${index})">-</button>
                <span style="margin: 0 6px;">${item.quantity}</span>
                <button class="btn-qty" onclick="addToCart('${item.name}', ${item.price})">+</button>
            </td>
            <td>₹${total}</td>
            <td>
                <button class="btn-delete" onclick="removeFromCart(${index})">❌</button>
            </td>
        </tr>`;
        cartBody.innerHTML += row;
    });

    let tax = subtotal * 0.05; // 5% GST
    let grandTotal = subtotal + tax;

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('tax').innerText = tax.toFixed(2);
    document.getElementById('grandTotal').innerText = grandTotal.toFixed(2);
}

// 6. आयटम पूर्णपणे रिमूव्ह करणे (Deselect / Remove)
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// 7. प्रमाण १ ने कमी करणे
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

// Page load झाल्यावर मेनू लोड करा
window.onload = loadMenu;