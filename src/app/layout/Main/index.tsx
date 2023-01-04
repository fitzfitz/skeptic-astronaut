import { h } from "preact";
import type { ComponentChildren } from "preact";
import styles from "./Main.module.scss";

interface Props {
  children: ComponentChildren;
}

export default function Main({ children }: Props) {
  return <main className={styles.root}>{children}</main>;
}
