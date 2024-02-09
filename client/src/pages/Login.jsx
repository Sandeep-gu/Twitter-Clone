import { TiMessages } from "react-icons/ti";
import React from "react";

const Login = () => {
	return (
		<div className="h-screen flex justify-center items-center border-red-600 border-2">
			<div className="md:w-[70%] w-[90%] border flex flex-col md:flex-row rounded-lg shadow-md md:h-[500px] h-[600px]">
				<div className="left-body rounded-s-lg h-[200px] md:w-[40%] flex justify-center items-center flex-col text-white w-full md:h-full bg-blue-700 border">
					<div className="text-3xl">Welcome Back</div>
					<TiMessages className="md:text-[100px] text-5xl" />
				</div>
				<div className="right-body rounded-e-lg flex justify-center items-center md:w-[60%] h-full">
					<form
						action=""
						className="w-[90%] flex flex-col md:gap-5 gap-3 h-[60%]"
					>
						<h1 className="font-extrabold text-6xl">Log In</h1>
						<input
							type="text"
							placeholder="Username"
							className="input input-bordered w-full "
						/>
						<input
							type="password"
							placeholder="Password"
							className="input input-bordered w-full "
						/>
						<button
							type="submit"
							className="btn self-start px-7 btn-neutral"
						>
							Login
						</button>
						<div>
							<span>
								Create account here?{" "}
								<a href="" className="text-blue-600 underline">
									Register Here
								</a>
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
