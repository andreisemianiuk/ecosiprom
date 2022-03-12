const path = require(`path`)

exports.createPages = async gatsbyUtilities => {
  const productItems = await getProductItems(gatsbyUtilities)
  const productList = await getProductList(gatsbyUtilities)

  if (!productItems.length || !productList.length) {
    return
  }
  await createProductItemPages({ productItems, gatsbyUtilities })
  await createProductListPages({ productList, gatsbyUtilities })
}
const createProductItemPages = async ({ productItems, gatsbyUtilities }) => {
  Promise.all(
    productItems.map(({ node }) => {
      if (
        node.slug !== 'electromagnitnye-klapany' ||
        node.slug !== 'gorelki-rekumat' ||
        node.slug !== 'izluchayushchie-truby'
      ) {
        gatsbyUtilities.actions.createPage({
          path: node.uri,
          component: require.resolve(
            './src/templates/modal-product-item-template.js'
          ),
          context: {
            id: node.id,
            parentId: node.parentId,
          },
          // defer: true,
        })
      }
    })
  )
}
const createProductListPages = async ({ productList, gatsbyUtilities }) => {
  Promise.all(
    productList.map(({ node }) => {
      gatsbyUtilities.actions.createPage({
        path: node.uri,
        component: require.resolve('./src/templates/product-list-template.js'),
        context: {
          id: node.id,
          parentId: node.parentId,
        },
        // defer: true,
      })
    })
  )
}
async function getProductItems({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    {
      allWpPage(
        filter: {
          wpParent: {
            node: {
              slug: {
                in: [
                  "armatura-privody-regulyatory"
                  "electromagnitnye-klapany"
                  "toplivnye-nasosy"
                  "datchiki-rele-avtomaty-goreniya"
                  "prom-gorelki"
                  "gorelki-rekumat"
                  "izluchayushchie-truby"
                ]
              }
            }
          }
        }
      ) {
        edges {
          node {
            id
            parentId
            uri
            slug
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your product items`,
      graphqlResult.errors
    )
    return
  }
  return graphqlResult.data.allWpPage.edges
}
async function getProductList({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    {
      allWpPage(
        filter: {
          slug: {
            regex: "/armatura-privody-regulyatory|electromagnitnye-klapany|toplivnye-nasosy|datchiki-rele-avtomaty-goreniya|prom-gorelki|gorelki-rekumat|izluchayushchie-truby/"
          }
        }
      ) {
        edges {
          node {
            id
            parentId
            slug
            uri
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your product items`,
      graphqlResult.errors
    )
    return
  }
  return graphqlResult.data.allWpPage.edges
}
// exports.createPages = async ({ actions, graphql }) => {
//   const result = await graphql(`
// {
//   allWpPage(filter: {content: {regex: "/class=\"item\"/"}}) {
// 		edges {
// 			node {
// 				slug
// 				uri
// 			}
// 		}
// 	}
// }
//   `)

//   const pages = result.data.allWpPage.edges
//   pages.forEach(({ node }) => {
// actions.createPage({
//   path: node.uri,
//   component: require.resolve('./src/templates/product-list-template.js'),
//   context: {
//     id: node.id,
//   },
//   defer: true,
// })
//   })
// }
// exports.createPages = async gatsbyUtilities => {
//   // Query our posts from the GraphQL server
//   const posts = await getPosts(gatsbyUtilities)

//   // If there are no posts in WordPress, don't do anything
//   if (!posts.length) {
//     return
//   }

//   // If there are posts, create pages for them
//   await createIndividualBlogPostPages({ posts, gatsbyUtilities })

//   // And a paginated archive
//   await createBlogPostArchive({ posts, gatsbyUtilities })
// }

// /**
//  * This function creates all the individual blog pages in this site
//  */
// const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
//   Promise.all(
//     posts.map(({ previous, post, next }) =>
//       // createPage is an action passed to createPages
//       // See https://www.gatsbyjs.com/docs/actions#createPage for more info
//       gatsbyUtilities.actions.createPage({
//         // Use the WordPress uri as the Gatsby page path
//         // This is a good idea so that internal links and menus work 👍
//         path: post.uri,

//         // use the blog post template as the page component
//         component: path.resolve(`./src/templates/blog-post.js`),

//         // `context` is available in the template as a prop and
//         // as a variable in GraphQL.
//         context: {
//           // we need to add the post id here
//           // so our blog post template knows which blog post
//           // the current page is (when you open it in a browser)
//           id: post.id,

//           // We also use the next and previous id's to query them and add links!
//           previousPostId: previous ? previous.id : null,
//           nextPostId: next ? next.id : null,
//         },
//       })
//     )
//   )

// /**
//  * This function creates all the individual blog pages in this site
//  */
// async function createBlogPostArchive({ posts, gatsbyUtilities }) {
//   const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
//     {
//       wp {
//         readingSettings {
//           postsPerPage
//         }
//       }
//     }
//   `)

//   const { postsPerPage } = graphqlResult.data.wp.readingSettings

//   const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
//   const totalPages = postsChunkedIntoArchivePages.length

//   return Promise.all(
//     postsChunkedIntoArchivePages.map(async (_posts, index) => {
//       const pageNumber = index + 1

//       const getPagePath = page => {
//         if (page > 0 && page <= totalPages) {
//           // Since our homepage is our blog page
//           // we want the first page to be "/" and any additional pages
//           // to be numbered.
//           // "/blog/2" for example
//           return page === 1 ? `/` : `/blog/${page}`
//         }

//         return null
//       }

//       // createPage is an action passed to createPages
//       // See https://www.gatsbyjs.com/docs/actions#createPage for more info
//       await gatsbyUtilities.actions.createPage({
//         path: getPagePath(pageNumber),

//         // use the blog post archive template as the page component
//         component: path.resolve(`./src/templates/blog-post-archive.js`),

//         // `context` is available in the template as a prop and
//         // as a variable in GraphQL.
//         context: {
//           // the index of our loop is the offset of which posts we want to display
//           // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
//           // etc
//           offset: index * postsPerPage,

//           // We need to tell the template how many posts to display too
//           postsPerPage,

//           nextPagePath: getPagePath(pageNumber + 1),
//           previousPagePath: getPagePath(pageNumber - 1),
//         },
//       })
//     })
//   )
// }

// /**
//  * This function queries Gatsby's GraphQL server and asks for
//  * All WordPress blog posts. If there are any GraphQL error it throws an error
//  * Otherwise it will return the posts 🙌
//  *
//  * We're passing in the utilities we got from createPages.
//  * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
//  */
// async function getPosts({ graphql, reporter }) {
//   const graphqlResult = await graphql(/* GraphQL */ `
//     query WpPosts {
//       # Query all WordPress blog posts sorted by date
//       allWpPost(sort: { fields: [date], order: DESC }) {
//         edges {
//           previous {
//             id
//           }

//           # note: this is a GraphQL alias. It renames "node" to "post" for this query
//           # We're doing this because this "node" is a post! It makes our code more readable further down the line.
//           post: node {
//             id
//             uri
//           }

//           next {
//             id
//           }
//         }
//       }
//     }
//   `)

//   if (graphqlResult.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading your blog posts`,
//       graphqlResult.errors
//     )
//     return
//   }

//   return graphqlResult.data.allWpPost.edges
// }
