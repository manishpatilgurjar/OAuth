// interfaces.ts

/**
 * Represents the response structure when exchanging an authorization code for an access token.
 */
export interface TokenResponse {
    access_token: string;        // The access token used to authenticate requests.
    refresh_token?: string;      // Optional: A refresh token that can be used to obtain a new access token.
    expires_in: number;          // The duration (in seconds) for which the access token is valid.
    token_type: string;          // The type of token. Typically, "Bearer".
}

/**
 * Represents user data obtained from Google after successful authentication.
 */
export interface UserData {
    sub: string;                 // Unique identifier for the user.
    name: string;                // Full name of the user.
    given_name: string;          // The given (first) name of the user.
    family_name: string;         // The family (last) name of the user.
    picture: string;             // URL of the user's profile picture.
    email: string;               // Email address of the user.
    email_verified: boolean;     // Indicates whether the user's email has been verified by Google.
    locale: string;              // The user's preferred locale.
}


/**
 * Represents the structure of an API response, including status information and data.
 * @template T - The type of data contained in the API response.
 */
export interface ApiResponse<T> {
    statusCode: number;    // HTTP status code of the API response.
    statusText: string;    // HTTP status text of the API response.
    data: T | null;        // The data payload of the API response, or null if no data is present.
}
