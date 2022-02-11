const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set('view engine', 'njk')

server.get('/', function (req, res) {
  const data = {
    avatar_url: '/Eu2.jpg',
    name: 'Marcos Coutinho',
    role: 'Programador Junior Full Stack',
    description1: 'Aspirante em Design UX/UI',
    description2: 'Ouro 1 no League of Legends',
    link: [
      { name: 'Facebook', url: '#' },
      { name: 'Instagram', url: '#' },
      { name: 'Linkedin', url: '#' },
      { name: 'GitHub', url: '#' },
      { name: 'Email', url: '#' },
      { name: 'Telefone', url: '#' }
    ]
  }

  return res.render('home', { data: data })
})

server.get('/trabalho', function (req, res) {
  return res.render('trabalho', { items: videos })
})

server.get('/video', function (req, res) {
  const id = req.query.id

  const video = videos.find(function (video) {
    return video.id == id
  })

  if (!video) {
    return res.send('Não Encontrou')
  }

  return res.render('video', { item: video })
})

server.listen(5000, function () {
  console.log('funcionou')
})

nunjucks.configure('views', {
  express: server
})
