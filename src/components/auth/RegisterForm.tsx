import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../state/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { ROUTE_PATHS } from "../../types/routes";
import { initialFormData } from "../../types/user";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [x: string]: string[] }>({});
  const { loading, error } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialFormData);

  const handleRegister = async () => {
    setErrors({});

    const result = await dispatch(register(formData));
    if (register.rejected.match(result)) {
      setErrors({ ...result.payload });
    }
    if (register.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form className="rounded px-8 py-8 mb-4">
        <h2 className="text-4xl mb-6 text-center font-semibold">Register</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="first_name"
          >
            First name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="first_name"
            type="text"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            required
          />
          {errors["first_name"] && (
            <div className="text-red-500 mb-4">*{errors["first_name"]}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="last_name"
          >
            Last name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="last_name"
            type="text"
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
            required
          />
          {errors["last_name"] && (
            <div className="text-red-500 mb-4">*{errors["last_name"]}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          {errors["email"] && (
            <div className="text-red-500 mb-4">*{errors["email"]}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          {errors["password"] && (
            <div className="text-red-500 mb-4">*{errors["password"]}</div>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password_confirmation"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password_confirmation"
            type="password"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
            required
          />
          {errors["password_confirmation"] && (
            <div className="text-red-500 mb-4">
              *{errors["password_confirmation"]}
            </div>
          )}
        </div>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="flex flex-col items-center gap-4">
          <button
            className="w-[200px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
            onClick={() => handleRegister()}
          >
            {loading ? "Loading..." : "Register"}
          </button>
          <button
            onClick={() => navigate(ROUTE_PATHS.LOGIN)}
            className="text-sm"
          >
            Sign in!
          </button>
        </div>
      </form>
    </div>
  );
}
