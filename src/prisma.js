import { Prisma } from 'prisma-binding'
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

// prisma.query  prisma.mutation  prisma.subscription  prisma.exists

// 1. Create a new post
// 2. Fetch all of the info about the user  (author)

// const createPostForUser = async (authorId, data) => {
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

// createPostForUser('ck7319ds800xd0963jb1xrwro', {
//   title: 'Great books to read',
//   body: 'The war of art',
//   published: true
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2))
// })


const updatePostForUser = async (postId, data) => {
  const post = await prisma.mutation.updatePost({
    where: {
      id: postId
    },
    data: {
      ...data,
    }
  }, '{author {id}}')
  const user = await prisma.query.user({
    where: {
      id: post.author.id
    }
  }, '{id name email posts {id title published}}')
  return user
}

updatePostForUser('ck73eg0r704d80863rf5hzvsy', {
  title: 'Udemy Classes',
  body: 'Learning Graphql ...',
  published: false
}).then((user) => {
  console.log(JSON.stringify(user, undefined, 2))
})

// prisma.mutation.createPost({
//   data: {
//     title: "GraphQL 101",
//     body: "",
//     published: false,
//     author: {
//       connect: {
//         id: "ck736e1rc00qk0863eggqyh1o"
//       }
//     }
//   }
// }, '{ id title body published}').then((data) => {
//   console.log(data)
//   return prisma.query.users(null, '{id name posts {id title}}')
// }).then((data) => {
//   console.log(JSON.stringify(data, undefined, 4))
// })

// prisma.mutation.updatePost({
//   where: {
//     id: "ck73co7wh03kj0863uszhmera"
//   },
//   data: {
//     published: true,
//     body: "newly changed post **"
//   }
// }, '{ id }').then((data) => {
//   console.log(data)
//   return prisma.query.users(null, '{id name posts {id title}}')
// }).then((data) => {
//   console.log(JSON.stringify(data, undefined, 4))
// })

