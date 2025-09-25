import { db } from '@/db';

// export type PostForListDisplay = Post & {
//   topic: {
//     slug: string;
//   };
//   user: {
//     name: string | null;
//   };
//   _count: {
//     comments: number;
//   };
// };

export type PostForListDisplay = Awaited<
  ReturnType<typeof fetchPostsByTopicSlug>
>[number]; // the [number] means take the type of one element inside the array

export async function fetchPostsByTopicSlug(slug: string) {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      user: { select: { name: true } },
      topic: { select: { slug: true } },
      _count: {
        select: { comments: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function fetchTopPosts(): Promise<PostForListDisplay[]> {
  return db.post.findMany({
    orderBy: [
      {
        comments: {
          _count: 'desc',
        },
      },
    ],
    include: {
      user: { select: { name: true } },
      topic: { select: { slug: true } },
      _count: {
        select: { comments: true },
      },
    },
    take: 5,
  });
}

export async function fetchPostsBySearchTerm(
  term: string
): Promise<PostForListDisplay[]> {
  return db.post.findMany({
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
    include: {
      user: { select: { name: true } },
      topic: { select: { slug: true } },
      _count: {
        select: { comments: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}
