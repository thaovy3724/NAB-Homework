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

    const discountAmount = subtotal * discountRate;
    const subtotalAfterDiscount = subtotal - discountAmount;
    const taxAmount = subtotalAfterDiscount * taxRate;
    const total = subtotalAfterDiscount + taxAmount;
    return {
        subtotal: subtotal,
        discountAmount : discountAmount,
        taxAmount: taxAmount,
        total : total
    }
}