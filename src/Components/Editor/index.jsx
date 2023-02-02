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
function Editor({ handleChangeFile, content = '', setContent, description }) {
  const editor = React.useRef(); 
  console.log(content)

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };
  const [data, setData] = React.useState()

  React.useEffect(()=>{
    // setData(description)
  },[])

  function handleImageUploadBefore(
    targetImgElement,
    index,
    state,
    imageInfo,
    remainingFilesCount
  ) {
    // setImage(imageInfo)
  }

  // React.useEffect(()=>{

  // // if(images != ''){
  // // console.log(window.atob(images?.src))
  // // }
  // },[images])

  React.useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <div>
      <SunEditor
        // appendContents={content}
        onChange={(text) => setContent(text)}
        onImageUpload={handleImageUploadBefore}
        lang={"en"}
        height="1000px"
        max-width="800px"
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
