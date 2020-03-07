import React from 'react'
import { SnackbarProvider } from 'notistack'
import DropzoneComponent from './dropzoneComponent'

export const Dropzone = React.forwardRef((props, ref) => {
    const onDrop = props.onDrop;
    const defaultValue = props.defaultValue;
    const onChange = props.onChange
    const fileExtensions = props.fileExtensions;
    const textDropzone = props.textDropzone;
    const progressColor = props.progressColor;
    const progressBarColor = props.progressBarColor;

    return (
        <SnackbarProvider maxSnack={3}>
            <DropzoneComponent
                progressBarColor={progressBarColor}
                progressColor={progressColor}
                textDropzone={textDropzone}
                fileExtensions={fileExtensions}
                onDrop={onDrop}
                defaultValue={defaultValue}
                onChange={onChange} />
        </SnackbarProvider>
    )
})