import { connectToDatabase } from "@/src/util/mongoDb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
};

const toTitleCase = (str: string) => {
	return str.toLowerCase().split(' ').map(function (word) {
	  return (word.charAt(0).toUpperCase() + word.slice(1));
	}).join(' ');
}

const updateCategories = async (db: any, newCate: string) => {
    const formated = toTitleCase(newCate);
    const category: Array<any> = await db.collection('categories')
                                        .find({category: { $regex: formated, $options: "i" }}).toArray();
    if(category.length == 0 ) {
        db.collection('categories').insertOne({category: formated});
    }
}

const updateIndustries = async (db: any, newIndustry: string) => {
    const formated = toTitleCase(newIndustry);
    const industry: Array<any> = await db.collection('industries')
                                        .find({industry: { $regex: formated, $options: "i" }}).toArray();
    if(industry.length == 0 ) {
        db.collection('industries').insertOne({industry: formated});
    }
}


const newEntry = async (req: NextApiRequest, res: NextApiResponse) => {
    const {db} = await connectToDatabase();
    const entry = await req.body;
    const data = entry.newEntry;
    data.timestamp = new Date().toISOString();
    const inserted = await db.collection('data').insertOne(data);
    res.status(201).json({listingId: inserted.insertedId, message: 'Successful'});
    
    await updateCategories(db, data.category);
    await updateIndustries(db, data.industry);
};

export default newEntry;
