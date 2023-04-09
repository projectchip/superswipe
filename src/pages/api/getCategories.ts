import { connectToDatabase } from "@/src/util/mongoDb";
import { NextApiRequest, NextApiResponse } from "next";


const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        res.status(400).json({message: 'Invalid Request Method'})
    };

    try {
        const {db} = await connectToDatabase();
        const result = await db.collection('categories')
            .find({}).project({category: 1}).toArray();
        const data = [];
        for (const label of result){
            data.push(label.category);
        }

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({message: "Server Error : try again later"})
    }
}

export default getCategories;