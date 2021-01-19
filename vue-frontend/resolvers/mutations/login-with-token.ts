import gql from 'graphql-tag'
export const loginWithToken = gql`
  mutation LoginWithToken($token: String!) {
    loginWithToken(token: $token) {
      user {
        email
        username
      }
    }
  }
`
