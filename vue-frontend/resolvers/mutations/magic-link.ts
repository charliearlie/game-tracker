import gql from 'graphql-tag'
export const magicLink = gql`
  mutation MagicLink($usernameOrEmail: String!) {
    magicLink(email: $usernameOrEmail)
  }
`
