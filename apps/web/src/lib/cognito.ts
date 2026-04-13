import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

// ──────────────────────────────────────────────────────────────
// Configure these in your .env.local:
//   NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
//   NEXT_PUBLIC_COGNITO_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXX
// ──────────────────────────────────────────────────────────────
const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? "",
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? "",
};

let userPool: CognitoUserPool | null = null;

function getUserPool(): CognitoUserPool {
  if (!poolData.UserPoolId || !poolData.ClientId) {
    throw new Error("Cognito environment variables are not configured.");
  }

  userPool ??= new CognitoUserPool(poolData);
  return userPool;
}

export interface CognitoTokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

/** Authenticate with email + password and return JWT tokens. */
export function signIn(email: string, password: string): Promise<CognitoTokens> {
  const userPool = getUserPool();
  const user = new CognitoUser({ Username: email, Pool: userPool });
  const authDetails = new AuthenticationDetails({ Username: email, Password: password });

  return new Promise((resolve, reject) => {
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
}

/** Sign out the current user (invalidates local session). */
export function signOut(): void {
  const user = getUserPool().getCurrentUser();
  user?.signOut();
}

/** Get the current session if the user has valid tokens. */
export function getCurrentSession(): Promise<CognitoTokens | null> {
  const user = getUserPool().getCurrentUser();
  if (!user) return Promise.resolve(null);

  return new Promise((resolve) => {
    user.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session?.isValid()) {
        resolve(null);
        return;
      }
      resolve({
        idToken: session.getIdToken().getJwtToken(),
        accessToken: session.getAccessToken().getJwtToken(),
        refreshToken: session.getRefreshToken().getToken(),
      });
    });
  });
}
