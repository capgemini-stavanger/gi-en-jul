import * as React from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Typography, FormGroup, TextField } from '@material-ui/core';

type Props = {
    startState: EditorState
    setStartState: (input: EditorState) => void,
    startTitleState: string,
    setStartTitleState: (input: string) => void,
}


const EditStart: React.FC<Props> = ({ startState, setStartState, startTitleState, setStartTitleState }) => {
    const [content, setContent] = useState<string>('');

        return (
            <FormGroup>
                <Typography variant='h6'>Tittel:</Typography>
                <TextField
                    label="Skriv tittel her..."
                    variant="outlined"
                    value={startTitleState}
                    margin="normal"
                    onChange={(newState => {
                        setStartTitleState(newState.target.value)
                    })} />
                <Typography variant='h6'>Innhold:</Typography>
                <Editor
                    editorState={startState}
                    wrapperClassName="card"
                    editorClassName="card-body"
                    onEditorStateChange={newState => {
                        setStartState(newState);
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
export default EditStart;