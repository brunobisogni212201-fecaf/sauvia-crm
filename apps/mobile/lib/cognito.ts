import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import * as SecureStore from "expo-secure-store";

// ──────────────────────────────────────────────────────────────
// Configure these in your app.json → expo.extra or .env:
//   EXPO_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
//   EXPO_PUBLIC_COGNITO_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXX
// ──────────────────────────────────────────────────────────────
const poolData = {
  UserPoolId: process.env.EXPO_PUBLIC_COGNITO_USER_POOL_ID ?? "",
  ClientId: process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID ?? "",
};

const userPool = new CognitoUserPool(poolData);

const TOKEN_KEY = "sauvia_jwt_token";
const REFRESH_KEY = "sauvia_refresh_token";

export interface CognitoTokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

/** Authenticate, then persist tokens in SecureStore. */
export async function signIn(email: string, password: string): Promise<CognitoTokens> {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  const authDetails = new AuthenticationDetails({ Username: email, Password: password });

  const tokens = await new Promise<CognitoTokens>((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess(session: CognitoUserSession) {
        resolve({
          idToken: session.getIdToken().getJwtToken(),
          accessToken: session.getAccessToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken(),
        });
      },
      onFailure(err: Error) {
        reject(err);
      },
    });
  });

  await SecureStore.setItemAsync(TOKEN_KEY, tokens.accessToken);
  await SecureStore.setItemAsync(REFRESH_KEY, tokens.refreshToken);

  return tokens;
}

/** Sign out and clear stored tokens. */
export async function signOut(): Promise<void> {
  const user = userPool.getCurrentUser();
  user?.signOut();
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_KEY);
}

/** Read stored access token (returns null if not present). */
export async function getStoredToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}
