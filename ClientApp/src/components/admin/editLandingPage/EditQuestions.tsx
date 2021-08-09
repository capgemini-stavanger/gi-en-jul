import * as React from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { FormGroup, TextField, Typography } from '@material-ui/core';

type Props = {
    questionState: EditorState
    setQuestionState: (input: EditorState) => void,
    questionTitleState: string,
    setQuestionTitleState: (input: string) => void,
}

const EditQuestions: React.FC<Props> = ({ questionState, setQuestionState, questionTitleState, setQuestionTitleState }) => {
    //these states will be implemented later
    // const [title, setTitle] = useState<string>('');
    // const [picture, setPicture] = useState<string>('');
    const [content, setContent] = useState<string>('');

        return (
            <FormGroup>
                <Typography variant='h6'>Tittel:</Typography>
                <TextField
                    label="Skriv tittel her..."
                    variant="outlined"
                    value={questionTitleState}
                    margin="normal"
                    onChange={(newState => {
                        setQuestionTitleState(newState.target.value)
                    })} />
                <Typography variant='h6'>Innhold:</Typography>
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
                        options: ['inline', 'list', 'embedded'],
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