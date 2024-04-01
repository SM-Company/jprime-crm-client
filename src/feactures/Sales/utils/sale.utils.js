const getSubTotal = ({products}) => {
    return products?.map((prod) => (!prod.deleted ? prod?.unit_price * prod?.quantity || 0 : 0)).reduce((subTotal, amount) => subTotal + amount, 0) || 0;
};

const getTaxes = ({amount, taxRate}) => {
    const numericTaxRate = parseFloat(taxRate);
    if (typeof amount !== "number" || isNaN(amount) || typeof numericTaxRate !== "number" || isNaN(numericTaxRate)) return 0;
    const taxes = (amount * numericTaxRate) / 100;
    const roundedTaxes = Math.round(taxes * 100) / 100;
    return roundedTaxes;
};

const getDiscount = ({amount, discountRate}) => {
    const numericDiscountRate = parseFloat(discountRate);
    if (typeof amount !== "number" || isNaN(amount) || typeof numericDiscountRate !== "number" || isNaN(numericDiscountRate)) return 0;
    const discount = (amount * numericDiscountRate) / 100;
    const roundedDiscount = Math.round(discount * 100) / 100;
    return roundedDiscount;
};

const getTotal = ({products, taxRate, discountRate}) => {
    const amount = getSubTotal({products});
    return (amount || 0) + (getTaxes({amount, taxRate}) || 0) - getDiscount({amount, discountRate});
    // return (getSubTotal(products) || 0) + (getTaxes(getSubTotal(products), taxRate) || 0) - getDiscount(getSubTotal(products), discountRate);
};



export { getSubTotal, getTaxes, getDiscount, getTotal }