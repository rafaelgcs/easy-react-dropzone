import React, { useCallback, useState, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import BackupIcon from '@material-ui/icons/Backup';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { withSnackbar, SnackbarProvider } from 'notistack';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var useStyles = makeStyles(function (theme) {
  return {
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
      maxWidth: '100%'
    },
    root: {
      flexGrow: 1,
      maxWidth: '100%'
    },
    menuButton: {
      marginRight: theme.spacing(2),
      maxWidth: '100%'
    },
    title: {
      maxWidth: '100%',
      color: '#adadad',
      fontSize: 30,
      flexGrow: 1
    },
    text: {
      maxWidth: '100%',
      color: '#adadad',
      flexGrow: 1
    },
    areaFiles: {
      padding: 15
    }
  };
});
var DropzoneComponent = /*#__PURE__*/forwardRef(function (props, ref) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showFiles = _useState2[0],
      setShowFiles = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showLoader = _useState4[0],
      setShowLoader = _useState4[1];

  var fileExtensions = props.fileExtensions ? props.fileExtensions : [];
  var onChange = props.onChange;
  var textDropzone = props.textDropzone;

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      filesAccepted = _useState6[0],
      setFilesAccepted = _useState6[1]; // const reset = props.reset;


  var onDrop = useCallback(function (acceptedFiles) {
    // Do something with the files
    var newAcceptedFiles = [];
    acceptedFiles.map(function (file) {
      var arr = file.path.split('.');

      if (fileExtensions.length > 0) {
        if (fileExtensions.includes(arr[arr.length - 1])) return newAcceptedFiles.push(file);
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
    } // onChange(newAcceptedFiles);


    return newAcceptedFiles;
  }, []);

  var _useDropzone = useDropzone({
    onDrop: onDrop
  }),
      acceptedFiles = _useDropzone.acceptedFiles,
      getRootProps = _useDropzone.getRootProps,
      getInputProps = _useDropzone.getInputProps,
      isDragActive = _useDropzone.isDragActive;

  var files = filesAccepted.map(function (file, index) {
    return /*#__PURE__*/React.createElement(Grid, {
      key: file.path,
      item: true
    }, /*#__PURE__*/React.createElement(Paper, {
      elevation: 0
    }, /*#__PURE__*/React.createElement(InsertDriveFileIcon, {
      style: {
        fontSize: 90
      }
    }), /*#__PURE__*/React.createElement(Paper, {
      style: {
        padding: 10
      }
    }, file.path, " ", /*#__PURE__*/React.createElement(IconButton, {
      onClick: function onClick() {
        return resetFiles(index);
      }
    }, " ", /*#__PURE__*/React.createElement(DeleteForeverIcon, {
      style: {
        fontSize: 20
      }
    })))));
  });
  var filesDefault = props.defaultValue;

  var openNotification = function openNotification(message, variant) {
    props.enqueueSnackbar(message, {
      variant: variant
    });
  };

  var resetFiles = function resetFiles(index) {
    setShowFiles(false);
    setShowLoader(true);
    console.log("Passou dos Sets Bool");
    var news = [];
    news = filesAccepted;
    news.splice(index, 1);
    console.log("Passou do 'news'");
    setTimeout(function () {
      console.log("entrou no setTimeOut");

      if (news.length > 0) {
        console.log("new length > 0");
        setFilesAccepted(news);
        setShowFiles(true);
        onChange(news);
        setShowLoader(false);
      } else {
        console.log("new length <= 0");
        setFilesAccepted([]);
        setShowFiles(false);
        onChange([]);
        setShowLoader(false);
      }

      openNotification('Você alterou os arquivos para o envio...', 'info');
    }, 500);
    console.log("passou do timeOut");
  };

  var styles = useStyles();
  var ColorLinearProgress = withStyles({
    colorPrimary: {
      backgroundColor: props.progressColor ? props.progressColor : '#d1d1d1'
    },
    barColorPrimary: {
      backgroundColor: props.progressBarColor ? props.progressBarColor : '#878787'
    }
  })(LinearProgress);
  return /*#__PURE__*/React.createElement("section", {
    className: styles.section
  }, /*#__PURE__*/React.createElement("div", _extends({
    style: {
      cursor: 'pointer'
    }
  }, getRootProps({
    className: 'dropzone'
  })), /*#__PURE__*/React.createElement("input", getInputProps()), /*#__PURE__*/React.createElement("p", {
    className: styles.title
  }, textDropzone ? textDropzone : "Arraste e solte arquivos ou clique aqui"), /*#__PURE__*/React.createElement(BackupIcon, {
    color: 'disabled',
    style: {
      fontSize: 90
    }
  })), showLoader && /*#__PURE__*/React.createElement(ColorLinearProgress, {
    variant: "query"
  }), showFiles && /*#__PURE__*/React.createElement("aside", {
    className: styles.areaFiles
  }, /*#__PURE__*/React.createElement("h4", {
    className: styles.text
  }, "Arquivo a ser enviado: "), /*#__PURE__*/React.createElement(Grid, {
    container: true,
    justify: "center",
    spacing: 2,
    style: {
      maxWidth: '100%'
    }
  }, files)));
});
var DropzoneComponent$1 = withSnackbar(DropzoneComponent);

var Dropzone = /*#__PURE__*/forwardRef(function (props, ref) {
  var onDrop = props.onDrop;
  var defaultValue = props.defaultValue;
  var onChange = props.onChange;
  var fileExtensions = props.fileExtensions;
  var textDropzone = props.textDropzone;
  var progressColor = props.progressColor;
  var progressBarColor = props.progressBarColor;
  return /*#__PURE__*/React.createElement(SnackbarProvider, {
    maxSnack: 3
  }, /*#__PURE__*/React.createElement(DropzoneComponent$1, {
    progressBarColor: progressBarColor,
    progressColor: progressColor,
    textDropzone: textDropzone,
    fileExtensions: fileExtensions,
    onDrop: onDrop,
    defaultValue: defaultValue,
    onChange: onChange
  }));
});

export { Dropzone };
