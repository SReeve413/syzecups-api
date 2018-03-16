import Pkg from '../../package'
import MongoPlugin from '../plugins/Mongo/index'
import ProductsPlugin from '../plugins/products/index'

const mongoUri = process.env.MONGO_URI

if (!mongoUri)
  throw Error('Please set a MONGO_URI environment variable')

/**
 * Loads plugins
 *
 * @param {Server} server
 * @returns {Promise}
 */
export default async server => {

  const plugins = [
    { plugin: require('inert') },
    { plugin: require('vision') },
    { plugin: require('blipp') },
    {
      plugin: require('good'),
      options: {
        ops: {
          interval: 5000,
        },
        reporters: {
          console: [
            {
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{
                log: '*',
                response: '*',
                request: '*',
                error: '*',
              }],
            },
            {
              module: 'good-console',
              args: [{
                log: '*',
                response: '*',
                request: '*',
                error: '*',
              }],
            }, 'stdout'],
        },
      },
    },
    {
      plugin: require('hapi-swagger'),
      options: {
        cors: true,
        jsonEditor: false,
        documentationPath: '/',
        info: {
          title: 'Example',
          version: Pkg.version,
          description: 'An example api',
        },
      },
    },
    { plugin: MongoPlugin, options: {mongoUri}},
    { plugin: ProductsPlugin}
  ]

  await server.register(plugins)
}
