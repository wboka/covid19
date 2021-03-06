const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const Schema = mongoose.Schema
const PageHitSchema = new Schema(
  {
    page: {
      type: String,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    appName: {
      type: String,
      required: true
    },
    appVersion: {
      type: String,
      required: true
    },
    isServer: {
      type: Boolean,
      required: true
    },
    userAgent: {
      type: String,
      required: true
    },
    host: {
      type: String,
      required: true
    },
    when: {
      type: Date,
      default: new Date().toUTCString
    }
  },
  { collection: 'covid19' }
)
const PageHit = mongoose.model('PageHit', PageHitSchema)

module.exports = (req, res) => {
  if (req.method.toLowerCase() === 'post') {
    if (
      ![
        'localhost:3000',
        'trackcovid19.now.sh',
        'trackcovid19.vercel.app'
      ].includes(req.body.host)
    ) {
      res.status(400).json({
        error: `Invalid host: ${req.body.host}`
      })

      return false
    }

    const pageDetails = new PageHit(req.body)

    PageHit.create(pageDetails, (error, pageHit) => {
      if (error) res.send(error)

      res.json(pageHit)
    })
  } else {
    PageHit.find({
      host: req.query.host
    })
      .sort('-when')
      .exec((error, hits) => {
        if (error) res.send(error)

        res.json(hits)
      })
  }
}
