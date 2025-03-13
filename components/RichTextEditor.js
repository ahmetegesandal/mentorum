import { useEffect, useState } from "react";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import HardBreak from "@tiptap/extension-hard-break";

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
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "active" : ""}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "active" : ""}
      >
        Strike
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "active" : ""}
      >
        Underline
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setColor("#ff0000").run()}
        className={editor.isActive("color") ? "active" : ""}
      >
        Color
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "active" : ""}
      >
        Ordered List
      </button>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().insertContent("\n").run();
        }}
      >
        New Line
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
          extensions={[Color, TextStyle, ListItem, StarterKit, HardBreak]}
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
