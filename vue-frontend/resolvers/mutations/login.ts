import gql from 'graphql-tag'
export const login = gql`
  mutation Login($username: String!, $password: String) {
    login(username: $username, password: password) {
      user {
        email
        username
      }
      errors {
        field
        mesage
      }
    }
  }
`