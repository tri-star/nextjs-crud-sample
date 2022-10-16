import { CenterBox } from "@/components/CenterBox"
import PageTitle from "@/components/PageTitle"
import { Box, CircularProgress, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material"
import { NextPage } from "next"
import { ReactNode } from "react"
import { useFetchUserList } from "../../../api/fetch-user-list"
import { User } from "../../../domain/user"
import { useSearchFormStore } from "./search-form-store"
import { SearchForm } from "./SearchForm"


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
          <CenterBox>
            <CircularProgress />
          </CenterBox>
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

export const AdminUserListPage: NextPage = () => {

  const { currentPage, setCurrentPage } = useSearchFormStore()
  const { users, count, pages, page, error } = useFetchUserList(false, currentPage)
  
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 'calc(100vh - 100px)'
    }}>
      <PageTitle title="ユーザー一覧" />

      <SearchForm sx={{ my: 2 }} />

      <Stack my={1} spacing={2} direction="row">
        <span>ユーザー数: {count}</span>
        <Box sx={{ flexGrow: 1 }}/>
        <Pagination count={pages} page={page} shape="rounded" onChange={(_, p) => setCurrentPage(p)} />
      </Stack>
      <TableContainer component={Paper}>
        <Table stickyHeader={true}>
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
      <Stack my={2} spacing={2} direction="row">
        <Box sx={{ flexGrow: 1 }}/>
        <Pagination count={pages} page={page} shape="rounded" onChange={(_, p) => setCurrentPage(p)} />
      </Stack>

    </Box>
  )
}
