/**
 * Enumeration of constant values used in the application.
 */
export enum Constants {

    // Common Constants
    CONTENT_TYPE ='application/x-www-form-urlencoded',

    // Google Constants
    GMAIL_USER_DATA = "https://www.googleapis.com/oauth2/v3/userinfo",
    GOOGLE_AUTH_URL = "https://oauth2.googleapis.com/token",
    GOOGLE_GRANT_TYPE = "authorization_code",
    GOOGLE_AUTH_SCOPE = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    GOOGLE_RESPONSE_TYPE = "code",
    GOOGLE_ACCESSTYPE = 'offline',
    GOOGLE_PROMPT = 'consent',
    GOOGLE_OAUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth?client_id=",

    // Facebook Constants
    FACEBOOK_AUTH_URL = 'https://www.facebook.com/v12.0/dialog/oauth',
    FACEBOOK_AUTH_SCOPE = 'public_profile',
    FACEBOOK_RESPONSE_TYPE = 'code',
    FACEBOOK_GRAPH_API = 'https://graph.facebook.com/v12.0',
    FACEBOOK_USER_PARAMS = 'id,name,email,picture',
    FACEBOOK_LONGLIVED_GRANT_TYPE = "fb_exchange_token",

    // LinkedIn Constants
    LINKEDIN_RESPONSE_TYPE="code",
    LINKEDIN_SCOPE="openid profile email",
    LINKEDIN_AUTH_URL="https://www.linkedin.com/oauth/v2/authorization?",
    LINKEDIN_ACCESSTOKEN_ENDPOINT= 'https://www.linkedin.com/oauth/v2/accessToken',
    LINKEDIN_USEINFO_ENDPOINT= 'https://api.linkedin.com/v2/userinfo',
    LINKEDIN_GRANT_TYPE='authorization_code',

    // GitHub Constants
    GITHUB_AUTH_URL='https://github.com/login/oauth/authorize?client_id=',
    GITHUB_SCOPE='user',
    GITHUB_ACCESS_TOKEN_ENDPOINT='https://github.com/login/oauth/access_token',
    GITHUB_USER_INFO_ENDPOINT ='https://api.github.com/user',
    GITHUB_ACCEPT ='application/json',
}
