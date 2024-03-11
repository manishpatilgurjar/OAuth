import { Auth } from "../../src";

// Describe block for testing Facebook Auth process
describe("Facebook Auth process", () => {
    // Mock data for testing
    const mockUserId = "abcde1232fssdfdssaasdfd";
    const mockRedirectUri = "https//localhost:300";
    const mockCode = "aabcdjfkxcjdfhnolcvnjorlignjvdofldoli";
    const mockClientSecret = "fdhnfkgnbdDSFBDK";
    const mockAccessToken = "dfndsfnhdcbfudQASAXNCASCXQALSNKZXAOLSXLAJ";
    const shortLivedAccessToken = "dkjbhdkbgdaisudhskbckdagcbccAUDdfgvhkdBSDJSK343rew";

    // Instantiate Facebook Auth object
    let facebook = Auth.Facebook;

    // Test case: getFacebookLoginUrl function
    it("should return mock redirect URI in object format", () => {
        // Call the function to get the Facebook login URL
        const url = facebook.generateFacebookAuthUrl(mockUserId, mockRedirectUri);
        // Verify that the result is an instance of an Object
        expect(url).toBeInstanceOf(Object);
    });

    // Test case: getAccessToken function
    it("should return mock access tokens in object format", async () => {
        // Call the function to get the Facebook access token
        const token = await facebook.getAccessToken(mockUserId, mockClientSecret, mockRedirectUri, mockCode);
        // Verify that the result is an instance of an Object
        expect(token).toBeInstanceOf(Object);
    });

    // Test case: getUserDetails function
    it("should return user details", async () => {
        // Call the function to get user details using the Facebook access token
        const userData = await facebook.getUserDetails(mockAccessToken);
        // Verify that the result is an instance of an Object
        expect(userData).toBeInstanceOf(Object);
    });

    // Test case: getLongLivedAccessToken function
    it("should return long-lived access token", async () => {
        // Call the function to get the long-lived Facebook access token
        const longLivedToken = await facebook.getLongLivedAccessToken(mockUserId, mockClientSecret, shortLivedAccessToken);
        // Verify that the result is an instance of an Object
        expect(longLivedToken).toBeInstanceOf(Object);
    });
});
