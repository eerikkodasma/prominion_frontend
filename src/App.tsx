import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import BlogPostList from "./components/blog_post/BlogPostList";
import NotFoundPage from "./components/NotFoundPage";
import { ROUTE_PATHS } from "./types/routes";
import Post from "./components/blog_post/Post";
import PostForm from "./components/blog_post/PostForm";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import Alert from "./components/Alert";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import { logout } from "./state/auth/authSlice";
import { setSelectedPost } from "./state/post/postSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const postState = useAppSelector((state) => state.post);
  const authState = useAppSelector((state) => state.auth);

  return (
    <>
      <Alert />
      <div className="container mx-auto p-4 shadow-lg m-[10%]">
        <div className="flex justify-between items-baseline gap-4 mb-8">
          <div className="flex gap-4 items-end">
            <h1 className="text-6xl">
              <Link to={ROUTE_PATHS.BLOGPOSTLIST}>Blog</Link>
            </h1>
            {authState.user?.id && (
              <Link to={ROUTE_PATHS.POSTFORM}>
                <button
                  onClick={() => dispatch(setSelectedPost(null))}
                  className="border-black border-2 rounded-md font-medium px-2 py-1 hover:bg-slate-50"
                >
                  Create a post +
                </button>
              </Link>
            )}
          </div>
          <div className="flex gap-2 items-center text-lg font-semibold">
            {authState.user ? (
              <>
                <span className="text-gray-500 text-sm">
                  Author: {authState.user.first_name} {authState.user.last_name}
                </span>
                <button
                  onClick={() => dispatch(logout())}
                  className="bg-black rounded-md text-white font-medium px-2 py-1 hover:bg-gray-700"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link to={ROUTE_PATHS.LOGIN}>
                <button className="bg-black rounded-md text-white font-medium px-2 py-1 hover:bg-gray-700">
                  Log in
                </button>
              </Link>
            )}
          </div>
        </div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path={ROUTE_PATHS.BLOGPOSTLIST} element={<BlogPostList />} />
          <Route
            path={ROUTE_PATHS.POSTFORM}
            element={
              <PostForm
                post={postState.selectedPost}
                onClickCancel={() => navigate(ROUTE_PATHS.BLOGPOSTLIST)}
              />
            }
          />
          <Route path={ROUTE_PATHS.POST} element={<Post />} />
          <Route path={ROUTE_PATHS.NOTFOUNDPAGE} element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
