import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/src/util/mongoDb";


const getIndustries = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        res.status(400).json({message: 'Invalid Request Method'})
    };
    try {
        const {db} = await connectToDatabase();
        const result = await db.collection('industries')
            .find({}).project({industry: 1}).toArray();
        const data = [];
        for (const label of result){
            data.push(label.industry);
        }

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({message: "Server Error : try again later"})
    }
}

export default getIndustries;