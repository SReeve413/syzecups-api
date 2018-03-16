import pkg from './package'


export default {
  pkg,
  dependencies: ['mongo'],
  register(server, options ={}){

    const {db} = server.plugins['mongo']
    const cups = db.get('cups')

    server.route({
      method: 'GET',
      path: '/cups',
      options:{
        tags: ['api']
      },
      async handler(request,h){
          return await cups.find({ })
      }
    })



  }
}
