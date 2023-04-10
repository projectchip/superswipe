import { connectToDatabase } from "@/src/util/mongoDb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";


const listingDetails = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        res.status(400).json({message: 'Invalid Request Method'})
    }
    const id: any = req.query.id;
    
    if (id !== undefined) {
        const {db} = await connectToDatabase();
        const data = await db.collection('data').find({_id: new ObjectId(id)}).toArray();

        res.status(200).json(data);
    } else {
        res.status(404).json({message: "No Record Found"})
    }
}

export default listingDetails;