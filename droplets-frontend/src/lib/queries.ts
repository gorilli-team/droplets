// lib/queries.ts
import { gql } from "@apollo/client";

export const GET_PROFILE_BY_HANDLE = gql`
  query ($handle: Handle!) {
    profile(request: { forHandle: $handle }) {
      id
      handle {
        localName
        namespace
      }
      createdAt
      metadata {
        bio
        picture {
          ... on ImageSet {
            __typename
            optimized {
              uri
            }
          }
        }
        coverPicture {
          optimized {
            uri
          }
        }
      }
      ownedBy {
        address
        chainId
      }
      stats {
        followers
        following
        posts
      }
    }
  }
`;

export const GET_PUBLICATIONS_BY_PROFILE_ID = gql`
  query ($profileId: [ProfileId!]) {
    publications(request: { where: { from: $profileId }, limit: Ten }) {
      items {
        ... on Post {
          id
          createdAt
          stats {
            bookmarks
            comments
            mirrors
            quotes
            reactions
          }
          metadata {
            ... on TextOnlyMetadataV3 {
              id
              attributes {
                key
                type
                value
              }
              content
            }
            ... on VideoMetadataV3 {
              id
              appId
              attachments {
                ... on PublicationMetadataMediaVideo {
                  duration
                  license
                  altTag
                }
              }
              content
              contentWarning
            }
            ... on ImageMetadataV3 {
              id
              title
              rawURI
              content
            }
            ... on AudioMetadataV3 {
              id
              content
            }
            ... on ArticleMetadataV3 {
              id
              content
            }
            ... on EventMetadataV3 {
              id
              content
            }
            ... on LinkMetadataV3 {
              id
              content
            }
            ... on EmbedMetadataV3 {
              id
              content
            }
            ... on CheckingInMetadataV3 {
              id
              content
            }
          }
        }
      }
      pageInfo {
        next
        prev
      }
    }
  }
`;

export const GET_ALL_PROFILES = gql`
  query {
    exploreProfiles(
      request: { orderBy: CREATED_ON, where: {}, limit: TwentyFive }
    ) {
      items {
        id
        invitesLeft
        followNftAddress {
          address
          chainId
        }
        metadata {
          bio
          picture {
            ... on ImageSet {
              __typename
              raw {
                uri
              }
            }
          }
        }
        handle {
          localName
        }
        stats {
          followers
          following
          posts
        }
      }
    }
  }
`;
