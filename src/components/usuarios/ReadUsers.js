import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import IconButton from "@material-ui/core/IconButton";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import Link from "next/link";
import {
    Grid,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";
import React, {useState} from "react";
import Routes from "@/constants/routes";
import SnackSuccess from "@/components/SnackSuccess";
import CreateUser from "@/components/usuarios/CreateUser";
import UpdateUser from "@/components/usuarios/UpdateUser";
import DeleteUser from "@/components/usuarios/DeleteUser";


const useStyles = makeStyles((theme) => ({
    detail:{
        color: "#3f51b5",
    },
    head: {
        backgroundColor: "#f44336",
    },
    overrides: {
        color: "rgba(0, 0, 0, 0.87)",
        display: "table",
        fontSize: "0.875rem",
        fontFamily: "Neuton",
        fontWeight: "400",
        verticalAlign: "inherit",
        boxSizing: "inherit",
        width: "320%",
        textAlign: "left",
    },
    titles:{
        color: "#FFFFFF",
        textAlign: "left",
    },
}));

const ReadUsers = () => {

    const {data: users, error} = useSWR(`/users`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const classes = useStyles();

    if(error) return <p>No se pudieron cargar los usuarios...</p>;
    if (!users) return <Loading/>;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell className={classes.titles}>Registro </TableCell>
                            <TableCell className={classes.titles}>Nombre</TableCell>
                            <TableCell className={classes.titles}>E-mail </TableCell>
                            <TableCell className={classes.titles}>Rol</TableCell>
                            {/*<TableCell align="center"></TableCell>*/}
                            {/*<TableCell align="center"></TableCell>*/}
                            {/*<TableCell align="center"></TableCell>*/}
                            {/*<TableCell align="center"></TableCell>*/}
                            <TableCell align="center" style={{color: "white"}}> Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users ? <SnackSuccess/> : <Loading/>}
                        {users && users.map((user => {

                            var rol = user.role === 'ROLE_ADMIN' ? 'Administrador':'Usuario';

                            return(
                                <TableRow key={user.id}>
                                    <TableCell align="left">{user.created_at}</TableCell>
                                    <TableCell align="left">{user.name}</TableCell>
                                    <TableCell align="left">{user.email}</TableCell>
                                    <TableCell align="left">{rol}</TableCell>
                                    {/*<TableCell align="center"></TableCell>*/}
                                    {/*<TableCell align="center"></TableCell>*/}
                                    {/*<TableCell align="center"></TableCell>*/}
                                    {/*<TableCell align="center"></TableCell>*/}
                                    <TableCell align="center" >
                                        <td>
                                        <Link href={`${Routes.USERS}/${user.id}`}>
                                            <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                <FindInPageIcon />
                                            </IconButton>
                                        </Link>
                                        </td>
                                        <td>
                                            <UpdateUser id={user.id} />
                                        </td>
                                        <td>
                                            <DeleteUser id={user.id} />
                                        </td>
                                    </TableCell>
                                </TableRow>
                            )

                        })).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    //count={artists.meta.total}
                    //count = {artists.data.length}
                    count = {(users && users.length)? users.length : 100 }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
            <br/>
            {/*<CreateArtist/>*/}
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <CreateUser/>
            </Grid>
        </div>
    )
}

export default ReadUsers;
