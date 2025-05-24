import { useState } from "react";
import { useForm } from 'react-hook-form';
import { EyeCloseIcon, EyeIcon } from "../../icons";
import { useCreateAdminMutation } from "../../redux/endpoints/userEndpoints";
import Label from "../form/Label";
import Input from "../form/input/InputField";
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
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-full no-scrollbar relative">
      <div className="flex flex-col justify-start flex-1 w-full p-8">
        <div>
          <div className="mb-5 sm:mb-8 text-left">
            <h1 className="mb-2 font-semibold text-black dark:text-white text-title-sm">
              Make Admin
            </h1>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Enter the following information to create a new admin account.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- First Name --> */}
                  <div className="sm:col-span-1">
                    <Label
                      className="text-black dark:text-white">
                      First Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      className="text-black dark:text-white"
                      type="text"
                      id="first_name"
                      {...register('first_name')}
                      placeholder="Enter your first name"
                    />
                  </div>
                  {/* <!-- Last Name --> */}
                  <div className="sm:col-span-1">
                    <Label
                      className="text-black dark:text-white">
                      Last Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      className="text-black dark:text-white"
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
                    className="text-black dark:text-white">
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    className="text-black dark:text-white"
                    type="email"
                    id="email"
                    {...register('email')}
                    placeholder="Enter your email"
                  />
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label
                    className="text-black dark:text-white">
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      className="text-black dark:text-white"
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
                  <button type="submit" className="flex items-center gap-1 justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-shield-plus-icon lucide-shield-plus"
                    >
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                      <path d="M9 12h6" />
                      <path d="M12 9v6" />
                    </svg>

                    Grant Access
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
