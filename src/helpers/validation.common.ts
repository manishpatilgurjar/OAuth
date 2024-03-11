import { Messages } from "../enums/messages.common";

/**
 * Checks whether a string value is null, undefined, or empty after trimming.
 * @param value - The string value to check.
 * @returns A boolean indicating whether the value is null, undefined, or empty after trimming.
 */
function isNullOrEmpty(value: string | undefined | null): boolean {
    return value === undefined || value === null || value.trim() === '';
}

/**
 * Validates that specified parameters in the provided object are not null, undefined, or empty.
 * @param fields - An object containing parameter names and their corresponding values.
 * @returns If any parameter is empty, returns an error object with status code, status text, and null data.
 *          If all parameters are non-empty, returns null.
 */
export function validateNonEmptyParams(fields: { [fieldName: string]: string | undefined | null }) {
    // Array to store names of empty parameters
    const emptyFields: string[] = [];

    // Iterate through each parameter in the fields object
    for (const fieldName in fields) {
        const value = fields[fieldName];

        // Check if the parameter is empty using the isNullOrEmpty function
        if (isNullOrEmpty(value)) {
            // If empty, add the parameter name to the emptyFields array
            emptyFields.push(fieldName);
        }
    }

    // Check if any parameters are empty
    if (emptyFields.length > 0) {
        // If there are empty parameters, construct an error message
        const errorMessage = `${Messages.EMPTY_FIELDS} ${emptyFields.join(', ')}.`;

        // Return an error object with status code, status text, and null data
        return {
            statusCode: 422,
            statusText: errorMessage,
            data: null,
        };
    }

    // If all parameters are non-empty, return null
    return null;
}
