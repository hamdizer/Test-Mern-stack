export type Country={
    code:string,
    description:string,
}
export type CountryPrice={
    price:Number,
    currency:string,
    product:Product
}
export enum Role{
    ADMIN="admin",
    USER="user"

}
export type Product={
    sku:string
    title:string,
    description:string,
    countryPrice?:CountryPrice[]
}
export type User={
    email:string,
    firstName:string,
    lastName:string,
    tel_number:Number,
    password:string,
    passwordConfirm:string,
    country?:Country,
    role:Role

}
export type Credentials={
    email:String,
    password:String
}