import { useState } from "react";
import { initialPostData, Post, POST_CRUD, PostData } from "../../types/post";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../state/hooks";
import { createPost, updatePost } from "../../state/post/postSlice";

export default function PostForm({
  post,
  onClickCancel,
}: {
  post: Post | null;
  onClickCancel: () => void;
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(post ? post : initialPostData);

  const [errors, setErrors] = useState<{ [x: string]: string[] }>({});
  const dispatch = useAppDispatch();

  const handleForm = async (formAction: POST_CRUD) => {
    setErrors({});

    try {
      switch (formAction) {
        case POST_CRUD.CREATE:
          await dispatch(createPost(formData as PostData)).unwrap();
          break;
        case POST_CRUD.UPDATE:
          await dispatch(updatePost(formData as Post)).unwrap();
          break;
      }
      setFormData(initialPostData);
      navigate("/");
    } catch (err: any) {
      setErrors(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {post ? "Edit post" : "Create post"}
      </h1>
      <form className="flex flex-col gap-8">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="mt-1 block w-full border-2 rounded-md border-gray-300 shadow-sm p-2"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          {errors["title"] && (
            <div className="text-red-500">*{errors["title"]}</div>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            className="mt-1 block w-full border-2 rounded-md border-gray-300 shadow-sm p-2"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={8}
            required
          />
          {errors["description"] && (
            <div className="text-red-500">*{errors["description"]}</div>
          )}
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            className="mt-1 block w-full border-2 rounded-md border-gray-300 shadow-sm p-2"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            rows={8}
            required
          />
          {errors["content"] && (
            <div className="text-red-500">*{errors["content"]}</div>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => onClickCancel()}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={() =>
              handleForm(post ? POST_CRUD.UPDATE : POST_CRUD.CREATE)
            }
          >
            {post ? "Update post" : "Create post"}
          </button>
        </div>
      </form>
    </div>
  );
}
