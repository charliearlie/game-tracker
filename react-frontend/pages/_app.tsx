import "../styles/globals.css";
import { withApollo } from "../utils/with-apollo";

function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

export default withApollo({ ssr: false })(MyApp);
