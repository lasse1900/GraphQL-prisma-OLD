import { Prisma } from 'prisma-binding'
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

// prisma.query  prisma.mutation  prisma.subscription  prisma.exists

// 1. Create a new post
// 2. Fetch all of the info about the user  (author)

// prisma.exists.Comment({
//   id: "ck7386hpg01t00863k94flf6c",
//   author: {
//     id: "ck736e1rc00qk0863eggqyh1o"
//   }
// }).then((exists) => {
//   console.log(exists)
// })


// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId })

//   if(!userExists) {
//     throw new Error('user not found')
//   }

//   const post = await prisma.mutation.createPost({
//     data: {
//       ...data,
//       author: {
//         connect: {
//           id: authorId
//         }
//       }
//     }
//   }, '{id}')
//   const user = await prisma.query.user({
//     where: {
//       id: authorId
//     }
//   }, '{id name email posts {id title published}}')
//   return user
// }

// ver2

const createPostForUser = async (authorId, data) => {
  const userExists = await prisma.exists.User({ id: authorId })

  if (!userExists) {
    throw new Error('user not found')
  }

  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  }, '{ author { id name email posts { id title published}}}')

  return post.author
}

// createPostForUser('ck736e1rc00qk0863eggqyh1o', {
//   title: 'Test post #2',
//   body: 'Life of Mary-Ann',
//   published: true
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//   console.log(error)
// })

// -------- ********* --------------------------

// const updatePostForUser = async (postId, data) => {
//   const post = await prisma.mutation.updatePost({
//     where: {
//       id: postId
//     },
//     data: {
//       ...data,
//     }
//   }, '{author {id}}')
//   const user = await prisma.query.user({
//     where: {
//       id: post.author.id
//     }
//   }, '{id name email posts {id title published}}')
//   return user
// }

// ver2

const updatePostForUser = async (postId, data) => {
  const postExists = await prisma.exists.Post({ id: postId })

  if (!postExists) {
      throw new Error('Post not found')
  }

  const post = await prisma.mutation.updatePost({
      where: {
          id: postId
      },
      data
  }, '{ author { id name email posts { id title published } } }')
  
  return post.author
}

updatePostForUser('ck733thae00900863ks9pnh1x', {
  title: 'Udemy Classes #3',
  body: 'Learning Graphql ...',
  published: false
}).then((user) => {
  console.log(JSON.stringify(user, undefined, 2))
})