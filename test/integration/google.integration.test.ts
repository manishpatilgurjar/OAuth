import {google} from "../../src";

// Describe block for integration testing of Google Auth Process
describe("Integration Testing: Google Auth Process", () => {
    // Mock data for testing
    const mockClientId = "abcde1232fssdfdssaasdfd";
    const mockRedirectUri = "https//localhost:300";
    const mockCode = "aabcdjfkxcjdfhnolcvnjorlignjvdofldoli";
    const mockClientSecret = "fdhnfkgnbdDSFBDK";
    const mockAccessToken = "dfndsfnhdcbfudQASAXNCASCXQALSNKZXAOLSXLAJ";


    // Test case: Complete Google Auth process
    it("should complete the Google Auth process and return necessary data", async () => {
        try {
            // Step 1: Generate Google authentication URL
            const authUrl = google.generateGoogleAuthUrl(mockClientId, mockRedirectUri);
            // Verify that the authentication URL is an instance of an Object
            expect(authUrl).toBeInstanceOf(Object);

            // Step 2: Simulate user interaction and obtain authorization code

            // Step 3: Get Google access token using the obtained authorization code
            const accessToken = await google.getAccessToken(
                mockCode,
                mockClientId,
                mockClientSecret,
                mockRedirectUri
            );
            // Verify that the access token is an instance of an Object
            expect(accessToken).toBeInstanceOf(Object);

            // Step 4: Get user details using the obtained access token
            const userDetails = await google.getUserDetails( mockAccessToken);
            // Verify that user details are an instance of an Object
            expect(userDetails).toBeInstanceOf(Object);

            // Additional assertions can be added as needed
        } catch (error) {
            // Handle any errors that may occur during the process
            console.error("Integration test error:", error);
            throw error;
        }
    });
});
