import Layout from "../components/Layout"
import Image from "next/image"

const aboutus = () => {
    return(
        <Layout>
            <h1 className="w-full flex justify-center flex-nowrap" style={{fontSize:30, color: "white", backgroundColor: "#2F4993"}}>Thank you For Choosing TC</h1><br/>
            <h2 className="w-full flex justify-center" style={{fontSize:25, color: "#2F4993"}}>We Grow As...You Grow...</h2>
            <Image src = {`/images/background6.jpeg`} width={100} height={100} className="full-screen"></Image><br/>
            <p style={{color: "#023B8D"}}>Welcome to Transcontinental Connections, the leading cross-border trade hub in South East Asia, with headquarters in Bangkok and Dhaka. Our primary mission is to facilitate seamless global trade for importers and exporters, providing them with access to the best prices and exceptional services worldwide.

At Transcontinental Connections, we specialize in dealing with Heavy Machinery, Cars, Raw Materials, and a diverse range of import items, including steel, excavators, and construction materials. As a dynamic platform, we empower entrepreneurs to open their own shops and showcase their unique products, reaching a vast international audience.

Our core focus lies in connecting importers and exporters across the South East Asia region, fostering strong business relationships, and propelling growth for all our partners. Whether you're an established player or a newcomer, Transcontinental Connections offers the perfect launchpad to initiate and expand your business ventures with utmost confidence.

Explore our user-friendly website to effortlessly browse through a myriad of products and take advantage of our streamlined buying and importation process. Trust in our dedicated team, committed to making your trading experience efficient, successful, and profitable. Join us on this transformative journey and embrace endless possibilities in the world of global trade</p>
        </Layout>
    )
}
export default aboutus