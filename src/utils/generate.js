const generate = {

    numbers(number) {
        let numberArray = [0];
        for (let index = 0; index < (number || 28); index++) {
            numberArray.push(index + 1);
        }
        return numberArray;
    },

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    currentDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`
    },

    dates(offset = 0) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + offset);
        const dates = [];

        for (let i = 0; i <= 4; i++) {
            const nextDate = new Date(currentDate.getTime());
            nextDate.setDate(currentDate.getDate() + i);

            dates.push(
                `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(nextDate.getDate()).padStart(2, '0')}`
            );
        }

        return dates;
    },


    previousHour(type) {
        const currentHour = new Date().getHours();
        const hourList = [
            { id: 1, hour: 7, name: "7:00 AM" },
            { id: 2, hour: 9, name: "9:00 AM" },
            { id: 3, hour: 13, name: "01:00 PM" },
            { id: 4, hour: 16, name: "04:00 PM" },
            { id: 5, hour: 19, name: "07:00 PM" }
        ];

        let previousHour = 1;

        for (const hourObj of hourList) {
            if (currentHour < hourObj.hour) {
                break;
            }

            type === "ID" && (previousHour = hourObj.id)
            type === "NAME" && (previousHour = hourObj.name)
            !type && (previousHour = hourObj.name)
        }
        return previousHour;
    },

    hours() {
        const hoursArray = [
            '7:00 am',
            '9:00 am',
            '1:00 pm',
            '4:00 pm',
            '7:00 pm',
        ];

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
        const currentDay = String(currentDate.getDate()).padStart(2, '0');

        const hoursObjectsArray = hoursArray.map((hour) => {
            const [hourStr, amPm] = hour.split(' ');
            const [hourNum, minutes] = hourStr.split(':');

            let hour24 = parseInt(hourNum, 10);

            if (amPm === 'pm' && hour24 < 12) {
                hour24 += 12;
            } else if (amPm === 'am' && hour24 === 12) {
                hour24 = 0;
            }

            const valueDate = `${currentYear}-${currentMonth}-${currentDay}`;
            return {
                name: hour,
                value: valueDate,
            };
        });
        return hoursObjectsArray;
    },

    hours2() {
        const hoursArray = [
            '07:00:00',
            '09:00:00',
            '13:00:00',
            '16:00:00',
            '19:00:00',
        ];

        return hoursArray
    },

    // Generate a unic code by current hour and random string
    generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    },


    generateUniqueCode() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

        const randomSuffix = this.generateRandomString(5);

        const uniqueCode = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${randomSuffix}`;
        return uniqueCode;
    },
}

export default generate;