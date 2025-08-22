"use client";

import styles from "./PageLoader.module.css";

export default function PageLoader() {
  return (
    <div className="h-screen size-full flex items-center justify-center">
      <div className={styles.page_loading_animation}></div>
    </div>
  );
}
