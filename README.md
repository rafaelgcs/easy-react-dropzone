# Easy Dropzone React
Component for [ReactJS](https://pt-br.reactjs.org/) using [React Dropzone](https://github.com/react-dropzone/react-dropzone) and [Material UI](https://material-ui.com/pt/)

# Installation
Install it from npm and include it in your React build process (using Webpack, Browserify, etc).
```shell
npm install --save easy-react-dropzone
```
or
```shell
yarn add easy-react-dropzone
```

# Usage

## Simple
```javascript
import React, {useState} from 'react'
import { Dropzone } from 'easy-react-dropzone'

const MyDropzonePage = () => {
  const [files, setFiles] = useState([])
  
  return (
  <div>
    <h1>My Dropzone</h1>
    <Dropzone
      defaultValue={files}
      onChange={(selectedFiles) => setFiles(selectedFiles)}
    />
  </div>
  )
}

export default MyDropzonePage
```

## With Custom Text & Files Extensions
```javascript
import React, {useState} from 'react'
import { Dropzone } from 'easy-react-dropzone'

const MyDropzonePage = () => {
  const [files, setFiles] = useState([])
  // Escolhendo as extensões
  const extensionsAccepted = ['png','jpg','jpeg','gif']
  
  return (
  <div>
    <h1>My Custom Dropzone</h1>
    <Dropzone
      textDropzone="Clique aqui ou arraste as imagens"
      fileExtensions={extensionsAccepted}
      defaultValue={files}
      onChange={(selectedFiles) => setFiles(selectedFiles)}
    />
  </div>
  )
}

export default MyDropzonePage
```

## With Custom Text & Files Extensions & Loader Progress Bar Colors
```javascript
import React, {useState} from 'react'
import { Dropzone } from 'easy-react-dropzone'

const MyDropzonePage = () => {
  const [files, setFiles] = useState([])
  // Escolhendo as extensões
  const extensionsAccepted = ['png','jpg','jpeg','gif']
  
  return (
  <div>
    <h1>My Custom Dropzone With Colors in Loader Progress Bar</h1>
    <Dropzone
      textDropzone="Clique aqui ou arraste as imagens"
      progressBarColor="#91c5e3" // Bar Color Background - light blue
      progressColor="#0c81c4" // Progress Color - blue
      fileExtensions={extensionsAccepted}
      defaultValue={files}
      onChange={(selectedFiles) => setFiles(selectedFiles)}
    />
  </div>
  )
}

export default MyDropzonePage
```

## Full Example
```javascript
import React, {useState} from 'react'
import { Dropzone } from 'easy-react-dropzone'

const MyDropzonePage = () => {
  const [files, setFiles] = useState([])
  // Escolhendo as extensões
  const extensionsAccepted = ['png','jpg','jpeg','gif']
  // Choose Message's Text
  const texts = {
    removedFile: "U have changed files",
    manyFilesSelecteds: "Successful to load files!",
    oneFileSelected: "Successful to load the file!",
    someFilesDontHaveEnabledExtension: "Some files don't have one of the enabled extensions...",
    someFilesCannotToBeSended: "No uploaded files have an extension enabled"
  }
  return (
  <div>
    <h1>My Custom Full Dropzone Version</h1>
    <Dropzone
      textDropzone="Clique aqui ou arraste as imagens"
      titleLoadedFiles="Os arquivos carregados são:"
      progressBarColor="#91c5e3" // Bar Color Background - light blue
      progressColor="#0c81c4" // Progress Color - blue
      fileExtensions={extensionsAccepted}
      defaultValue={files}
      messages={texts}
      onChange={(selectedFiles) => setFiles(selectedFiles)}
    />
  </div>
  )
}

export default MyDropzonePage
```