import { useEffect, useState } from "react";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import HardBreak from "@tiptap/extension-hard-break";
import Underline from "@tiptap/extension-underline";

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <div className="toolbar">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "active" : ""}
      >
        <i className="ti ti-bold"></i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "active" : ""}
      >
        <i className="ti ti-italic"></i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "active" : ""}
      >
        <i className="ti ti-strikethrough"></i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "active" : ""}
      >
        <i className="ti ti-underline"></i>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "active" : ""}
      >
        <i className="ti ti-list-numbers"></i>
      </button>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().insertContent("\n").run();
        }}
      >
        <i className="ti ti-plus"></i>
      </button>
    </div>
  );
};

export default function RichTextEditor({ value, onChange }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="richtext-editor">
      {isClient ? (
        <EditorProvider
          slotBefore={<MenuBar />}
          extensions={[Underline, TextStyle, ListItem, StarterKit, HardBreak]}
          content={value}
          onUpdate={({ editor }) => {
            const content = editor.getHTML();
            console.log("Editor İçeriği Güncellendi:", content);
            onChange(content);
          }}
        />
      ) : (
        <p>Yükleniyor...</p>
      )}
    </div>
  );
}
