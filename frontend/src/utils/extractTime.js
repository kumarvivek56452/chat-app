export function extractTime(dateString) {
    const date = new Date(dateString);
    const options = {
        timeZone: 'Asia/Kolkata', // Set timezone to India (IST)
        hour12: false, // Use 24-hour format
        hour: '2-digit',
        minute: '2-digit',
    };
    return date.toLocaleTimeString('en-IN', options);
}