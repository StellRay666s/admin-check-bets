import React from "react";
import SunEditor, { buttonList } from "suneditor-react";
import {
  align,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  lineHeight,
  list,
  paragraphStyle,
  table,
  template,
  textStyle,
  image,
  link,
} from "suneditor/src/plugins";
import "suneditor/dist/css/suneditor.min.css";
function Editor({ handleChangeFile, content, setContents, setNewContent }) {
  const editor = React.useRef();
  const [data, setData] = React.useState(content);

  React.useEffect(() => {
    setNewContent(data);
  }, [data]);

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  function handleImageUploadBefore(
    targetImgElement,
    index,
    state,
    imageInfo,
    remainingFilesCount
  ) {}

  return (
    <div>
      <SunEditor
        lang={"en"}
        height="1000px"
        max-width="800px"
        setContents={content}
        onChange={setData}
        setOptions={{
          showPathLabel: false,

          plugins: [
            align,
            font,
            fontColor,
            fontSize,
            formatBlock,
            hiliteColor,
            horizontalRule,
            lineHeight,
            list,
            paragraphStyle,

            template,
            textStyle,
            image,
            link,
          ],
          buttonList: [
            ["undo", "redo"],
            ["font", "fontSize", "formatBlock"],
            ["paragraphStyle"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
            ],
            ["fontColor", "hiliteColor"],
            ["removeFormat"],
            "/", // Line break
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "lineHeight"],
            ["table", "link", "image"],
          ],
        }}
        placeholder="Please type here..."
        getSunEditorInstance={getSunEditorInstance}
      />
      {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
    </div>
  );
}

export default Editor;
