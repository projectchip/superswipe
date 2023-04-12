import { connectToDatabase } from '@/src/util/mongoDb';

import {hashPassword} from './authenticate';
import { NextApiRequest, NextApiResponse } from 'next';

const addToDB = async (data: any) => {
    try {
        const {db} = await connectToDatabase();
        const exist = await db.collection('user')
            .findOne({email: data.email});
    if (exist == null) {
        data.role = 'user';
        data.timestamp = new Date().toISOString();
        await db.collection('user').insertOne(data);
    } else {
        return {passes: false, message: 'Email is already in use'};
    }
    } catch (e) {
        return {passes: false, message: 'Internal Server Error'};
    }
    const generateRandom = () => Math.random().toString(36).substring(2)
    const key = (generateRandom() + generateRandom() + generateRandom() + generateRandom())

    const token = {
        email: data.email,
        role: 'user',
        name: data.name,
        key: key,
    };
  return {passes: true, message: 'Successful', token: token};
};

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(400).json({message: 'Invalid Request Method'});
    }
    const data = req.body;

    data.password = hashPassword(data.password);
    let successful: any = {passes: false, message: 'Internal Server Error', token: {}};
    successful = await addToDB(data);
    res.status(201).json(successful);
};


export default signup;
