import get from 'lodash/get'
import initApollo from '../../libs/init-apollo'
import createFeed from '../../libs/feed'
import { GET_PRODUCTS } from '../../queries'

export default async (req, res) => {
  const apollo = initApollo()
  res.setHeader('Content-Type', 'application/xml')
  res.statusCode = 200
  const data = await apollo.query({
    query: GET_PRODUCTS
  })
  const list = get(data, 'data.getProducts.data', [])
  const feed = createFeed(list)
  res.end(feed.atom1())
}
