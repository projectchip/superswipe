import { connectToDatabase } from "@/src/util/mongoDb";
import { NextApiRequest, NextApiResponse } from "next";


const listingPhotos = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        res.status(400).json({message: 'Invalid Method Request'});
    }
    try {
        const id = req.query.id;
        const {db} = await connectToDatabase();
        const photos = await db.collection('photos')
            .find({listingId : id}).toArray();
        res.status(200).json(photos);        
    } catch (err) {
        res.status(500).json({message: err})
    }
}


export default listingPhotos;