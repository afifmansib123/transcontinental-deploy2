import { signIn } from "next-auth/react"
import Image from "next/image"

export const GoogleButton = () => {
    const handlechick = () => {
        signIn("google")
    }

    return(
        <button className="primary-button8 w-full ml-0 flex justify-center" onClick={handlechick} style={{fontSize:18,color:"white"}}>
        <Image src={`/images/googlecircle.png`} alt="google logo" height={20} width={20} className="mt-0.5"/>
        <span className="ml-4 flex justify-center">Sign In With Google</span>
        </button>
    )
}