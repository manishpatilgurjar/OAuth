This codebase provides a comprehensive solution for handling authentication with various social media platforms, including Facebook, GitHub, LinkedIn, and Google. It is structured around service classes for each platform, each encapsulating the logic for generating authentication URLs, exchanging authorization codes for access tokens, and retrieving user details. The code leverages a common `HttpService` for making HTTP requests and relies on a set of constants and interfaces for configuration and data structure.

 ### Setup

1. **Installation**: Install the package using npm or yarn:
   ```
   npm install oauth
   ```
   or
   ```
   yarn add oauth
   ```

### Key Features:

- **Modular Design**: Each service class is responsible for a specific platform, promoting separation of concerns and making the codebase easier to maintain and extend.
- **Validation**: Utilizes a `validateNonEmptyParams` function to ensure that required parameters are not empty before proceeding with API calls.
- **URL Construction**: Dynamically constructs authentication URLs and access token request parameters based on provided configuration and platform-specific constants.
- **HTTP Requests**: Uses the `HttpService` to make HTTP requests, abstracting the details of the HTTP client used.
- **Error Handling**: Returns `ApiResponse` objects that can represent either successful responses or errors, providing a consistent interface for handling responses.

### Services Overview:

- **FacebookAuthService**: Handles Facebook authentication, including generating the login URL, exchanging authorization codes for access tokens, and retrieving user details.
- **GithubAuthService**: Manages GitHub authentication, with functionalities for generating the GitHub authentication URL, obtaining access tokens, and fetching user data.
- **LinkedinAuthService**: Responsible for LinkedIn authentication, offering methods to generate the LinkedIn authorization URL, exchange authorization codes for access tokens, and retrieve user information.
- **GoogleAuthService**: Provides functionality for Google authentication, including generating the Google authentication URL, exchanging authorization codes for access tokens, and fetching user data.

### Usage:

To use these services, instantiate the desired service class and call its methods with the appropriate parameters. For example, to generate a Facebook login URL:

```javascript
const facebookAuthService = new FacebookAuthService();
const loginUrl = OAuth.facebook.generateFacebookAuthUrl(clientId, redirectUri);
```



### Dependencies:

- `HttpService`: A custom HTTP client for making requests.
- `ApiResponse`: An interface for standardizing API response objects.
- `Constants`: An enumeration of constants used across the services, such as API endpoints and scopes.
- `TokenResponse` and `UserData`: Interfaces for structuring the responses from the authentication and user data retrieval methods.
- `validateNonEmptyParams`: A utility function for validating that required parameters are not empty.
- `handleAuthUrlResponse`: A utility function for formatting authentication URLs.

This codebase is designed to be integrated into applications requiring social media authentication, providing a robust and modular solution for handling OAuth flows with minimal boilerplate.