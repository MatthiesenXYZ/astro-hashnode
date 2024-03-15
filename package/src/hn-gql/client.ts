import { gql, GraphQLClient } from "graphql-request";
import type { AllPostsData, PostOrPageData, PublicationData } from "./schema";
import config from "virtual:astro-hashnode/config";

export const getClient = () => { 
  return new GraphQLClient("https://gql.hashnode.com") 
}

export function removeHTTPSProtocol(url: string) {
  return url.replace(/^https?:\/\//, '');
}
export function removeHTTPProtocol(url: string) {
  const fixHTTPS = removeHTTPSProtocol(url);
  return fixHTTPS.replace(/^http?:\/\//, '');
}

const newURL = removeHTTPProtocol(config.hashnodeURL);

export const getAllPosts = async () => {
  const client = getClient();

  const allPosts = await client.request<AllPostsData>(
    gql`
      query allPosts {
        publication(host: "${newURL}") {
          title
          posts(first: 20) {
            pageInfo{
              hasNextPage
              endCursor
            }
            edges {
              node {
                author{
                  name
                  profilePicture
                }
                title
                subtitle
                brief
                slug
                coverImage {
                  url
                }
                tags {
                  name
                  slug
                }
                publishedAt
                readTimeInMinutes
              }
            }
          }
        }
      }
    `
  );

  return allPosts;
};


export const getPost = async (slug: string) => {
  const client = getClient();

  const data = await client.request<PostOrPageData>(
    gql`
      query postDetails($slug: String!) {
        publication(host: "${newURL}") {
          post(slug: $slug) {
            author{
              name
              profilePicture
            }
            publishedAt
            title
            subtitle
            readTimeInMinutes
            content{
              html
            }
            tags {
              name
              slug
            }
            coverImage {
              url
            }
          }
        }
      }
    `,
    { slug: slug }
  );
      
  return data.publication.post;
};

export const getAboutPage = async () => {
  const client = getClient();

  const page = await client.request<PostOrPageData>(
    gql`
      query pageData {
        publication(host: "${newURL}") {
          staticPage(slug: "about") {
            title
            content {
              markdown
            }
          }
          title
        }
      }
    `
  );

  return page.publication.staticPage;
};

export const getPublication = async () => {
  const client = getClient();

  const data = await client.request<PublicationData>(
    gql`
      query pubData {
        publication(host: "${newURL}") {
          title
          displayTitle
          descriptionSEO
          favicon
          preferences {
            logo
            disableFooterBranding
          }
          links{
            twitter
            instagram
            github
            website
            hashnode
            youtube
            dailydev
            linkedin
            mastodon
          }
        } 
      }
    `
    );
    return data.publication;
}