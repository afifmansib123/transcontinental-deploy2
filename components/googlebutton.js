import { signIn } from "next-auth/react"

export const GoogleButton = () => {
    const handlechick = () => {
        signIn("google")
    }

    return(
        <button onClick={handlechick}>login with google</button>
    )
}