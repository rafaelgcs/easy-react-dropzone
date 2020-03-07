import React from 'react'
import { SnackbarProvider } from 'notistack'
import DropzoneComponent from './dropzoneComponent'

export const Dropzone = React.forwardRef((props, ref) => {
    const onDrop = props.onDrop;
    const defaultValue = props.defaultValue;
    const onChange = props.onChange
    const fileExtensions = props.fileExtensions;
    const textDropzone = props.textDropzone;

    return (
        <SnackbarProvider maxSnack={3}>
            <DropzoneComponent
                textDropzone={textDropzone}
                fileExtensions={fileExtensions}
                onDrop={onDrop}
                defaultValue={defaultValue}
                onChange={onChange} />
        </SnackbarProvider>
    )
})