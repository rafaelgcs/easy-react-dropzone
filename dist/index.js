'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactDropzone = require('react-dropzone');
var styles = require('@material-ui/core/styles');
var Paper = _interopDefault(require('@material-ui/core/Paper'));
var Grid = _interopDefault(require('@material-ui/core/Grid'));
var IconButton = _interopDefault(require('@material-ui/core/IconButton'));
var LinearProgress = _interopDefault(require('@material-ui/core/LinearProgress'));
var BackupIcon = _interopDefault(require('@material-ui/icons/Backup'));
var InsertDriveFileIcon = _interopDefault(require('@material-ui/icons/InsertDriveFile'));
var DeleteForeverIcon = _interopDefault(require('@material-ui/icons/DeleteForever'));
var notistack = require('notistack');

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var useStyles = styles.makeStyles(function (theme) {
  return {
    section: {
      marginTop: 0,
      minHeight: 220,
      // padding: 20,
      backgroundColor: '#f7f7f7',
      border: '3px dotted #adadad',
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      alignmentBaseline: 'center',
      textAlign: 'center'
    },
    button: {
      // margin: theme.spacing(1),
      // alignContent: 'center',
      // width: '100%',
      // borderRadius: 0,
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
var DropzoneComponent = React__default.forwardRef(function (props, ref) {
  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showFiles = _useState2[0],
      setShowFiles = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showLoader = _useState4[0],
      setShowLoader = _useState4[1];

  var fileTypes = props.fileTypes;
  var onChange = props.onChange;
  var textDropzone = props.textDropzone;

  var _useState5 = React.useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      filesAccepted = _useState6[0],
      setFilesAccepted = _useState6[1];

  var ColorLinearProgress = styles.withStyles({
    colorPrimary: {
      backgroundColor: props.progressColor ? props.progressColor : '#b2dfdb'
    },
    barColorPrimary: {
      backgroundColor: props.progressBarColor ? props.progressBarColor : '#00695c'
    }
  })(LinearProgress); // const reset = props.reset;

  var onDrop = React.useCallback(function (acceptedFiles) {
    // Do something with the files
    var newAcceptedFiles = [];
    acceptedFiles.map(function (file) {
      var arr = file.path.split('.');
      if (fileTypes.includes(arr[arr.length - 1])) return newAcceptedFiles.push(file);
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

  var _useDropzone = reactDropzone.useDropzone({
    onDrop: onDrop
  }),
      acceptedFiles = _useDropzone.acceptedFiles,
      getRootProps = _useDropzone.getRootProps,
      getInputProps = _useDropzone.getInputProps,
      isDragActive = _useDropzone.isDragActive;

  var files = filesAccepted.map(function (file, index) {
    return React__default.createElement(Grid, {
      key: file.path,
      item: true
    }, React__default.createElement(Paper, {
      elevation: 0
    }, React__default.createElement(InsertDriveFileIcon, {
      style: {
        fontSize: 90
      }
    }), React__default.createElement(Paper, {
      style: {
        padding: 10
      }
    }, file.path, " ", React__default.createElement(IconButton, {
      onClick: function onClick() {
        return resetFiles(index);
      }
    }, " ", React__default.createElement(DeleteForeverIcon, {
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
    var news = [];
    news = filesAccepted;
    news.splice(index, 1);
    setTimeout(function () {
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
  };

  var styles$$1 = useStyles();
  return React__default.createElement("section", {
    className: styles$$1.section
  }, React__default.createElement("div", getRootProps({
    className: 'dropzone'
  }), React__default.createElement("input", getInputProps()), React__default.createElement("p", {
    className: styles$$1.title
  }, textDropzone ? textDropzone : "Arraste e solte arquivos ou clique aqui"), React__default.createElement(BackupIcon, {
    color: 'disabled',
    style: {
      fontSize: 90
    }
  })), showLoader && React__default.createElement(ColorLinearProgress, {
    variant: "query"
  }), showFiles && React__default.createElement("aside", {
    className: styles$$1.areaFiles
  }, React__default.createElement("h4", {
    className: styles$$1.text
  }, "Arquivo a ser enviado: "), React__default.createElement(Grid, {
    container: true,
    justify: "center",
    spacing: 2,
    style: {
      maxWidth: '100%'
    }
  }, files)));
});
var DropzoneComponent$1 = notistack.withSnackbar(DropzoneComponent);

var Dropzone = React__default.forwardRef(function (props, ref) {
  var onDrop = props.onDrop;
  var defaultValue = props.defaultValue;
  var onChange = props.onChange;
  var fileTypes = props.fileTypes;
  var textDropzone = props.textDropzone;
  return React__default.createElement(notistack.SnackbarProvider, {
    maxSnack: 3
  }, React__default.createElement(DropzoneComponent$1, {
    textDropzone: textDropzone,
    fileTypes: fileTypes,
    onDrop: onDrop,
    defaultValue: defaultValue,
    onChange: onChange
  }));
});

exports.Dropzone = Dropzone;
