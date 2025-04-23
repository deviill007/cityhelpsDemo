import dbConnect from "../../../backend/utils/dbConnect";
import User from "../../../backend/models/User";
import withAuth from "../../../backend/utils/withAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  };
  
  export default withAuth(handler);
  