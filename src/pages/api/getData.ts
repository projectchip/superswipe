import { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "@/src/util/mongoDb"

export const config = {
	api: {
		responseLimit: '8mb',
	},
}

const RESULTSPERPAGE = 5;

const getDataFromDb = async (req: NextApiRequest) => {
    const {db} = await connectToDatabase();
	const query = req.body.query;

	let filters = {};
	const finalFilter: any = [];

	if (req.body.query.length > 0 ) {
		finalFilter.push({$or: [
			{ title: { $regex: query} },
			{ description: { $regex: query} },
			{ source: { $regex: query} },
			{ author: { $regex: query} },
			{tags: { $regex: query} }
		]});
	}

	if (req.body.filterCategroy.length > 0 ){
		finalFilter.push({'category': {$in: req.body.filterCategroy}});
	}
	if (req.body.filterIndustry.length > 0 ){
		finalFilter.push({'industry': {$in: req.body.filterIndustry}});
	}

	if (finalFilter.length > 0 ) {
		filters = {$and: finalFilter}
	}

	console.log(req.body.offset);
	
	let total = 0;
	let data = null;
	total = await db.collection('data')
		.find(filters).count();
	
	data = await db.collection('data')
		.find(filters).sort({'timestamp': -1})
		.skip(RESULTSPERPAGE * (req.body.offset))
		.limit(RESULTSPERPAGE)
		.project({
			_id: 1,
			title: 1,
			category: 1,
			industry: 1,
			timestamp: 1,
			image: 1,
	}).toArray();

	total = total/25 > 1 ? Math.ceil(total / 25) : 1;
	return {data, total};
}


const getData =async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(400).json({message: 'Invalid Request Method'})
    };

    const {data, total} = await getDataFromDb(req);
    res.status(200).json({data, total})
}


export default getData;