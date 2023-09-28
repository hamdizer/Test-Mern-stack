import { useEffect, useState } from "react"
import Menu from "../../components/Menu"
import { Country, Product } from "../../types"
import Card from "../../components/Card"
import { getAllProducts } from "../../services/product"
import Popup from "../../components/Popup"
import { getAllCountries } from "../../services/country"
import { Select } from "../../components/Select"
import { useNavigate, useParams } from "react-router-dom"
const ProductList=(props:any)=>{
    const {location}=useParams()
    console.log("loc",location)
    const [products,setProducts]=useState<Product[]>([])
    const  [productsByCountry,setProductsByCountry]=useState<Product[]>()
    const [countries,setCountries]=useState<Country[]>([])
    const [isOpen,setIsOpen]=useState<boolean>(location==undefined)
    const [selectedCountry,setSelectedCountry]=useState<string>("")
    useEffect(()=>{
        getAllCountries().then((res)=>{
            setCountries(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
        getAllProducts().then((res)=>{
            setProducts(res.data.products)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    const navigate=useNavigate();
    useEffect(()=>{
      console.log("product conntry",productsByCountry)

    },[productsByCountry])
    const getSelectedCountry=async(country:string)=>{
        setSelectedCountry(country);
        setIsOpen(false)


    
           

    }
    useEffect(() => {
        console.log("localisation",selectedCountry)
        getProductsByCountry();

      }, [selectedCountry]);
    const getProductsByCountry=async()=>{
         switch(selectedCountry){
            case "Tunisia":{
                const tunisianProducts= products.map((product:Product)=>{return {sku:product?.sku,title:product.title,description:product.description,countryPrice: product?.countryPrice?.filter((countryPrice)=>{return countryPrice.currency==="TND"})}})
                setProductsByCountry(tunisianProducts)
              !location&& navigate("tn")
                 break;
             }
            case "France":{
                const frenshProducts= products.map((product:Product)=>{return {sku:product?.sku,title:product?.title,description:product?.description,countryPrice: product?.countryPrice?.filter((countryPrice)=>{return countryPrice.currency==="EUR"})}} )
                setProductsByCountry(frenshProducts)
                !location&& navigate("fr")
                break;
            }
            case "Germany":{
                const frenshProducts= products.map((product:Product)=>{return {sku:product?.sku,title:product?.title,description:product?.description,countryPrice: product?.countryPrice?.filter((countryPrice)=>{return countryPrice.currency==="EUR"})}} )
                setProductsByCountry(frenshProducts)
                !location&& navigate("gr")

                break;
            }
            case "United States":{
                const usaProducts=products.map((product:Product)=>{product.countryPrice=product?.countryPrice?.filter((countryPrice)=>countryPrice.currency=="USD");return product})
                setProductsByCountry(usaProducts)
               !location&& navigate("us")

                break;
            }

            case "Turc":{
                const tukishProducts=products.map((product:Product)=>{product.countryPrice=product?.countryPrice?.filter((countryPrice)=>countryPrice.currency==="TRY");return product})
                setProductsByCountry(tukishProducts)
                !location&& navigate("tr")

                return 

            }
           
         }
    }  
    return<div>
        <Popup isOpen={isOpen} onClose={()=>setIsOpen(false)}  children={<Select label="Country" getSelectedCountry={getSelectedCountry} options= { countries?.map((country:Country)=><option value={country.description} key={country.code}>{country.description}</option>)}  />} />
        <Menu/>
          <div className="grid grid-cols-4 grid-rows-2">
             {productsByCountry?.map((product:Product)=> { return product?.countryPrice?.map(countryPrice=>(
<Card sku={product?.sku} title={product?.title} description={product?.description} price={countryPrice.price} currency={countryPrice.currency} />))})
}
    </div>
    </div>

}
export default ProductList