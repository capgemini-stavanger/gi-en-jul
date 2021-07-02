import * as React from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { FormGroup } from '@material-ui/core';

const EditQuestions = () => {
    const [title, setTitle] = useState<string>('');
    const [picture, setPicture] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [headline, setHeadline] = useState<string>('');
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

    const [saving, setSaving] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');

    return(
        <FormGroup>
                        <Editor
                            editorState={editorState}
                            wrapperClassName="card"
                            editorClassName="card-body"
                            onEditorStateChange={newState => {
                                console.log(newState)
                                setEditorState(newState);
                                setContent(draftToHtml(convertToRaw(newState.getCurrentContent())))
                                console.log(content)
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

export default EditQuestions;