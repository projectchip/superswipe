import { connectToDatabase } from "@/src/util/mongoDb";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";


const deletePhoto = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'DELETE') {
        res.status(400).json({message: 'Invalid Request Method'})
    }
    try {    
        const id: any = req.query.id;
        const {db} = await connectToDatabase();
        await db.collection('photos').deleteOne({_id: new ObjectId(id)});
        res.status(200).json({message: 'Deletion Successful'});
    } catch (err) {
        res.status(500).json({error: err})
    }
}


export default deletePhoto;