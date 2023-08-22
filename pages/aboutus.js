import Layout from "../components/Layout"
import Image from "next/image"

const aboutus = () => {
    return(
        <Layout>
            <h1 className="w-full flex justify-center flex-nowrap" style={{fontSize:30, color: "white", backgroundColor: "#2F4993"}}>Thank you For Choosing TC</h1><br/>
            <h2 className="w-full flex justify-center" style={{fontSize:25, color: "#2F4993"}}>We Grow As...You Grow...</h2>
            <Image src = {`/images/background6.jpeg`} width={100} height={100} className="full-screen"></Image><br/>
            <p style={{color: "#023B8D"}} className="flex justify-center">Welcome to Transcontinental Connections, the leading cross-border trade hub in South East Asia, with headquarters in Bangkok and Dhaka. Our primary mission is to facilitate seamless global trade for importers and exporters, providing them with access to the best prices and exceptional services worldwide.

At Transcontinental Connections, we specialize in dealing with Heavy Machinery, Cars, Raw Materials, and a diverse range of import items, including steel, excavators, and construction materials. As a dynamic platform, we empower entrepreneurs to open their own shops and showcase their unique products, reaching a vast international audience.

Our core focus lies in connecting importers and exporters across the South East Asia region, fostering strong business relationships, and propelling growth for all our partners. Whether youre an established player or a newcomer, Transcontinental Connections offers the perfect launchpad to initiate and expand your business ventures with utmost confidence.

Explore our user-friendly website to effortlessly browse through a myriad of products and take advantage of our streamlined buying and importation process. Trust in our dedicated team, committed to making your trading experience efficient, successful, and profitable. Join us on this transformative journey and embrace endless possibilities in the world of global trade.</p>

<br></br>

        
<div className="card p-5" style={{ color: "#091E5F", backgroundColor: "#D5D9E8" }}>      
<p className=' flex justify-center' style={{ color: "Blue", fontSize: 25, whiteSpace: "nowrap" }}>Contact Us</p><br /> 
            <button
              className="ml-0 flex justify-center primary-button4 w-full" style={{border:"1px solid black",padding:"10px", borderRadius: "4px"}}
              onClick={()=>{window.location.href=`tel:${+660932503470}`}}
            >
              <Image src={`/images/call2.png`} width={40} height={40} /> <p className='ml-4 mt-1 flex justify-center' style={{ color: "white", fontSize: 22 }}>Call</p><br />
            </button> <br />
            <button
              className="ml-0 flex justify-center primary-button2 w-full"
              onClick={()=>{window.location.href=`https://wa.me/+66932503470`}} style={{border:"1px solid black",padding:"10px", borderRadius: "4px"}}
            >
              <Image src={`/images/wasap.png`} width={40} height={40} /> <p className='ml-4 mt-1 flex justify-center' style={{ color: "White", fontSize: 22 }}>Whatsapp</p><br />
            </button> <br />

            <button
              className="ml-0 flex justify-center primary-button3 w-full"
              onClick={()=>{window.location.href=`https://m.me/afif.mansib`}} style={{border:"1px solid black",padding:"10px", borderRadius: "4px"}}
            >
              <Image src={`/images/ms1.png`} width={40} height={40} /> <p className='ml-4 mt-1 flex justify-center' style={{ color: "black", fontSize: 22 }}
              >Messenger</p><br />
            </button>
        </div>
        </Layout>
    )
}
export default aboutus