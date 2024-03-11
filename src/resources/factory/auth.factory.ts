import { FacebookAuthService } from '../facebook/facebook.OAuth';
import { GithubAuthService } from '../github/github.OAuth';
import { GoogleAuthService } from '../google/google.OAuth';
import { LinkedinAuthService } from '../linkedin/linkedin.OAuth';

/**
 * Factory class for creating instances of various OAuth services.
 */
export class AuthFactory {
    /**
     * Creates an instance of FacebookAuthService.
     * @returns {FacebookAuthService} - An instance of the FacebookAuthService.
     */
    static createFacebookAuthService(): FacebookAuthService {
        return new FacebookAuthService();
    }

    /**
     * Creates an instance of GoogleAuthService.
     * @returns {GoogleAuthService} - An instance of the GoogleAuthService.
     */
    static createGoogleAuthService(): GoogleAuthService {
        return new GoogleAuthService();
    }

    /**
     * Creates an instance of LinkedinAuthService.
     * @returns {LinkedinAuthService} - An instance of the LinkedinAuthService.
     */
    static createLinkedinAuthService(): LinkedinAuthService {
        return new LinkedinAuthService();
    }

    /**
     * Creates an instance of GithubAuthService.
     * @returns {GithubAuthService} - An instance of the GithubAuthService.
     */
    static createGithubAuthService(): GithubAuthService {
        return new GithubAuthService();
    }
}
