import { useState } from "react"
import GenderCheckBox from "./genderCheckBox"
import useSignup from "../../hooks/useSignup"

const SignUp =()=>{
    const [inputs,setInputs]=useState({
        fullName: "",
        userName: "",
        password:"",
        confirmPassword:"",
        gender:""
    })

    const handleGender=(gender)=>{
        setInputs({...inputs,gender})
    }

    const {loading,signup}=useSignup()

    const handleSubmit=(e)=>{
        e.preventDefault()
        signup(inputs)
    }

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl fontsemibold text-center text-gray-300">SignUp<span className="text-blue-500"> ChatApp</span>
            </h1>
            <form onSubmit={handleSubmit}>
            <div>
            <label className="label p-2">
             <span className="text-base label-text">FullName</span></label>
             <input type="text" placeholder="Enter FullName" className="w-full input input-bordered h-10" value={inputs.fullName} onChange={(e)=>{setInputs({...inputs,fullName:e.target.value})}}/>
            </div>

            <div>
            <label className="label p-2">
             <span className="text-base label-text">UserName</span></label>
             <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10" value={inputs.userName} onChange={(e)=>{setInputs({...inputs,userName:e.target.value})}}/>
            </div>

            <div>
            <label className="label p-2">
             <span className="text-base label-text">Password</span></label>
             <input type="Password" placeholder="Enter Password" className="w-full input input-bordered h-10" value={inputs.password} onChange={(e)=>{setInputs({...inputs,password:e.target.value})}}/>
            </div>

            <div>
            <label className="label p-2">
             <span className="text-base label-text">Confirm Password</span></label>
             <input type="Password" placeholder="Confirm Password" className="w-full input input-bordered h-10" value={inputs.confirmPassword} onChange={(e)=>{setInputs({...inputs,confirmPassword:e.target.value})}}/>
            </div>
            <GenderCheckBox onCheckBoxChange={handleGender} selectedGender={inputs.gender}/>

            <a href="/login" className="tex-sm hover:underline hover:text-blue-400 mt-2 inline-block">Already have an Account</a>

            <button className="btn btn-block btn-sm mt-2" disabled={loading}>{loading ? <span className="loading loading-spinner"></span> : "Sign-up"}</button>
            </form>
        </div>
        </div>
    )
}
export default SignUp



//starter code for signup

// import GenderCheckBox from "./genderCheckBox"

// const SignUp =()=>{
//     return (
//         <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//         <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//             <h1 className="text-3xl fontsemibold text-center text-gray-300">SignUp<span className="text-blue-500"> ChatApp</span>
//             </h1>
//             <form>
//             <div>
//             <label className="label p-2">
//              <span className="text-base label-text">FullName</span></label>
//              <input type="text" placeholder="Enter FullName" className="w-full input input-bordered h-10"/>
//             </div>

//             <div>
//             <label className="label p-2">
//              <span className="text-base label-text">UserName</span></label>
//              <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10"/>
//             </div>

//             <div>
//             <label className="label p-2">
//              <span className="text-base label-text">Password</span></label>
//              <input type="Password" placeholder="Enter Password" className="w-full input input-bordered h-10"/>
//             </div>

//             <div>
//             <label className="label p-2">
//              <span className="text-base label-text">Confirm Password</span></label>
//              <input type="Password" placeholder="Confirm Password" className="w-full input input-bordered h-10"/>
//             </div>
//             <GenderCheckBox />

//             <a href="#" className="tex-sm hover:underline hover:text-blue-400 mt-2 inline-block">Already have an Account</a>

//             <button className="btn btn-block btn-sm mt-2">SignUp</button>
//             </form>
//         </div>
//         </div>
//     )
// }
// export default SignUp