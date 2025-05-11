import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
  UserPoolId: "us-east-1_bCEpkWLCD", // replace if your pool ID is different
  ClientId: "1kcrkmlinhtg5qqdu1vf1ejck7", // your actual app client ID
}

export const userPool = new CognitoUserPool(poolData)
