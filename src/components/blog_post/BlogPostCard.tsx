import { Link } from "react-router-dom";
import { useAppDispatch } from "../../state/hooks";
import { setSelectedPost } from "../../state/post/postSlice";
import { Post } from "../../types/post";

export default function BlogPostCard({ post }: { post: Post }) {
  const dispatch = useAppDispatch();
  return (
    <div className="shadow-md">
      <img
        src={`https://picsum.photos/id/${post.id}/1200/1200`}
        alt="Blog Post Image"
        className="h-[300px] w-full object-cover object-top"
      />
      <div className="flex flex-col gap-2 p-2">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <span className="mb-4">
          Posted by {post.author.first_name} {post.author.last_name} -{" "}
          {new Date(post.published_at).toLocaleDateString()}
        </span>
        <p className="h-[200px] leading-8 overflow-hidden break-words">
          {post.description}
        </p>
      </div>
      <Link to={`/posts/${post.id}`}>
        <button
          onClick={() => dispatch(setSelectedPost(post))}
          className="bg-gray-800 text-white p-2 w-full hover:opacity-95"
        >
          Read More
        </button>
      </Link>
    </div>
  );
}
