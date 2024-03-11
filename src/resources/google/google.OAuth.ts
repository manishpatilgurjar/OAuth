import { HttpService } from '../../common/httpService';
import { ApiResponse } from '../interfaces/common.interfaces';
import { Constants } from '../../enums/constants.common';
import { TokenResponse, UserData } from '../interfaces/common.interfaces';
import { validateNonEmptyParams } from '../../helpers/validation.common';
import { handleAuthUrlResponse } from '../../common/response.formate';

/**
 * Class responsible for handling Google authentication.
 */
export class GoogleAuthService {
    private httpService = new HttpService();

    /**
     * Generates the authentication URL for initiating the OAuth process.
     * @param {string} clientId - The client ID obtained from the Google Developer Console.
     * @param {string} redirectUri - The redirect URI where the user will be sent after granting permission.
     * @returns {string | ApiResponse<any>} - The generated authentication URL or an ApiResponse with an error message.
     */
    generateGoogleAuthUrl(clientId: string, redirectUri: string): any {
        // Validate that client ID and redirect URI are not empty
        const validation = validateNonEmptyParams({ clientId, redirectUri });
        
        // If validation fails, return the validation result
        if (validation) {
            return validation;
        } else {
            // Construct the Google authentication URL
            const scope = encodeURIComponent(Constants.GOOGLE_AUTH_SCOPE);
            const responseType = Constants.GOOGLE_RESPONSE_TYPE;
            const accessType = Constants.GOOGLE_ACCESSTYPE;
            const prompt = Constants.GOOGLE_PROMPT;

            const url = `${Constants.GOOGLE_OAUTH_URL}${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}&prompt=${prompt}`;

            // Handle the authentication URL response
            return handleAuthUrlResponse(url);
        }
    }

    /**
     * Exchanges the authorization code for an access token.
     * @param {string} Authcode - The authorization code obtained after the user grants permission.
     * @param {string} clientId - The client ID obtained from the Google Developer Console.
     * @param {string} clientSecret - The client secret obtained from the Google Developer Console.
     * @param {string} redirectUri - The redirect URI used during the authentication process.
     * @returns {Promise<ApiResponse<TokenResponse>> | ApiResponse<any>} - A promise resolving to the token response or an ApiResponse with an error message.
     */
    async getAccessToken( clientId: string, clientSecret: string, redirectUri: string,code: string): Promise<ApiResponse<TokenResponse>> {
        // Validate that authorization code, client ID, client secret, and redirect URI are not empty
        const Authcode=code
        const validation = validateNonEmptyParams({ Authcode, clientId, clientSecret, redirectUri });

        // If validation fails, return the validation result
        if (validation) {
            return validation;
        } else {
            // Construct the Google authentication URL
            const url = Constants.GOOGLE_AUTH_URL;

            // Decode the authorization code
            const code = decodeURIComponent(Authcode);
            const data = {
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: Constants.GOOGLE_GRANT_TYPE,
            };
            const headers = {
                'Content-Type': Constants.CONTENT_TYPE,
            };

            // Make an HTTP POST request to exchange the code for an access token
            return this.httpService.post<TokenResponse>(url, data, headers);
        }
    }

    /**
     * Retrieves user data using the provided access token.
     * @param {string} accessToken - The access token obtained after successful authentication.
     * @returns {Promise<ApiResponse<UserData>> | ApiResponse<any>} - A promise resolving to the user data response or an ApiResponse with an error message.
     */
    async getUserDetails(accessToken: string): Promise<ApiResponse<UserData>> {
        // Validate that the access token is not empty
        const validation = validateNonEmptyParams({ accessToken });

        // If validation fails, return the validation result
        if (validation) {
            return validation;
        } else {
            // Google API endpoint for user data retrieval
            const url = Constants.GMAIL_USER_DATA;
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            // Make an HTTP GET request to fetch user data
            return this.httpService.get<UserData>(url, headers);
        }
    }
}
