const ADMIN_PIN = "1234";

// 1. Load Initial Menu or from localStorage
let defaultMenu = [
    { name: 'Masala Chai', price: 20 },
    { name: 'Green Tea', price: 30 },
    { name: 'Hot Cappuccino', price: 50 },
    { name: 'Hot Chocolate', price: 80 },
    { name: 'Classic Cold Coffee', price: 60 },
    { name: 'Thick Choco Coffee', price: 80 },
    { name: 'Cold Coffee w/ Ice Cream', price: 90 },
    { name: 'Oreo Shake', price: 100 },
    { name: 'Blue Lagoon Mojito', price: 80 },
    { name: 'Veg Grilled Sandwich', price: 60 },
    { name: 'Cheese Garlic Sandwich', price: 80 },
    { name: 'Paneer Tandoori Sandwich', price: 90 },
    { name: 'Classic Veg Burger', price: 70 },
    { name: 'Cheese Lava Burger', price: 95 },
    { name: 'Classic Fries', price: 60 },
    { name: 'Peri Peri Fries', price: 80 },
    { name: 'Cheese Corn Pizza', price: 120 },
    { name: 'Margherita Pizza', price: 130 },
    { name: 'White Sauce Pasta', price: 110 }
];

let menuItems = JSON.parse(localStorage.getItem('cafe_menu')) || defaultMenu;
let salesHistory = JSON.parse(localStorage.getItem('cafe_sales')) || [];
let cart = [];

// 2. Render Menu Cards
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

// 3. Admin Panel Control
function toggleAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel.style.display === 'block') {
        adminPanel.style.display = 'none';
        return;
    }

    const enteredPin = prompt("सुरक्षेसाठी ॲडमिन PIN टाका (Default: 1234):");
    if (enteredPin === ADMIN_PIN) {
        adminPanel.style.display = 'block';
        document.getElementById('salesPanel').style.display = 'none';
    } else if (enteredPin !== null) {
        alert("❌ चुकीचा PIN!");
    }
}

function closeAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
}

// 4. Sales History Panel Control
function toggleSalesHistory() {
    const salesPanel = document.getElementById('salesPanel');
    if (salesPanel.style.display === 'block') {
        salesPanel.style.display = 'none';
        return;
    }

    const enteredPin = prompt("हिशोब बघण्यासाठी ॲडमिन PIN टाका:");
    if (enteredPin === ADMIN_PIN) {
        salesPanel.style.display = 'block';
        document.getElementById('adminPanel').style.display = 'none';
        renderSalesHistory();
    } else if (enteredPin !== null) {
        alert("❌ चुकीचा PIN!");
    }
}

function closeSalesPanel() {
    document.getElementById('salesPanel').style.display = 'none';
}

// Render Sales Data
function renderSalesHistory() {
    const historyBody = document.getElementById('salesHistoryBody');
    const totalCount = document.getElementById('totalOrdersCount');
    const totalRev = document.getElementById('totalRevenueAmount');

    historyBody.innerHTML = '';
    let revenueSum = 0;

    salesHistory.forEach((order, index) => {
        revenueSum += parseFloat(order.grandTotal);
        let row = `<tr>
            <td>#${index + 1}</td>
            <td>${order.time}</td>
            <td>₹${order.grandTotal}</td>
        </tr>`;
        historyBody.innerHTML += row;
    });

    totalCount.innerText = salesHistory.length;
    totalRev.innerText = revenueSum.toFixed(2);
}

// Clear Sales History
function clearSalesHistory() {
    if (confirm("तुम्हाला खात्री आहे का? सर्व विक्रीचा डेटा डिलीट होईल.")) {
        salesHistory = [];
        localStorage.setItem('cafe_sales', JSON.stringify(salesHistory));
        renderSalesHistory();
        alert("हिशोब रिसेट झाला आहे!");
    }
}

// 5. Add New Item (Save to localStorage)
function addNewMenuItem() {
    const nameInput = document.getElementById('newItemName');
    const priceInput = document.getElementById('newItemPrice');

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);

    if (name === '' || isNaN(price) || price <= 0) {
        alert('कृपया योग्य नाव आणि किंमत टाका!');
        return;
    }

    menuItems.push({ name, price });
    localStorage.setItem('cafe_menu', JSON.stringify(menuItems));
    loadMenu();

    nameInput.value = '';
    priceInput.value = '';
    alert(`✅ "${name}" जोडला गेला आणि सेव्ह झाला!`);
}

// 6. Cart Management
function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

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
                <div class="qty-controls">
                    <button class="btn-qty" onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn-qty" onclick="addToCart('${item.name}', ${item.price})">+</button>
                </div>
            </td>
            <td>₹${total}</td>
            <td>
                <button class="btn-delete" onclick="removeFromCart(${index})">❌</button>
            </td>
        </tr>`;
        cartBody.innerHTML += row;
    });

    let tax = subtotal * 0.05;
    let grandTotal = subtotal + tax;

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('tax').innerText = tax.toFixed(2);
    document.getElementById('grandTotal').innerText = grandTotal.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

// 7. Complete Order, Save to History & Print
function completeOrderAndPrint() {
    if (cart.length === 0) {
        alert("कार्ट रिकामे आहे!");
        return;
    }

    let subtotal = parseFloat(document.getElementById('subtotal').innerText);
    let tax = parseFloat(document.getElementById('tax').innerText);
    let grandTotal = document.getElementById('grandTotal').innerText;

    let now = new Date();
    let timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Save Order to Sales History
    let orderData = {
        items: [...cart],
        grandTotal: grandTotal,
        time: timeString,
        date: now.toLocaleDateString()
    };

    salesHistory.push(orderData);
    localStorage.setItem('cafe_sales', JSON.stringify(salesHistory));

    // Print Receipt
    window.print();

    // Reset Cart for Next Customer
    cart = [];
    updateCart();
}

window.onload = loadMenu;