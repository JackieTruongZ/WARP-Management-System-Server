import { db } from "@/databases/db";
import { hash } from "bcrypt";
import { Filter, ObjectId, WithId } from "mongodb";


abstract class BaseQuery<TBase, TCreateDto> {

    protected abstract collectionName: string;
    protected abstract attributeBase: string;
    protected abstract listAttribute: string[];

    public find = async (): Promise<any> => {
        const data: Omit<TBase, '_id'>[] = await db.collection<TBase>(this.collectionName).find({}).toArray();
        return data;
    }
    public async findById(dataId: string): Promise<any> {
        // create query

        const query: Filter<TBase> = { _id: new ObjectId(dataId) } as Filter<TBase>;

        // query 
        const findData: Omit<TBase, '_id'> = await db.collection<TBase>(this.collectionName).findOne(query);

        return findData;
    }

    public findByAttributeBase = async (attribute: string): Promise<any> => {
        // create query
        const query: Filter<TBase> = { [this.attributeBase]: attribute } as Filter<TBase>;

        // query 
        const findData: Omit<TBase, '_id'> = await db.collection<TBase>(this.collectionName).findOne(query);

        return findData;

    }

    public findByAttributeBaseWithoutId = async (attribute: string): Promise<any> => {
        // create query
        const query: Filter<TBase> = { [this.attributeBase]: attribute } as Filter<TBase>;

        // query
        const findData: WithId<TBase> = await db.collection<TBase>(this.collectionName).findOne(query) as WithId<TBase>;

        return findData;
    }

    public findByAttribute = async (attributeName: string, attribute: string): Promise<any> => {
        // create query
        const query: Filter<TBase> = { [attributeName]: attribute } as Filter<TBase>;

        // query 
        const findData: Omit<TBase, '_id'> = await db.collection<TBase>(this.collectionName).findOne(query);

        return findData;

    }


    public saveData = async (createData: TCreateDto): Promise<any> => {

        const saveData = await db.collection<any>(this.collectionName).insertOne(createData);

        return saveData;
    }

    public updateData = async (dataId: string, updatedData: TCreateDto): Promise<any> => {

        const updateQuery: Filter<TBase> = { _id: new ObjectId(dataId) } as Filter<TBase>;

        // query
        const result = await db.collection(this.collectionName).updateOne(updateQuery, { $set: updatedData });
        return result;
    }

    public deleteById = async (dataId: string): Promise<any> => {

        const result = await db.collection(this.collectionName).deleteOne({ _id: new ObjectId(dataId) });
        return result;

    }

}

export default BaseQuery;