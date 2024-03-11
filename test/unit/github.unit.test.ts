import { Auth } from "../../src";

// Describe block for testing GitHub Auth Process
describe("GitHub Auth Process", () => {
    // Mock data for testing
    const mockUserId = "abcde1232fssdfdssaasdfd";
    const mockRedirectUri = "https//localhost:300";
    const mockCode = "aabcdjfkxcjdfhnolcvnjorlignjvdofldoli";
    const mockClientSecret = "fdhnfkgnbdDSFBDK";
    const mockAccessToken = "dfndsfnhdcbfudQASAXNCASCXQALSNKZXAOLSXLAJ";

    // Instantiate GitHub Auth object
    let github = Auth.Github;

    // Test case: generateGithubAuthUrl function
    it("should return mock redirect URI in object format", () => {
        // Call the function to generate the GitHub authentication URL
        const url = github.generateGithubAuthUrl(mockUserId, mockRedirectUri);
        // Verify that the result is an instance of an Object
        expect(url).toBeInstanceOf(Object);
    });

    // Test case: getAccessToken function
    it("should return mock access tokens in object format", async () => {
        // Call the function to get the GitHub access token
        const token = await github.getAccessToken(mockCode, mockUserId, mockClientSecret, mockRedirectUri);
        // Verify that the result is an instance of an Object
        expect(token).toBeInstanceOf(Object);
    });

    // Test case: getUserDetails function
    it("should return user details", async () => {
        // Call the function to get user details using the GitHub access token
        const userData = await github.getUserDetails(mockAccessToken);
        // Verify that the result is an instance of an Object
        expect(userData).toBeInstanceOf(Object);
    });
});
