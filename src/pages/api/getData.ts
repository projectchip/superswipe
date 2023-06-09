import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/src/util/mongoDb";
import { gzipSync } from "zlib";

export const config = {
  api: {
    responseLimit: "8mb",
  },
};

const RESULTSPERPAGE = 20;

const getDataFromDb = async (req: NextApiRequest) => {
  const { db } = await connectToDatabase();
  const query = req.body.query;

  let filters = {};
  const finalFilter: any = [];

  if (req.body.query.length > 0) {
    finalFilter.push({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { source: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    });
  }

  if (req.body.filterCategroy.length > 0) {
    finalFilter.push({ category: { $in: req.body.filterCategroy } });
  }
  if (req.body.filterIndustry.length > 0) {
    finalFilter.push({ industry: { $in: req.body.filterIndustry } });
  }

  if (finalFilter.length > 0) {
    filters = { $and: finalFilter };
  }

  let total = 0;
  let data = null;
  total = await db.collection("data").find(filters).count();

  data = await db
    .collection("data")
    .find(filters)
    .sort({ timestamp: -1 })
    .skip(RESULTSPERPAGE * (req.body.offset - 1))
    .limit(RESULTSPERPAGE)
    .project({
      _id: 1,
      title: 1,
      category: 1,
      industry: 1,
      timestamp: 1,
      image: 1,
    })
    .toArray();

  total = total / 20 > 1 ? Math.ceil(total / 20) : 1;
  return { data, total };
};

const getData = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Invalid Request Method" });
  }

  try {
    const { data, total } = await getDataFromDb(req);
    res.status(200).json({ data, total });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export default getData;
