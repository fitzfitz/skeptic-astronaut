import { h } from "preact";
import type { Chats } from "./ChatTypes";
import styles from "./MessageComponent.module.scss";

function MessageComponent({ user, message }: Chats) {
  return (
    <div
      className={`${styles.messageContainer} ${
        user === "HUMAN" ? styles.messageHuman : styles.messageAI
      }`}
    >
      <div className={styles.messageContent}>
        {/* <div className={styles.user}>{user}</div> */}
        <div className={styles.message}>{message.replace(/^\n\n/, "")}</div>
      </div>
    </div>
  );
}

export default MessageComponent;
