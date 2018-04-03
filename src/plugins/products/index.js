import pkg from './package'
import Joi from 'joi'

export default {
  pkg,
  dependencies: ['mongo'],
  register(server, options ={}){

    const {db} = server.plugins['mongo']
    const cups = db.get('cups')

    server.route({
      method: 'GET',
      path: '/v1/cups',
      options:{
        tags: ['api']
      },
      async handler(request,h){
          return await cups.find({ })
      }
    })

    server.route({
      method: 'GET',
      path: '/v1/cups/{id}',
      options:{
        tags: ['api'],
        validate:{
          params:{
            id: Joi.string()
          }
        }
        },
      async handler(request,h){
        const { id } = request.params

        return await cups.findOne({ "_id": id})
      }
    })


    server.route({
      method: 'POST',
      path: '/v1/cups/new',
      options:{
        tags: ['api'],
        validate:{
          payload:{
            name: Joi.string().required(),
            price: Joi.number().required(),
            description: Joi.array()

          }
        }
      },
      async handler(request,h){
        return await cups.insert(request.payload)
      }
    })

    server.route({
      method: 'DELETE',
      path: '/v1/cups/delete/{id}',
      options:{
        tags: ['api'],
        validate:{
          params:{
            id: Joi.string().required()
          }
        }
      },
      async handler(request,h){
        const { id } =  request.params
        return await cups.remove({ "_id": id})
      }
    })


    // server.route({
    //   method: 'GET',
    //   path: '/v1/weather/current',
    //   options: {
    //     tags: ['api'],
    //     validate: {
    //       query: {
    //         city: Joi.string(),
    //         zipcode: Joi.string().min(5).max(10).default(`84101`),
    //       }
    //     }
    //   },
    //   async handler(request, h) {
    //     const {city, zipcode = `84111`} = request.query
    //     if (city) {
    //       return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},us&APPID=${API_KEY}&units=imperial`, currentWeather)
    //     } else {
    //       return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${zipcode},us&APPID=${API_KEY}&units=imperial`, currentWeather)
    //     }
    //   }
    // })


  }
}
