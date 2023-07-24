import Layout from "../components/Layout"
import Image from "next/image"

const aboutus = () => {
    return(
        <Layout>
            <h1 className="w-full flex justify-center flex-nowrap" style={{fontSize:30, color: "white", backgroundColor: "#2F4993"}}>Thank you For Choosing TC</h1><br/>
            <h2 className="w-full flex justify-center" style={{fontSize:25, color: "#2F4993"}}>We Grow As...You Grow...</h2>
            <Image src = {`/images/background6.jpeg`} width={100} height={100} className="full-screen"></Image>
            <p>who are we ?</p>
        </Layout>
    )
}
export default aboutus