import styles from "./InnerLoader.module.css";

export default function InnerLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={styles.spinner}></div>
    </div>
  );
}
