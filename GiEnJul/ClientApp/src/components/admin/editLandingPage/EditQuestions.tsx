import * as React from 'react';


import MUIRichTextEditor from 'mui-rte'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';




const EditQuestions = () => {
    const [ editorState, setEditorState ] = useState<EditorState>(EditorState.createEmpty());
    const [ content, setContent ] = useState<String>('');

    const handleSave = (data: string) => {
        // setEditorState(data)
        // console.log(data);

    }

    return (
            <MUIRichTextEditor
            value ={editorState}
            >

            </MUIRichTextEditor>

    );


        
      



}

export default EditQuestions;