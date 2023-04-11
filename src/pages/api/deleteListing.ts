import { connectToDatabase } from "@/src/util/mongoDb";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

const deleteListing = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'DELETE') {
        res.status(400).json({message: "Invalid Request Method"})
        return;
    }
    try {
        console.log(req.headers.authorization);
        const {db} = await connectToDatabase();
        const id: any = req.query.id;
        db.collection('data').deleteOne({_id: new ObjectId(id)});
        res.status(200).json({message: 'Deletion Successful'});
    } catch (err) {
        res.status(500).json({message: err})
    }
};

export default deleteListing;