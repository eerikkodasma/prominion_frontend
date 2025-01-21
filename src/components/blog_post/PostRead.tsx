import { Post } from "../../types/post";

export default function PostRead({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-4">
      <article className="flex gap-8">
        <img
          src={`https://picsum.photos/id/${post.id}/1200/1200`}
          alt="Blog Post Image"
          className="h-[300px] object-cover object-top"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold">
            {post.title}
            <span className="text-sm text-gray-400 ml-1">
              - {post.author.first_name} {post.author.last_name}{" "}
              {new Date(post.published_at).toLocaleDateString()}
            </span>
          </h1>
          {post.description}
        </div>
      </article>
      <div>{post.content}</div>
    </div>
  );
}
