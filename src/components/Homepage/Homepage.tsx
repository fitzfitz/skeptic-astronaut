import { h } from "preact";
import Main from "../../app/layout/Main";
import styles from "./Homepage.module.scss";

function Homepage() {
  return (
    <Main>
      <div class={styles.root}>
        <span class={styles.text}>Fitzgeral</span>
      </div>
    </Main>
  );
}

export default Homepage;
