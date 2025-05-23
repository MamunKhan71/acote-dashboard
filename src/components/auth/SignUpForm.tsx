import { useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useForm } from 'react-hook-form'
import { useCreateAdminMutation } from "../../redux/endpoints/userEndpoints";
type SignUpFormFields = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export default function SignUpForm() {
  const { register, handleSubmit } = useForm<SignUpFormFields>();
  const [createAdmin, { data }] = useCreateAdminMutation();

  console.log(data)

  const onSubmit = async (data: SignUpFormFields) => {
    const fullName = `${data?.first_name} ${data.last_name}`
    const newAdmin = {
      name: fullName,
      email: data.email,
      password: data.password
    }
    console.log(newAdmin)
    const result = await createAdmin(newAdmin)
    console.log(result)

  }

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar relative">
      <div>
        <img src="login-bg.jpg" alt="login-bg" className="absolute w-full h-full inset-0 -z-10 object-cover" />
        <div className="absolute inset-0 bg-black/50 -z-10"></div>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-lg mx-auto">
        <div className="backdrop-blur-2xl p-12 rounded-xl shadow-lg border border-brand-900">
          <div className="mb-5 sm:mb-8 text-center">
            <h1 className="mb-2 font-semibold text-white text-title-sm dark:text-white/90 sm:text-title-md">
              Register
            </h1>
            <p className="text-sm text-gray-300 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- First Name --> */}
                  <div className="sm:col-span-1">
                    <Label
                      className="text-white">
                      First Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      className="text-white"
                      type="text"
                      id="first_name"
                      {...register('first_name')}
                      placeholder="Enter your first name"
                    />
                  </div>
                  {/* <!-- Last Name --> */}
                  <div className="sm:col-span-1">
                    <Label
                      className="text-white">
                      Last Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      className="text-white"
                      type="text"
                      id="lname"
                      {...register('last_name')}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                {/* <!-- Email --> */}
                <div>
                  <Label
                    className="text-white">
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    className="text-white"
                    type="email"
                    id="email"
                    {...register('email')}
                    placeholder="Enter your email"
                  />
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label
                    className="text-white">
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      className="text-white"
                      placeholder="Enter your password"
                      {...register('password')}
                      type={showPassword ? "text" : "password"}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <button type="submit" className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-300 dark:text-gray-400 sm:text-start">
                Already have an account? {""}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
