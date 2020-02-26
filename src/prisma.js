import { Prisma } from 'prisma-binding'
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

// prisma.query  prisma.mutation  prisma.subscription  prisma.exists

// prisma.query.users(null, '{id name posts { id title }}').then((data) => {
//   console.log(JSON.stringify(data, undefined, 4))
// })

// prisma.query.comments(null, '{id text author {name} post {id}} ').then((data) => {
//   console.log(JSON.stringify(data, undefined, 4))
// })

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

prisma.mutation.updatePost({
  where: {
    id: "ck73co7wh03kj0863uszhmera"
  },
  data: {
    published: true,
    body: "newly changed post **"
  }
}, '{ id }').then((data) => {
  console.log(data)
  return prisma.query.users(null, '{id name posts {id title}}')
}).then((data) => {
  console.log(JSON.stringify(data, undefined, 4))
})

