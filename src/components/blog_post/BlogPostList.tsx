import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import BlogPostCard from "./BlogPostCard";
import { fetchPosts } from "../../state/post/postSlice";

export default function BlogPostList() {
  const postState = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      {postState.error ? (
        <div className="h-[200px] flex items-center justify-center text-xl font-semibold">
          {postState.error}
        </div>
      ) : postState.loading ? (
        <div className="h-[200px] flex items-center justify-center text-xl font-semibold">
          Loading...
        </div>
      ) : !postState.posts.length ? (
        <div className="h-[200px] flex items-center justify-center text-xl font-semibold">
          There is no posts. You can be the first one to do it. Just log in and
          create a new post.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-x-4 gap-y-8">
          {postState.posts.map((post) => (
            <BlogPostCard post={post} key={post.id} />
          ))}
        </div>
      )}
    </>
  );
}
