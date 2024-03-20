import { HttpService } from '../../common/httpService';
import { ApiResponse } from '../interfaces/common.interfaces';
import { Constants } from '../../enums/constants.common';
import { TokenResponse, UserData } from '../interfaces/common.interfaces';
import { validateNonEmptyParams } from '../helpers/validation.common';
import { handleAuthUrlResponse } from '../../common/response.formate';

/**
 * Service for handling Facebook authentication-related tasks.
 */
export class FacebookAuthService {
    private httpService = new HttpService();

    /**
     * Generates the Facebook login URL based on the provided parameters.
     * @param clientId - The Facebook App ID.
     * @param redirectUri - The redirect URI specified in your Facebook App settings.
     * @returns {string | ApiResponse<any>} - The constructed Facebook login URL or an ApiResponse with an error message.
     */
    generateFacebookAuthUrl(clientId: string, redirectUri: string): any {
        // Validate that client ID and redirect URI are not empty
        const validation = validateNonEmptyParams({ clientId, redirectUri });

        // If validation fails, return the validation result
        if (validation) {
            return validation;
        } else {
            // Construct the Facebook login URL
            const url = `${Constants.FACEBOOK_AUTH_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${Constants.FACEBOOK_AUTH_SCOPE}&response_type=${Constants.FACEBOOK_RESPONSE_TYPE}`;

            // Handle the authentication URL response
            return handleAuthUrlResponse(url);
        }
    }

    /**
     * Retrieves the Facebook access token using the provided authorization code.
     * @param clientId - The Facebook App ID.
     * @param clientSecret - The Facebook App Secret.
     * @param redirectUri - The redirect URI specified in your Facebook App settings.
     * @param code - The authorization code received after successful user login.
     * @returns {Promise<ApiResponse<TokenResponse>> | ApiResponse<any>} - A promise resolving to an ApiResponse containing the Facebook access token or an ApiResponse with an error message.
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
            // Facebook API endpoint for exchanging code for access token
            const tokenEndpoint = `${Constants.FACEBOOK_GRAPH_API}/oauth/access_token`;

            // Construct parameters for the access token request
            const params = new URLSearchParams();
            params.append('client_id', clientId);
            params.append('client_secret', clientSecret);
            params.append('redirect_uri', redirectUri);
            params.append('code', code);

            // Make an HTTP POST request to obtain the Facebook access token
            return this.httpService.post<TokenResponse>(tokenEndpoint, params);
        }
    }

    /**
     * Retrieves user details from Facebook using the provided access token.
     * @param accessToken - The Facebook access token.
     * @returns {Promise<ApiResponse<UserData>> | ApiResponse<any>} - A promise resolving to an ApiResponse containing user details or an ApiResponse with an error message.
     */
    async getUserDetails(accessToken: string): Promise<ApiResponse<UserData>> {
        // Validate that the access token is not empty
        const validation = validateNonEmptyParams({ accessToken });

        // If validation fails, return the validation result
        if (validation) {
            return validation;
        } else {
            // Facebook API endpoint for retrieving user details
            const userDetailsEndpoint = `${Constants.FACEBOOK_GRAPH_API}/me`;

            // Parameters for the user details request
            const params = {
                access_token: accessToken,
                fields: Constants.FACEBOOK_USER_PARAMS,
            };

            // Make an HTTP GET request to fetch user details
            return await this.httpService.get2<UserData>(userDetailsEndpoint, { params });
        }
    }

    /**
     * Retrieves a long-lived Facebook access token using the provided short-lived access token.
     * @param clientId - The Facebook App ID.
     * @param clientSecret - The Facebook App Secret.
     * @param shortLivedAccessToken - The short-lived Facebook access token.
     * @returns {Promise<ApiResponse<UserData>> | ApiResponse<any>} - A promise resolving to an ApiResponse containing the long-lived access token or an ApiResponse with an error message.
     */
    async getLongLivedAccessToken(
        clientId: string,
        clientSecret: string,
        shortLivedAccessToken: string
    ): Promise<ApiResponse<UserData>> {
        // Validate that client ID, client secret, and short-lived access token are not empty
        const validation = validateNonEmptyParams({ clientId, clientSecret, shortLivedAccessToken });

        // If validation fails, return the validation result
        if (validation) {
            return validation;
        } else {
            // Facebook API endpoint for exchanging short-lived token for long-lived token
            const accessTokenExchangeEndpoint = `${Constants.FACEBOOK_GRAPH_API}/oauth/access_token`;

            // Parameters for the access token exchange request
            const params = new URLSearchParams();
            params.append('grant_type', Constants.FACEBOOK_LONGLIVED_GRANT_TYPE);
            params.append('client_id', clientId);
            params.append('client_secret', clientSecret);
            params.append('fb_exchange_token', shortLivedAccessToken);

            // Make an HTTP GET request to exchange tokens and obtain the long-lived access token
            return this.httpService.get2<UserData>(accessTokenExchangeEndpoint, { params });
        }
    }
}
