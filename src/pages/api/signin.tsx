import { connectToDatabase } from "@/src/util/mongoDb";
import { NextApiRequest, NextApiResponse } from "next";
import { confirmPassword } from "./authenticate";

const findByEmail = async (db: any, email: string) => {
  
    const user = await db.collection('user').findOne({email: email});
    return user;
};

const signin = async (req: NextApiRequest, res: NextApiResponse) => {
    const {db} = await connectToDatabase();
    if (req.method !== 'POST') {
        res.status(400).json({message: 'Invalid Request Method'});
    }
    const data = req.body;
    const user = await findByEmail(db, data.email);
    if (!user) {
        res.status(401).json({message: 'Invalid email or password'});
        return;
    }
    const match = await confirmPassword(user.password, data.password);
    if (!match) {
        res.status(401).json({message: 'Invalid email or password'});
        return;
    }
    const generateRandom = () => Math.random().toString(36).substring(2)
    const key = (generateRandom() + generateRandom() + generateRandom() + generateRandom())

    const token = {
        email: user.email,
        role: user.role,
        name: user.name,
        key: key,
    };

    await db.collection('user').updateOne({email: data.email}, {$set: {key: key}});

    res.status(200).json({message: 'login-successfull',
        token: JSON.stringify(token)});
    return;
};

export default signin;
