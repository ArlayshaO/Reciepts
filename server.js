var formidable = require('formidable');

const fileupload = require('express-fileupload')
const express = require('express');

//in order for server to parse file uploads
app.use(
    fileupload(),

//handle image upload to pass the selected file

const handleImageUpload = event => {
    const files = event.target.files
    const formData = new FormData()
    formData.append('myFile', files[0])
    
  
    fetch('/saveImage', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.path)
    })
    .catch(error => {
      console.error(error)
    })
  }
  
  document.querySelector('#fileUpload').addEventListener('change', event => {
    handleImageUpload(event)
  })

  app.post('/saveImage', (req, res) => {
    const fileName = req.files.myFile.name
    const path = __dirname + '/images/' + fileName
  
    image.mv(path, (error) => {
      if (error) {
        console.error(error)
        res.writeHead(500, {
          'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({ status: 'error', message: error }))
        return
      }
  
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({ status: 'success', path: '/img/houses/' + fileName }))
    })
  })