import { connectToDatabase } from "@/src/util/mongoDb";
import { NextApiRequest, NextApiResponse } from "next";


const uploadPhoto = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.status(400).json({message: 'Invalid Request Method'});
        return;
    }

    try {
        const data = req.body;
        console.log('Inserted', data);

        const {db} = await connectToDatabase();
        await db.collection('photos').insertOne(data);
        res.status(201).json({message: 'Uploaded...'})
    } catch (err) {
        res.status(500).json({message: err})
    }
};

export default uploadPhoto;