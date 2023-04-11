import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/src/util/mongoDb";
import { ObjectId } from "mongodb";

const updateListing = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT') {
        res.status(400).json({message: 'Invalid Reques Method'});
      }
      const {db} = await connectToDatabase();
      const entry = await req.body;
      const data = entry.updated;
      
      await db.collection('data').updateOne(
          {_id: new ObjectId(data.id)}, {
            $set: {
              title: data.title,
              description: data.description,
              author: data.author,
              category: data.category,
              industry: data.industry,
              source: data.source,
              url: data.url,
              tags: data.tags,
              timestamp: new Date().toISOString()}});
    
      data.image !== '' ?
        await db.collection('data').updateOne(
            {_id: new ObjectId(data.id)}, {
              $set: {
                image: data.image}}) : null;
    
      res.status(200).json({message: 'Successful'});
}


export default updateListing;