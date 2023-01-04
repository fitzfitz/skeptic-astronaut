import { h, Fragment } from "preact";
import type { FunctionComponent } from "preact";
import { signal } from "@preact/signals";
import { useEffect, useRef, useState } from "preact/hooks";
import { Send } from "lucide-preact";
import type { Chats } from "./ChatTypes";
import MessageComponent from "./MessageComponent";
import imageLoad from "../../assets/svg/loader.svg";
import styles from "./ChatBox.module.scss";

const ChatBox: FunctionComponent = () => {
  const chatBoxRef = useRef(null);
  const message = signal<string>("");
  const [chats, setChats] = useState<Chats[]>([]);
  const [load, setLoad] = useState<boolean>(false);

  const submitData = (e: Event) => {
    e.preventDefault();
    if (load) {
      return;
    }

    const chatList = [
      ...chats,
      { id: chats?.length + 1, user: "HUMAN", message: message.value },
    ] as Chats[];

    message.value = "";
    setChats(chatList);
    fetchData(chatList);
    setLoad(true);
  };

  const fetchData = async (chatList: Chats[]) => {
    const baseUrl = "http://localhost:5000";
    // const baseUrl = "https://fitzai.themonograf.com";

    await fetch(`${baseUrl}/ask-fitz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chats: chatList }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.result && result?.result !== "") {
          setChats((prev) => [
            ...prev,
            { id: prev?.length + 1, user: "AI", message: result?.result || "" },
          ]);
        }
      })
      .finally(() => {
        setLoad(false);
      });
  };

  useEffect(() => {
    if (chatBoxRef?.current) {
      (chatBoxRef?.current as HTMLDivElement).addEventListener(
        "DOMNodeInserted",
        (event: Event) => {
          const { currentTarget: target } = event;
          (target as HTMLDivElement)?.scroll({
            top: (target as HTMLDivElement)?.scrollHeight,
            behavior: "smooth",
          });
        }
      );
    }
  }, []);

  return (
    <>
      <div className={styles.chatBox}>
        <div className={styles.chatBoxBody}>
          <div className={styles.chatBoxHeader}></div>
          <div ref={chatBoxRef} className={styles.chatBoxContent}>
            {chats
              .filter((chat) => chat.message.trim() && chat.message !== "")
              .map((chat) => (
                <MessageComponent key={chat.id} {...chat} />
              ))}
            {load ? <img src={imageLoad} width={30} /> : null}
          </div>
        </div>
        <div className={styles.chatBoxForm}>
          <form onSubmit={submitData} className={styles.formInput}>
            <input
              id="input"
              name="message"
              value={message.value}
              onChange={(e: Event) =>
                (message.value = (e.target as HTMLInputElement).value)
              }
              type="text"
            />
            <button type={"submit"} className={styles.buttonSend}>
              <Send size={16} color={"var(--color-main-black)"} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
