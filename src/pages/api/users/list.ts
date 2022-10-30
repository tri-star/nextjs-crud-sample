import { NextApiRequest, NextApiResponse } from 'next'

type UserListResponse = {
  count: number
  users: Array<{
    id: number
  }>
}

export default function handler (req: NextApiRequest, res: NextApiResponse<UserListResponse>) {
  res.status(200).json({
    count: 1,
    users: []
  })
}
