function calculateCart(items, discountRate = 0, taxRate = 0.5){
    // validate cart items
    if(!Array.isArray(items)){
        throw new Error("Invalid items. Items must be an array");
    }

    // validate discount rate
    if(typeof discountRate !== "number" || discountRate < 0 || discountRate > 1){
        throw new Error("Invalid discount rate. Discount rate must be a number between 0 and 1");
    }

    // validate taxt rate
    if(typeof taxRate !== "number" || taxRate < 0 || taxRate > 1){
        throw new Error("Invalid tax rate. Tax rate must be a number between 0 and 1");
    }

    let subtotal = 0;
    // calculate subtotal
    for(const item of items){
        // validate item
        if(item.name === "" || typeof item.price !== "number" || typeof item.quantity !== "number"){
            throw new Error("Invalid product: a product need name, price (number) and quantity(number)");
        }

        if(item.price < 0){
            throw new Error("Invalid product's price. Price must be greater than or equal 0");
        }

        if(item.quantity <= 0){
            throw new Error("Invalid quantity. Quantity must be greater than 0");
        }            
        subtotal+=item.price*item.quantity;
    }

    // calculate total
    const discountAmount = subtotal * discountRate;
    const subtotalAfterDiscount = subtotal - discountAmount;
    const taxAmount = subtotalAfterDiscount * taxRate;
    const total = subtotalAfterDiscount + taxAmount;
    return {
        subtotal: subtotal,
        discountAmount : discountAmount,
        taxAmount: taxAmount,
        total : total
    };
}

// Test scenario
// Test 1
console.log("=== Scenario 1: Successfull ===");
try{
    const cart = [
        {name: "Coca", price: 10, quantity: 2},
        {name: "Bread", price: 18, quantity: 1}
    ];
    console.log(calculateCart(cart, 0.1, 0.02));
}catch(error){
    console.error("Error: ", error.message);
}

// Test 2
console.log("=== Scenario 2: Invalide item ===");
try{
    const cart = [
        {name: "Coca", price: -10, quantity: 2},
        {name: "Bread", price: 18, quantity: 1}
    ];
    console.log(calculateCart(cart, 0.1, 0.02));
}catch(error){
    console.error("Error: ", error.message);
}

// Test 3
console.log("=== Scenario 3: Invalide tax ===");
try{
    const cart = [
        {name: "Coca", price: 10, quantity: 2},
        {name: "Bread", price: 18, quantity: 1}
    ];
    console.log(calculateCart(cart, 0.1, 2));
}catch(error){
    console.error("Error: ", error.message);
}