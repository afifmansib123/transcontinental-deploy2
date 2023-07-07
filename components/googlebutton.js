import { signIn } from "next-auth/react"
import Image from "next/image"

export const GoogleButton = () => {
    const handlechick = () => {
        signIn("google")
    }

    return(
        <button className="w-full ml-4 flex justify-center" onClick={handlechick} style={{fontSize:20}}>
        <Image src={`/images/glogo.png`} alt="google logo" height={20} width={20}/>
        <span className="ml-4 flex justify-center">Sign In With Google</span>
        </button>
    )
}