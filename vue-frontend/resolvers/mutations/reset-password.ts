import gql from 'graphql-tag'

export const forgotPassword = gql`
  mutation ResetPassword($email: String!) {
    forgotPassword(email: $email)
  }
`
