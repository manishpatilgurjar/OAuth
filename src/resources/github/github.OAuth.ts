// Import necessary modules and interfaces
import { HttpService } from '../../common/httpService';
import { ApiResponse } from '../interfaces/common.interfaces';
import { Constants } from '../../enums/constants.common';
import { TokenResponse, UserData } from '../interfaces/common.interfaces';
import { validateNonEmptyParams } from '../helpers/validation.common';
import { handleAuthUrlResponse } from '../../common/response.formate';

// Class for handling GitHub authentication-related functionality
export class GithubAuthService {
    // Private instance of the HttpService class for making HTTP requests
    private httpService = new HttpService();

    /**
     * Generates the GitHub authentication URL for user authorization.
     * @param clientId - The GitHub client ID.
     * @param redirectUri - The redirect URI after authorization.
     * @returns The generated GitHub authentication URL.
     */
    generateGithubAuthUrl(clientId: string, redirectUri: string): any {
        // Validate that client ID and redirect URI are not empty
        const validation = validateNonEmptyParams({ clientId, redirectUri })
        if (validation) {
            return validation;
        } else {
            // Construct the GitHub authentication URL
            const url = `${Constants.GITHUB_AUTH_URL}${clientId}&redirect_uri=${redirectUri}&scope=${Constants.GITHUB_SCOPE}`;
            // Return the formatted URL
            return handleAuthUrlResponse(url);
        }
    }

    /**
     * Obtains the GitHub access token using the provided code and authentication details.
     * @param code - The code obtained after user authorization.
     * @param clientId - The GitHub client ID.
     * @param clientSecret - The GitHub client secret.
     * @param redirectUri - The redirect URI used during authorization.
     * @returns A promise containing the API response with the GitHub access token.
     */
    async getAccessToken( clientId: string, clientSecret: string, redirectUri: string,code: string): Promise<ApiResponse<TokenResponse>> {
        // Validate that client ID, client secret, redirect URI, and code are not empty
        const validation = validateNonEmptyParams({ clientId, clientSecret, redirectUri, code });

        // If validation fails, return the validation result
        if (validation) {
            return validation;
        } else {
            // Prepare parameters for the GitHub access token request
            const params = {
                client_id: clientId,
                client_secret: clientSecret,
                code,
                redirect_uri: redirectUri,
            };
            // Define headers for the HTTP request
            const headers = {
                Accept:Constants.GITHUB_ACCEPT,
            };
            // Make an HTTP POST request to obtain the GitHub access token
            return this.httpService.post<TokenResponse>(Constants.GITHUB_ACCESS_TOKEN_ENDPOINT, params, headers);
        }
    }

    /**
     * Retrieves user data from GitHub using the provided access token.
     * @param accessToken - The GitHub access token.
     * @returns A promise containing the API response with user data.
     */
    async getUserDetails(accessToken: string): Promise<ApiResponse<UserData>> {
        // Validate that the access token is not empty
        const validation = validateNonEmptyParams({ accessToken });
        // If validation fails, return the validation result
        if (validation) {
            return validation;
        } else {
            // Prepare headers for the HTTP request with the access token
            const params = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            // Make an HTTP GET request to obtain user data from GitHub
            return this.httpService.get2<UserData>(Constants.GITHUB_USER_INFO_ENDPOINT, params);
        }
    }
}
