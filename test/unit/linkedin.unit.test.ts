import { Auth } from "../../src";

// Describe block for testing LinkedIn Auth Process
describe("LinkedIn Auth Process", () => {
    // Mock data for testing
    const mockUserId = "abcde1232fssdfdssaasdfd";
    const mockRedirectUri = "https//localhost:300";
    const mockCode = "aabcdjfkxcjdfhnolcvnjorlignjvdofldoli";
    const mockClientSecret = "fdhnfkgnbdDSFBDK";
    const mockAccessToken = "dfndsfnhdcbfudQASAXNCASCXQALSNKZXAOLSXAJ";

    // Instantiate LinkedIn Auth object
    let linkedin = Auth.Linkedin;

    // Test case: generateLinkedinAuthUrl function
    it("should return mock redirect URI in object format", () => {
        // Call the function to generate the LinkedIn authentication URL
        const url = linkedin.generateLinkedinAuthUrl(mockUserId, mockRedirectUri);
        // Verify that the result is an instance of an Object
        expect(url).toBeInstanceOf(Object);
    });

    // Test case: getAccessToken function
    it("should return mock access tokens in object format", async () => {
        // Call the function to get the LinkedIn access token
        const token = await linkedin.getAccessToken(mockUserId, mockClientSecret, mockRedirectUri, mockCode);
        // Verify that the result is an instance of an Object
        expect(token).toBeInstanceOf(Object);
    });

    // Test case: getUserDetails function
    it("should return user details", async () => {
        // Call the function to get user details using the LinkedIn access token
        const userData = await linkedin.getUserDetails(mockAccessToken);
        // Verify that the result is an instance of an Object
        expect(userData).toBeInstanceOf(Object);
    });
});
