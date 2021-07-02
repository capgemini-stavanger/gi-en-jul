import * as React from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { FormGroup } from '@material-ui/core';

type Props = {
    step: Number,
    howState: EditorState
    setHowState: (input: EditorState) => void,
}


const EditHow: React.FC<Props> =({step, howState, setHowState}) => {
    // const [title, setTitle] = useState<string>('');
    // const [picture, setPicture] = useState<string>('');
    const [content, setContent] = useState<string>('');

    // const [saving, setSaving] = useState<boolean>(false);
    if(step === 1){
    return(
        <FormGroup>
                        <Editor
                            editorState={howState}
                            wrapperClassName="card"
                            editorClassName="card-body"
                            onEditorStateChange={newState => {
                                setHowState(newState);
                                setContent(draftToHtml(convertToRaw(newState.getCurrentContent())))
                                ;
                            }}
                            toolbar={{
                                options: ['inline', 'list',  'embedded'],
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                            }}
                        />
                        <div 
                                dangerouslySetInnerHTML={{ 
                                    __html: content
                                }} 
                            />
                    </FormGroup>
    )
}
else{
    return(
        <div></div>
    )
}
}

export default EditHow;