document.addEventListener('DOMContentLoaded', function () {
    timeleft();
    setInterval(() => {
        timeleft();
    }, 40);
});

function timeleft() {
    let now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth(),
        weekday = now.getDay(),
        day = now.getDate(),
        hour = now.getHours(),
        time = now.getTime(),
        yearLastDigit = year.toString().substring(3);
    
    const msHour = 3600000,
        msDay = 86400000;

    document.querySelectorAll('.f-time').forEach(item => {
        let type = item.dataset.type,
            amount = 0,
            ms = 0,
            start = 0,
            end = 0,
            diff = 0,
            msLeft = 0,
            secondsLeft = 0,
            minutesLeft = 0,
            hoursLeft = 0,
            weeeksLeft = 0,
            monthsLeft = 0;
        
        switch (type) {
            case 'hour':
                start = new Date(year, month, day, hour).getTime();
                end = start + msHour;
                diff = time - start;
                amount = diff / msHour;

                msLeft = Math.round((end - time));
                item.querySelector('.f-time-specs-ms').innerText = numberWithCommas(msLeft);
                secondsLeft = Math.floor((end - time) * 0.001);
                item.querySelector('.f-time-specs-s').innerText = numberWithCommas(secondsLeft);
                minutesLeft = Math.ceil(secondsLeft/60);
                item.querySelector('.f-time-specs-m').innerText = numberWithCommas(minutesLeft);

                break;
            case 'day':
                start = new Date(year, month, day).getTime();
                end = start + msDay;
                diff = time - start;
                amount = diff / msDay;

                secondsLeft = Math.round((end - time) * 0.001);
                item.querySelector('.f-time-specs-s').innerText = numberWithCommas(secondsLeft);
                minutesLeft = Math.round(secondsLeft / 60);
                item.querySelector('.f-time-specs-m').innerText = numberWithCommas(minutesLeft);
                hoursLeft = Math.round(minutesLeft / 60);
                item.querySelector('.f-time-specs-h').innerText = numberWithCommas(hoursLeft);

                break;
            case 'week':
                if ( weekday == 1 ) {
                    start = new Date(year, month, day).getTime();
                } else if ( weekday == 0 ) {
                    let monday = day - 6;
                    if (monday >= 0) {
                        start = new Date(year, month, monday).getTime();
                    } else {
                        start = new Date(year, month).getTime() - (msDay * (monday * -1));
                    }
                } else {
                    let monday = day - weekday + 1;
                    if (monday >= 0) {
                        start = new Date(year, month, monday).getTime();
                    } else {
                        start = new Date(year, month).getTime() - (msDay * (monday * -1));
                    }
                }
                end = start + (msDay * 7);
                diff = time - start;
                amount = diff / (end - start);

                secondsLeft = Math.round((end - time) * 0.001);
                minutesLeft = Math.round(secondsLeft / 60);
                item.querySelector('.f-time-specs-m').innerText = numberWithCommas(minutesLeft);
                hoursLeft = Math.round(minutesLeft / 60);
                item.querySelector('.f-time-specs-h').innerText = numberWithCommas(hoursLeft);
                daysLeft = Math.floor(hoursLeft / 24);
                item.querySelector('.f-time-specs-d').innerText = numberWithCommas(daysLeft);

                break;
            case 'month':
                start = new Date(year, month).getTime();
                if ( month == 11 ) {
                    end = new Date((year + 1), 0).getTime();
                } else {
                    end = new Date(year, (month + 1)).getTime();
                }
                diff = time - start;
                amount = diff / (end - start);

                secondsLeft = Math.round((end - time) * 0.001);
                minutesLeft = Math.round(secondsLeft / 60);
                item.querySelector('.f-time-specs-m').innerText = numberWithCommas(minutesLeft);
                hoursLeft = Math.round(minutesLeft / 60);
                item.querySelector('.f-time-specs-h').innerText = numberWithCommas(hoursLeft);
                daysLeft = Math.floor(hoursLeft / 24);
                item.querySelector('.f-time-specs-d').innerText = numberWithCommas(daysLeft);

                break;
            case 'year':
                if (year % 4 === 0 ) {
                    days = 366;
                } else {
                    days = 365;
                }
                start = new Date(year, 0).getTime();
                end = new Date(year + 1, 0).getTime();
                diff = time - start;
                amount = diff / (end - start);

                secondsLeft = Math.round((end - time) * 0.001);
                minutesLeft = Math.round(secondsLeft / 60);
                hoursLeft = Math.round(minutesLeft / 60);
                daysLeft = Math.floor(hoursLeft / 24);
                item.querySelector('.f-time-specs-d').innerText = numberWithCommas(daysLeft);
                weeksLeft = Math.floor(daysLeft / 7);
                item.querySelector('.f-time-specs-w').innerText = numberWithCommas(weeksLeft);
                monthsLeft = Math.floor(daysLeft / 30);
                item.querySelector('.f-time-specs-mo').innerText = numberWithCommas(monthsLeft);

                break;
            case 'decade':
                if (yearLastDigit == 1 ) {
                    start = new Date(year, 0).getTime();
                    end = new Date((year + 10), 0).getTime();
                } else if (yearLastDigit == 0) {
                    start = new Date((year - 9), 0).getTime();
                    end = new Date((year + 1), 0).getTime();
                } else {
                    start = new Date((year - (yearLastDigit - 1)), 0).getTime();
                    end = new Date((year + (11 - yearLastDigit)), 0).getTime();
                }
                diff = time - start;
                amount = diff / (end - start);
                break;
            case 'century':
                start = new Date(2001, 0).getTime();
                end = new Date(2101, 0).getTime();
                diff = time - start;
                amount = diff / (end - start);
                break;
            case 'millenium':
                start = new Date(2001, 0).getTime();
                end = new Date(3001, 0).getTime();
                diff = time - start;
                amount = diff / (end - start);
                break;
        }

        let percentage = Math.floor(amount * 100);
        if (percentage !== 'undefined') {
            item.querySelector('.f-time-percentage').innerText = percentage;

            // circular progress
            var circleAmount = 76 / 100 * percentage;
            item.querySelector('.f-time-circle-progress').style.strokeDashoffset = (566 - circleAmount) + 'px';

            // bar progrss
            item.querySelector('.a-progress-line').style.width = percentage + '%';
        }
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}