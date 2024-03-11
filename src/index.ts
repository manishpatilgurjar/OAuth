import { AuthFactory } from "./resources/factory/auth.factory";

/**
 * Auth object that provides various authentication services.
 */
export const Auth = {
    /**
     * Facebook authentication service.
     * @returns {Object} An instance of the Facebook authentication service.
     */
    Facebook: AuthFactory.createFacebookAuthService(),

    /**
     * Google authentication service.
     * @returns {Object} An instance of the Google authentication service.
     */
    Google: AuthFactory.createGoogleAuthService(),

    /**
     * LinkedIn authentication service.
     * @returns {Object} An instance of the LinkedIn authentication service.
     */
    Linkedin: AuthFactory.createLinkedinAuthService(),

    /**
     * GitHub authentication service.
     * @returns {Object} An instance of the GitHub authentication service.
     */
    Github: AuthFactory.createGithubAuthService(),
};
