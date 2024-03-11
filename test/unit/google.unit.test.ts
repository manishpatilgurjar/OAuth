import { Auth } from "../../src";

// Describe block for testing Google Auth Process
describe("Google Auth Process", () => {
    // Mock data for testing
    const mockClientId = "abcde1232fssdfdssaasdfd";
    const mockRedirectUri = "https//localhost:300";
    const mockCode = "aabcdjfkxcjdfhnolcvnjorlignjvdofldoli";
    const mockClientSecret = "fdhnfkgnbdDSFBDK";
    const mockAccessToken = "dfndsfnhdcbfudQASAXNCASCXQALSNKZXAOLSXLAJ";

    // Instantiate Google Auth object
    let google = Auth.Google;

    // Test case: generateGoogleAuthUrl function
    it("should return mock redirect URI in object format", () => {
        // Call the function to generate the Google authentication URL
        const url = google.generateGoogleAuthUrl(mockClientId, mockRedirectUri);
        // Verify that the result is an instance of an Object
        expect(url).toBeInstanceOf(Object);
    });

    // Test case: getAccessToken function
    it("should return mock access tokens in object format", async () => {
        // Call the function to get the Google access token
        const token = await google.getAccessToken(mockCode, mockClientId, mockClientSecret, mockRedirectUri);
        // Verify that the result is an instance of an Object
        expect(token).toBeInstanceOf(Object);
    });

    // Test case: getUserDetails function
    it("should return user details", async () => {
        // Call the function to get user details using the Google access token
        const userData = await google.getUserDetails(mockAccessToken);
        // Verify that the result is an instance of an Object
        expect(userData).toBeInstanceOf(Object);
    });
});
