var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var axios = require('axios')

var server = express()

server.use(logger('dev')) //log all the request to our terminal
server.use(bodyParser.json()) // attaches all user input to request.body
server.use(bodyParser.urlencoded({extended:false}))

server.set('view engine' , 'ejs')
server.use(express.static('views'))
server.set('views' , __dirname +'/views')

server.get('/' , function(request, response){
    response.render('home.ejs')
})

server.get('/about-me' , function(request, response){
        response.render('about.ejs')
})

server.get('/contact' , function(request, response){
        response.render('contact.ejs')
})

server.post("/", function(request, response){
    console.log(request.body.bday)
    var zodiac = 'dont know'
    var image = 'https://i.pinimg.com/originals/c5/38/cf/c538cf36166a86c58dd64e6afba002ab.jpg'
    var bday = request.body.bday
     var dateArray = bday.split("-");
     var month = Number(dateArray[1])
     var day = Number(dateArray[2])
     
     console.log('month: '+month)
     console.log(day)
      if (  (month === 1 &&  day >= 22) || (month === 2 && day <= 18 ) ){
         zodiac = 'Aquarius'
          image = 'https://fustany.com/images/en/content/header_image_header_image_Aquarius-Man-Personality-How-to-get-aquariusman-Fustany.jpg'
     }
      if (  (month === 2 &&  day >= 18) || (month === 3 && day <= 20 ) ){
         zodiac = 'Pisces'
         image = 'https://usercontent2.hubstatic.com/7019781.jpg'
     }
     if( (month === 3 && day >= 20) || (month === 4 && day <= 20) ){
         zodiac = 'Aries'
         image = 'https://fustany.com/images/en/content/header_image_Aries-Man-Personality-How-to-get-ariesman-Fustany.jpg'
     }
     if ( (month === 4 && day >= 20) || (month === 5 && day <= 21) ){
         zodiac = 'Taurus'
         image = 'https://i.pinimg.com/originals/7e/3b/81/7e3b81a1c3c6fcdf6a993c9d2f886435.jpg'
     }
     if ( (month === 5 && day >= 21) || (month === 6 && day <= 21) ){
         zodiac = 'Gemini'
         image = 'https://4dqal1ivlyo3dh2tf3hw8dwx-wpengine.netdna-ssl.com/wp-content/uploads/2015/11/Horoscope-Gemini-261x250.jpg'
     }
     if ( (month === 6 && day >= 21) || (month === 7 && day <= 22) ){
         zodiac = 'Cancer'
         image = 'http://tarot-astrology.co.uk/wp-content/uploads/2016/07/Inspirational-Quotes-for-Cancer-Zodiac-Sign.jpg'
     }
     if( (month === 7 && day >= 22) || (month === 8 && day <= 23) ) {
         zodiac = 'Leo'
         image = 'https://cdn2.vectorstock.com/i/thumb-large/50/96/leo-zodiac-sign-icon-vector-14275096.jpg'
     }
     if ( (month === 8 &&  day >= 23) || (month === 9 && day <= 23 ) ){
         zodiac = 'Virgo'
         image = 'https://res.cloudinary.com/teepublic/image/private/s--vLNUdovS--/t_Preview/b_rgb:262c3a,c_limit,f_jpg,h_630,q_90,w_630/v1509434214/production/designs/2013060_1.jpg'
     }
     if ( (month === 9 &&  day >= 23) || (month === 10 && day <= 23 ) ){
         zodiac = 'Libra'
         image = 'https://cosmicintelligenceagency.com/content/wp-content/uploads/2011/04/GLYPH-Libra.jpg'
     }
     if ( (month === 10 &&  day >= 23) || (month === 11 && day <= 22 ) ){
         zodiac = 'Scorpio'
         image = 'http://www.chinesehoroscop-e.com/Western%20Astrology%20Signs/Zodiac%20Symbols%20Folder/Scorpio%20Zodiac%20Symbol.jpg'
     }
     if ( (month === 11 &&  day >= 22) || (month === 12 && day <= 21 ) ){
         zodiac = 'Sagittarius'
         image = 'http://www.astrology-zodiac-signs.com/images/sagittarius.jpg'
     }
     if ( (month === 12 &&  day >= 21) || (month === 1 && day <= 20 ) ){
         zodiac = 'Capricorn'
         image = 'https://fustany.com/images/en/content/header_image_Capricorn-Man-Personality-How-to-get-capricornman-Fustany.jpg'
     }
    console.log('zodiac is '+zodiac)
    var url = 'http://horoscope-api.herokuapp.com/horoscope/today/'+zodiac
    
    axios.get(url)
    .then( res => res.data )
    .then( data => {
        // console.log(typeof data.horoscope)
        
        var horoscope = data.horoscope.split("")
        horoscope.pop()
        horoscope.pop()
        horoscope.shift()
        horoscope.shift()
        var result = horoscope.join("")
        
        response.render('results.ejs', {zodiac: zodiac, data: result, image: image})
    })
    .catch( error => {
        console.log(error)
    })
})
  


var port = process.env.PORT

server.listen(port, () => {
    console.log('server running on port: ' + port)
})