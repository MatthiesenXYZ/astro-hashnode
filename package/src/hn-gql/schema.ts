import { z } from "astro/zod";

export const PostSchema = z.object({
    author: z.object({
        name: z.string(),
        profilePicture: z.string(),
        }),
    publishedAt: z.string(),
    title: z.string(),
    subtitle: z.string(),
    brief: z.string(),
    slug: z.string(),
    readTimeInMinutes: z.number(),
    content: z.object({
        html: z.string(),
    }),
    tags: z.array(z.object({
        name: z.string(),
        slug: z.string(),
    })),
    coverImage: z.object({
        url: z.string(),
    }),
})

export const PageSchema = z.object({
    title: z.string(),
    content: z.object({
        markdown: z.string(),
    }),
})

export const PostOrPageDataSchema = z.object({
    publication: z.object({
        title: z.string(),
        post: PostSchema,
        staticPage: PageSchema,
    }),

})

export const AllPostsDataSchema = z.object({
    publication: z.object({
        title: z.string(),
        posts: z.object({
            pageInfo: z.object({
                hasNextPage: z.boolean(),
                endCursor: z.string(),
            }),
            edges: z.array(z.object({
                node: PostSchema,
            })),
        }),
    }),
})

export const PublicationDataSchema = z.object({
    publication: z.object({
        title: z.string(),
        displayTitle: z.string(),
        descriptionSEO: z.string(),
        favicon: z.string(),
        preferences: z.object({
            logo: z.string(),
            disableFooterBranding: z.boolean(),
        }),
        links: z.object({
            twitter: z.string(),
            instagram: z.string(),
            github: z.string(),
            website: z.string(),
            hashnode: z.string(),
            youtube: z.string(),
            dailydev: z.string(),
            linkedin: z.string(),
            mastodon: z.string(),
        }),
    }),
})

export const AllPostsGeneratedSchema = z.object({
    node: PostSchema,
})

export type PostOrPageData = z.infer<typeof PostOrPageDataSchema>
export type AllPostsData = z.infer<typeof AllPostsDataSchema>
export type PublicationData = z.infer<typeof PublicationDataSchema>
export type AllPostsGenerated = z.infer<typeof AllPostsGeneratedSchema>
export type Post = z.infer<typeof PostSchema>