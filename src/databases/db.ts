import { DB_DATABASE, DB_HOST, DB_PORT } from "@/config";
import { MongoClient, Db } from 'mongodb'
import fs from 'fs';
import path from 'path';

const url = `mongodb+srv://datnguyentruongnn:dat1234567@poca.kzc5eti.mongodb.net/?retryWrites=true&w=majority&appName=poca`;

const defaultDbName = `${DB_DATABASE}`;

const client = new MongoClient(url)

export let db: Db;

export const connect = async (dbName: string = defaultDbName) => {

    try {
        // Xác định đường dẫn tuyệt đối đến file log
        const logFilePath = path.join(__dirname, '..', 'logs', 'error', '2024-05-24.log');

        // Đọc nội dung file log đồng bộ
        const logData = fs.readFileSync(logFilePath, 'utf8');

        // Xử lý dữ liệu log
        console.log("check");
        
        console.log("log Data :",logData);
        
    } catch (error) {
        console.error('Lỗi khi đọc file log:', error);
    }

    const conn = await client.connect();
    db = conn.db(dbName);
    console.log('====================================');
    console.log('connect db okkkkk');
    console.log('====================================');
    return client;

}
