import { extractFragmentReplacements } from 'prisma-binding'
import Subscription from './Subscription'
import Query from './Query'
import Mutation from './Mutation'
import Post from './Post'
import Comment from './Comment'
import User from './User'

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export { resolvers, fragmentReplacements }