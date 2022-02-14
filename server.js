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
         { name: 'Facebook', url: 'https://www.facebook.com/marcoscruz.off' },
         {
            name: 'Instagram',
            url: 'https://www.instagram.com/marcoscruz.off/'
         },
         {
            name: 'Linkedin',
            url: 'https://www.linkedin.com/in/marcos-cruz-8b9024224/'
         },
         { name: 'GitHub', url: 'https://github.com/MarcosCruzOff' },
         { name: 'Email', url: 'marcoscruz673@gmail.com' },
         { name: 'Telefone', url: '+5591986172759' }
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
