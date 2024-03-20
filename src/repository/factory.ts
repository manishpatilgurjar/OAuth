// Importing OAuth services from respective modules
import { FacebookAuthService } from "../resources/facebook/facebook.OAuth";
import { GithubAuthService } from "../resources/github/github.OAuth";
import { GoogleAuthService } from "../resources/google/google.OAuth";
import { LinkedinAuthService } from "../resources/linkedin/linkedin.OAuth";

export const  facebook = new FacebookAuthService()
export const github = new GithubAuthService()
export const linkedin= new LinkedinAuthService()
export const google = new GoogleAuthService()
