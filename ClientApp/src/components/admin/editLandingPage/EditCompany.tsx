import * as React from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Typography, FormGroup, TextField } from '@material-ui/core';

type Props = {
    companyState: EditorState
    setCompanyState: (input: EditorState) => void,
    companyTitleState: string,
    setCompanyTitleState: (input: string) => void,
}


const EditCompany: React.FC<Props> = ({companyState, setCompanyState, companyTitleState, setCompanyTitleState }) => {
    const [content, setContent] = useState<string>('');

        return (
            <FormGroup>
                <Typography variant='h6'>Tittel:</Typography>
                <TextField
                    label="Skriv tittel her..."
                    variant="outlined"
                    value={companyTitleState}
                    margin="normal"
                    onChange={(newState => {
                        setCompanyTitleState(newState.target.value)
                    })} />
                <Typography variant='h6'>Innhold:</Typography>
                <Editor
                    editorState={companyState}
                    wrapperClassName="card"
                    editorClassName="card-body"
                    onEditorStateChange={newState => {
                        setCompanyState(newState);
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
export default EditCompany;