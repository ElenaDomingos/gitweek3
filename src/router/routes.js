import { stories } from '../stories'
import { feeds } from '../pages/feeds'

export default [{
  path: '/',
  component: feeds,
  name: 'root'
},

{
  path: '/stories',
  component: stories,
  name: 'stories'
}]
