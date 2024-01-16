const format = {
    formatHour(hourString) {
        if (!hourString) {
            return
        }
        const [hour, minute] = hourString.split(":").map(Number);
        const ampm = hour < 12 ? "AM" : "PM";
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        return `${formattedHour}:${minute < 10 ? "0" : ""}${minute} ${ampm}`;
    },

    price(price) {
        const formattedPrice = price?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        });

        return formattedPrice;
    },

    percentage(number) {
        const numberValue = parseFloat(number);
        if (!isNaN(numberValue)) return `${numberValue.toFixed(1)}%`;
        return '0.0%';
    }
}

export default format;