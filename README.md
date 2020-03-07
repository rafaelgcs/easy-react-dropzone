# Easy Dropzone React
Component for [ReactJS]: https://pt-br.reactjs.org/ using [React Dropzone]: https://github.com/react-dropzone/react-dropzone and anothers dependencies...

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
```javascript
import React, {useState} from 'react'
import { Dropzone } from 'easy-react-dropzone'

const MyDropzonePage = () => {
  const extensionsAccepted = ['png','jpg','jpeg','gif']
  const [files, setFiles] = useState([])
  
  return (
  <div>
    <h1>My Dropzone</h1>
    <Dropzone
      fileExtensions={extensionsAccepted}
      defaultValue={files}
      onChange={(selectedFiles) => setFiles(selectedFiles)}
    />
  </div>
  )
}

export default MyDropzonePage
```
...
