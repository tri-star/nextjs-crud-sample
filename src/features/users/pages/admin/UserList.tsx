import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { NextPage } from "next"
import { ReactNode } from "react"
import { useFetchUserList } from "../../api/fetch-user-list"
import { User } from "../../domain/user"


const UserListPart = (users: User[]|undefined, error: string|undefined): ReactNode => {
  if(error) {
    return (
      <TableRow>
        <TableCell colSpan={5}>検索中にエラーが発生しました。</TableCell>
      </TableRow>
    )
  }

  if(!users) {
    return (
      <TableRow>
        <TableCell colSpan={5}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CircularProgress />
          </Box>
        </TableCell>
      </TableRow>
    )
  }


  return (
    users?.map((user) => (
      <TableRow key={user.id}>
        <TableCell></TableCell>
        <TableCell>{user.id}</TableCell>
        <TableCell>{user.loginId}</TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
      </TableRow>
    ))

  )
}

export const AdminUserList: NextPage = () => {

  const { users, count, error } = useFetchUserList(false)

  return (
    <Box>
      <Typography>ユーザー一覧</Typography>

      <Box>ユーザー数: {count}</Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>ID</TableCell>
              <TableCell>ログインID</TableCell>
              <TableCell>名前</TableCell>
              <TableCell>メールアドレス</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {UserListPart(users, error)}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  )
}
