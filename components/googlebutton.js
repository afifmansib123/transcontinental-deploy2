import { signIn } from "next-auth/react"
import Image from "next/image"

export const GoogleButton = () => {
    const handlechick = () => {
        signIn("google")
    }

    return(
        <button className="w-full flex items-center" onClick={handlechick}>
        <Image src={`/images/glogo.png`} alt="google logo" height={20} width={20}/>
        <span className="ml-4">Sign In With Google</span>
        </button>
    )
}