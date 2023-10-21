import { Card } from "types/data";
import { useEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable"; // Both at the same time
import { DraggableData } from "react-draggable";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default (props: Card) => {
  const fetchExecutor = useRef(undefined as NodeJS.Timeout);
  const [data, setData] = useState({} as DraggableData);
  const [content, setContent] = useState(props.content);

  const editorRef = useRef(undefined as HTMLDivElement);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    document.addEventListener("click", () => setIsFocused(false));
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;
    const toolbar = editorRef.current?.querySelector(
      ".ql-toolbar"
    ) as HTMLElement;
    if (!toolbar) return;
    toolbar.style.display = isFocused ? "block" : "none";
  }, [isFocused]);

  useEffect(() => {
    clearTimeout(fetchExecutor.current);
    if (!Object.keys(data).length) return;
    const updatedCard = {
      id: props.id,
      creationTime: props.creationTime,
      content,
      x: data.x,
      y: data.y,
    } as Card;
    fetchExecutor.current = setTimeout(() => {
      fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCard),
      });
    }, 2000);
  }, [data, content]);

  return (
    <Draggable
      axis="both"
      defaultPosition={{ x: props.x, y: props.y }}
      position={null}
      scale={1}
      onDrag={(_, d) => setData(d)}
      disabled={isFocused}
    >
      <div className="card" tabIndex={1} onFocus={() => setIsFocused(true)}>
        <div onClick={(e) => e.stopPropagation()} ref={editorRef}>
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>
      </div>
    </Draggable>
  );
};
