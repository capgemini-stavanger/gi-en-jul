import * as React from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Typography, FormGroup, TextField } from '@material-ui/core';

type Props = {
    contactState: EditorState
    setContactState: (input: EditorState) => void,
    contactTitleState: string,
    setContactTitleState: (input: string) => void,
}


const EditContact: React.FC<Props> = ({ contactState, setContactState, contactTitleState, setContactTitleState }) => {
    const [content, setContent] = useState<string>('');

        return (
            <FormGroup>
                <Typography variant='h6'>Tittel:</Typography>
                <TextField
                    label="Skriv tittel her..."
                    variant="outlined"
                    value={contactTitleState}
                    margin="normal"
                    onChange={(newState => {
                        setContactTitleState(newState.target.value)
                    })} />
                <Typography variant='h6'>Innhold:</Typography>
                <Editor
                    editorState={contactState}
                    wrapperClassName="card"
                    editorClassName="card-body"
                    onEditorStateChange={newState => {
                        setContactState(newState);
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
export default EditContact;