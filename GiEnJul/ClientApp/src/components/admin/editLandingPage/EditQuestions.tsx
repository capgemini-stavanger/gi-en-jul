import * as React from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { FormGroup } from '@material-ui/core';

type Props = {
    step: Number,
    questionState: EditorState
    setQuestionState: (input: EditorState) => void,
}

const EditQuestions: React.FC<Props> =({step, questionState, setQuestionState}) => {
    // const [title, setTitle] = useState<string>('');
    // const [picture, setPicture] = useState<string>('');
    const [content, setContent] = useState<string>('');

    

    if (step === 2){
        return(
            <FormGroup>
                            <Editor
                                editorState={questionState}
                                wrapperClassName="card"
                                editorClassName="card-body"
                                onEditorStateChange={newState => {
                                    setQuestionState(newState);
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
    else {
        return(
            <div></div>
        )
    }
    
}

export default EditQuestions;