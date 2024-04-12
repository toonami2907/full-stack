export default function errorHandler (statusCode, message) {
    const error = new Error(message); // Create a new Error object
    error.statusCode = statusCode; // Assign statusCode to error object property
    return error; // Return the error object
}
