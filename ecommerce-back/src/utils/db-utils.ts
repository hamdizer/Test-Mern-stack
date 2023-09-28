import { Model, connect } from "mongoose";

export const connectToDatabase = async (url: string, database: string) => {
  await connect(`${url}/${database}`);
};
export const insertDocument = async (
  model: any,
  document: Object
) => {
  await model.create(document);
};
export const deleteDocument = async (model: any, id: string) => {
  await model.findByIdAndDelete(id);
};
export const getAllDocuments = async (model: any,populate?:string) => {
   const documents= populate? model.find().populate(populate):model.find();
   return documents
};
export const updateDocument = async (model: any,filter:Object,id:string) => {
    await model.findByIdAndUpdate(id,filter);
 };
 export const getDocument= async (model: any,filter:Object,populate?:string) => {
  return populate? model.find(filter).populate(populate):model.find(filter);
};