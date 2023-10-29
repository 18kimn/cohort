import { useRef, useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default ({ setCards }) => {
  const [content, setContent] = useState("");
  const dialogRef = useRef(undefined as HTMLDialogElement);

  async function insertCard() {
    const newCard = {
      creationTime: new Number(new Date()),
      content,
      x: Math.max(Math.random() * innerWidth - 300, 0),
      y: Math.max(Math.random() * innerHeight - 300, 0),
    };
    // first send a POST query and get the ID of the card
    const result = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    }).then((res) => res.json());

    // then update top list via setCards
    setCards((cards) => [...cards, { ...newCard, id: result.lastInsertRowid }]);

    // then close dialog
    dialogRef.current.close();
  }

  return (
    <>
      <button id="insert" onClick={() => dialogRef.current.showModal()}>
        insert new card
      </button>
      <dialog
        ref={dialogRef}
        onClick={() => {
          dialogRef.current.close();
        }}
      >
        <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
          <ReactQuill theme="snow" value={content} onChange={setContent} />
          <button onClick={insertCard}>Submit</button>
          <button onClick={() => dialogRef.current.close()}>Cancel</button>
        </div>
      </dialog>
    </>
  );
};
