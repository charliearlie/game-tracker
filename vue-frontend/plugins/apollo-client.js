import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-fetch'
const isBrowser = typeof window !== 'undefined'

export default function (context) {
  return {
    connectToDevTools: isBrowser,
    credentials: 'include',
    ssrMode: !isBrowser,
    defaultHttpLink: false,
    link: createHttpLink({
      uri: 'http://localhost:7777/graphql',
      credentials: 'include',
      fetch: (uri, options) => {
        return fetch(uri, options)
      },
    }),
  }
}
