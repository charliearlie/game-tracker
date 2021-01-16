import styles from "../styles/Home.module.css";
import { withApollo } from "../utils/with-apollo";

function Home() {
  return (
    <div className={styles.container}>
      <h2>Hello world</h2>
    </div>
  );
}

export default withApollo({ ssr: true })(Home);
