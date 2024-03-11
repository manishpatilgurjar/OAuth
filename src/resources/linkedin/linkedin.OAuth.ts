import { HttpService } from '../../common/httpService';
import { ApiResponse } from '../interfaces/common.interfaces';
import { Constants } from '../../enums/constants.common';
import { TokenResponse, UserData } from '../interfaces/common.interfaces';
import { validateNonEmptyParams } from '../../helpers/validation.common';
import { handleAuthUrlResponse } from '../../common/response.formate';

// Class responsible for handling LinkedIn authentication
export class LinkedinAuthService {
    private httpService = new HttpService();

    /**
     * Generates the LinkedIn authorization URL based on provided parameters.
     * @param clientId - LinkedIn client ID
     * @param redirectUri - Redirect URI after successful LinkedIn authentication
     * @returns LinkedIn authorization URL
     */
    generateLinkedinAuthUrl(clientId: string, redirectUri: string): any {
        // Validate that client ID and redirect URI are not empty
        const validation = validateNonEmptyParams({ clientId, redirectUri });

        // If validation fails, return the validation result
        if (validation) {
            return validation;
        } else {
            // Construct parameters for the LinkedIn authorization URL
            const params = new URLSearchParams({
                client_id: clientId,
                redirect_uri: redirectUri,
                response_type: Constants.LINKEDIN_RESPONSE_TYPE,
                scope: Constants.LINKEDIN_SCOPE,
            });

            // Return the complete LinkedIn authorization URL
            const url = `${Constants.LINKEDIN_AUTH_URL}${params.toString()}`;
            return handleAuthUrlResponse(url)
        }
    }

    /**
     * Retrieves the LinkedIn access token using the authorization code.
     * @param clientId - LinkedIn client ID
     * @param clientSecret - LinkedIn client secret
     * @param redirectUri - Redirect URI used during authorization
     * @param code - Authorization code obtained during the authentication process
     * @returns Promise containing ApiResponse with TokenResponse
     */
    async getAccessToken(
        clientId: string,
        clientSecret: string,
        redirectUri: string,
        code: string
    ): Promise<ApiResponse<TokenResponse>> {
        // Validate that client ID, client secret, redirect URI, and code are not empty
        const validation = validateNonEmptyParams({ clientId, clientSecret, redirectUri, code });

        // If validation fails, return the validation result
        if (validation) {
            return validation;
        } else {
            // Construct parameters for the LinkedIn access token request
            const params = new URLSearchParams({
                grant_type: Constants.LINKEDIN_GRANT_TYPE,
                code,
                redirect_uri: redirectUri,
                client_id: clientId,
                client_secret: clientSecret,
            });

            // Headers for the HTTP POST request
            const headers = {
                'Content-Type': Constants.CONTENT_TYPE,
            };

            // Make an HTTP POST request to obtain the LinkedIn access token
            return this.httpService.post<TokenResponse>(
                Constants.LINKEDIN_ACCESSTOKEN_ENDPOINT,
                params.toString(),
                headers
            );
        }
    }

    /**
     * Retrieves user information from LinkedIn using the provided access token.
     * @param accessToken - LinkedIn access token
     * @returns Promise containing ApiResponse with UserData
     */
    async getUserDetails(accessToken: string): Promise<ApiResponse<UserData>> {
        // Validate that the access token is not empty
        const validation = validateNonEmptyParams({ accessToken });

        // If validation fails, return the validation result
        if (validation) {
            return validation;
        } else {
            // LinkedIn API endpoint for user information retrieval
            const url = Constants.LINKEDIN_USEINFO_ENDPOINT;

            // Headers containing the access token for authorization
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            // Make an HTTP GET request to the LinkedIn API to fetch user data
            return this.httpService.get<UserData>(url, headers);
        }
    }
}
