import { useEffect, useState } from "react";
import PostRead from "./PostRead";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import PostForm from "./PostForm";
import { deletePost, fetchPost } from "../../state/post/postSlice";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_PATHS } from "../../types/routes";

export default function Post() {
  const [isPostEditMode, setPostEditMode] = useState(false);
  const navigate = useNavigate();
  const postState = useAppSelector((state) => state.post);
  const authState = useAppSelector((state) => state.auth);
  const [post, setPost] = useState(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const dispatch = useAppDispatch();

  const getPost = async () => {
    try {
      const result = await dispatch(fetchPost(Number(params?.id)));
      if (fetchPost.fulfilled.match(result)) {
        setPost(result.payload);
      }
    } catch (err) {
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPost();
    } else {
      setPost(null);
    }
  }, [params]);

  function handleDelete() {
    const answer = confirm("Are you sure you want to delete this post?");
    if (answer) {
      dispatch(deletePost(post!.id));
      navigate(ROUTE_PATHS.BLOGPOSTLIST);
    }
  }

  return (
    <>
      {isPostEditMode ? (
        <PostForm
          post={postState.selectedPost}
          onClickCancel={() => setPostEditMode(false)}
        />
      ) : isLoading ? (
        <div className="h-[200px] flex items-center justify-center text-xl font-semibold">
          Loading...
        </div>
      ) : error ? (
        <div className="h-[200px] flex items-center justify-center text-xl font-semibold">
          {error}
        </div>
      ) : (
        <div>
          {authState.user?.id === post!.author.id && (
            <div className="flex justify-end gap-2 mb-2">
              <button
                onClick={() => handleDelete()}
                className="font-medium text-white bg-red-700 p-1 w-[100px] border-2 border-red-600 rounded-lg hover:opacity-95"
              >
                Delete
              </button>
              <button
                onClick={() => setPostEditMode(true)}
                className="font-medium text-white bg-blue-700 p-1 w-[100px] border-2 border-blue-600 rounded-lg hover:opacity-95"
              >
                Edit
              </button>
            </div>
          )}
          <PostRead post={post!} />
        </div>
      )}
    </>
  );
}
