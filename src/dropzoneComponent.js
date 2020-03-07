import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'

import BackupIcon from '@material-ui/icons/Backup'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import { withSnackbar } from 'notistack'



const useStyles = makeStyles(theme => ({
    section: {
        marginTop: 0,
        minHeight: 220,
        backgroundColor: '#f7f7f7',
        border: '3px dotted #adadad',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignmentBaseline: 'center',
        textAlign: 'center'
    },
    button: {
        height: 60,
        maxWidth: '100%',
    },
    root: {
        flexGrow: 1,
        maxWidth: '100%',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        maxWidth: '100%',
    },
    title: {
        maxWidth: '100%',
        color: '#adadad',
        fontSize: 30,
        flexGrow: 1,
    },
    text: {
        maxWidth: '100%',
        color: '#adadad',
        flexGrow: 1,
    },
    areaFiles: {
        padding: 15,
    }
}))

const DropzoneComponent = React.forwardRef((props, ref) => {
    const [showFiles, setShowFiles] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const fileExtensions = props.fileExtensions ? props.fileExtensions : [];
    const onChange = props.onChange;
    const textDropzone = props.textDropzone;
    const [filesAccepted, setFilesAccepted] = useState([]);
    const ColorLinearProgress = withStyles({
        colorPrimary: {
            backgroundColor: props.progressColor ? props.progressColor : '#b2dfdb',
        },
        barColorPrimary: {
            backgroundColor: props.progressBarColor ? props.progressBarColor : '#00695c',
        },
    })(LinearProgress)
    // const reset = props.reset;
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        let newAcceptedFiles = [];

        acceptedFiles.map(file => {
            let arr = file.path.split('.');
            if (fileExtensions.length > 0) {
                if (fileExtensions.includes(arr[arr.length - 1]))
                    return newAcceptedFiles.push(file);
            } else {
                return newAcceptedFiles.push(file);
            }
        });

        if (newAcceptedFiles.length > 0) {
            if (newAcceptedFiles.length < acceptedFiles.length) {
                setShowFiles(true);
                if (onChange) {
                    onChange(newAcceptedFiles);
                    setFilesAccepted(newAcceptedFiles);
                    openNotification('Arquivo selecionado com sucesso!', 'success');
                    openNotification('Alguns dos arquivos enviados possuem extensões que não são suportadas...', 'info');
                }
            } else {
                setShowFiles(true);
                if (onChange) {
                    setFilesAccepted(newAcceptedFiles);
                    onChange(newAcceptedFiles);
                    openNotification('Arquivo selecionado com sucesso!', 'success');
                }
            }

        } else {
            onChange([]);
            setFilesAccepted([]);
            setShowFiles(false);
            openNotification('A extensão do arquivo selecionado não é aceita.', 'error');
        }
        // onChange(newAcceptedFiles);
        return newAcceptedFiles;
    }, [])
    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const files = filesAccepted.map((file, index) => {
        return (
            <Grid key={file.path} item>
                <Paper elevation={0}>
                    <InsertDriveFileIcon style={{ fontSize: 90 }} />
                    <Paper style={{ padding: 10 }}>{file.path} <IconButton onClick={() => resetFiles(index)}> <DeleteForeverIcon style={{ fontSize: 20 }} /></IconButton></Paper>
                </Paper>
            </Grid>
        );
    })

    let filesDefault = props.defaultValue

    const openNotification = (message, variant) => {
        props.enqueueSnackbar(message, {
            variant: variant,
        });
    }

    const resetFiles = (index) => {
        setShowFiles(false);
        setShowLoader(true);
        let news = [];
        news = filesAccepted;
        news.splice(index, 1);
        setTimeout(() => {
            if (news.length > 0) {
                setFilesAccepted(news);
                setShowFiles(true);
                onChange(news);
                setShowLoader(false);
            } else {
                setFilesAccepted([]);
                setShowFiles(false);
                onChange([]);
                setShowLoader(false);
            }
            openNotification('Você alterou os arquivos para o envio...', 'info');
        }, 500);
    }

    const styles = useStyles();

    return (
        <section className={styles.section}>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p className={styles.title}>{textDropzone ? textDropzone : `Arraste e solte arquivos ou clique aqui`}</p>
                <BackupIcon color={'disabled'} style={{ fontSize: 90 }} />
            </div>
            {
                showLoader &&
                <ColorLinearProgress variant="query" />
            }
            {
                showFiles &&
                <aside className={styles.areaFiles}>
                    <h4 className={styles.text}>Arquivo a ser enviado: </h4>
                    <Grid container justify="center" spacing={2} style={{ maxWidth: '100%' }}>
                        {files}
                    </Grid>
                </aside>
            }


        </section>
    )
})

export default withSnackbar(DropzoneComponent);