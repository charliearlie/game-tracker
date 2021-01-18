import gql from 'graphql-tag'

export const register = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      options: { username: $username, email: $email, password: $password }
    ) {
      user {
        id
        email
      }
      errors {
        message
      }
    }
  }
`
