import { useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../../redux/endpoints/userEndpoints";

interface SignInFormInputs {
  email: string;
  password: string;
}
export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser] = useLoginUserMutation()
  const { register, handleSubmit } = useForm<SignInFormInputs>()

  const handleOnSubmit = async (data: SignInFormInputs): Promise<void> => {
    const result = await loginUser({
      email: data?.email,
      password: data?.password
    })
    console.log(result)
  }
  return (
    <div className="flex flex-col flex-1 relative">
      <div>
        <img src="login-bg.jpg" alt="login-bg" className="absolute w-full h-full inset-0 -z-10 object-cover" />
        <div className="absolute inset-0 bg-black/50 -z-10"></div>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-lg mx-auto">
        <div className="backdrop-blur-2xl p-12 rounded-xl shadow-lg border border-brand-900">
          <div className="mb-5 sm:mb-8 text-center">
            <h1 className="mb-2 font-semibold text-white text-title-sm dark:text-white/90 sm:text-title-md">
              Log in
            </h1>
            <p className="text-sm text-gray-200 dark:text-gray-400">
              Enter your email and password to login!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <div className="space-y-6">
                <div>
                  <Label className="text-white">
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="info@acotegroup.com" className="text-white" {...register('email')} />
                </div>
                <div>
                  <Label className="text-white">
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="text-white"
                      {...register('password')}
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
                <div className="flex items-center justify-end">
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm">
                    Log in
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-300 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
