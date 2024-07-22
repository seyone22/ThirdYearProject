function getFormattedTimestamp() {
    const date = new Date();
    const dateISO = date.toISOString();

    const options = {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    const dateFormatted = new Intl.DateTimeFormat('en-US', options).format(date);

    return {
        date,
        dateISO,
        dateFormatted
    };
}

export default getFormattedTimestamp;