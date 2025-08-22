"use client";
import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  ReactNode,
} from "react";
import styles from "./Dialog.module.css";

type Props = {
  children: (controls: { close: () => void }) => ReactNode;
};

export type DialogRef = {
  open: () => void;
  close: () => void;
};

const Dialog = forwardRef<DialogRef, Props>(({ children }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  useImperativeHandle(ref, () => ({ open, close }));

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      {children({ close })}
    </dialog>
  );
});

export default Dialog;
