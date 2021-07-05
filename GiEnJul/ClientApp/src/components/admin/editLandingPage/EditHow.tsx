import * as React from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Typography, FormGroup, TextField } from '@material-ui/core';

type Props = {
    step: Number,
    howState: EditorState
    setHowState: (input: EditorState) => void,
    howTitleState: string,
    setHowTitleState: (input: string) => void,
}


const EditHow: React.FC<Props> = ({ step, howState, setHowState, howTitleState, setHowTitleState }) => {
    const [content, setContent] = useState<string>('');

    if (step === 1) {
        return (
            <FormGroup>
                <Typography variant='h6'>Tittel:</Typography>
                <TextField
                    label="Skriv tittel her..."
                    variant="outlined"
                    value={howTitleState}
                    margin="normal"
                    onChange={(newState => {
                        setHowTitleState(newState.target.value)
                    })} />
                <Typography variant='h6'>Innhold:</Typography>
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
    else {
        return (
            <div></div>
        )
    }
}
export default EditHow;