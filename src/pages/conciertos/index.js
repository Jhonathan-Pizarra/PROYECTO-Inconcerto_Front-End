import withAuth from "@/hocs/withAuth";
import {
    Button, CardActions, Link as MuiLink, makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow, TextField,
    withStyles
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import FindInPageIcon from '@material-ui/icons/FindInPage';
import useSWR from "swr";
import {fetcher} from "../../utils";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import Link from "next/link";
import Routes from "@/constants/routes";
import Image from "next/image";
import React, {useState} from "react";
import ConcertCreateForm from "@/components/concerts/ConcertCreateForm";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    delete: {
        color: "#f50057",
    },
    edit:{
        color: "#FAC800",
    },
    detail:{
        color: "#3f51b5",
    },
}));


const Conciertos = () => {

    const {data: concerts, error} = useSWR(`/concerts/${''}`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const classes = useStyles();

    if(error) return <p>No se pudieron cargar los conciertos...</p>;
    if (!concerts) return <Loading/>;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <div>
            <ConcertCreateForm/>
            <br/>
            <br/>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>

                        <TableRow>
                            <StyledTableCell align="center">Concierto </StyledTableCell>
                            <StyledTableCell align="center">Fecha</StyledTableCell>
                            <StyledTableCell align="center">Duración&nbsp;(horas)</StyledTableCell>
                            <StyledTableCell align="center">Gratuidad&nbsp;(Si - No)</StyledTableCell>
                            <StyledTableCell align="center">InsiItu&nbsp;(Si - No)</StyledTableCell>
                            {/*         <StyledTableCell align="center">Lugar</StyledTableCell>
                                <StyledTableCell align="center">Festival</StyledTableCell>*/}
                            <StyledTableCell align="center">Detalle</StyledTableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {concerts.data.map((concert => {

                            var free = ((concert.free) === 0) ? "No" : "Si" ;
                            var insitu = ((concert.insitu) === 0) ? "No" : "Si" ;

                            return(
                                <TableRow key={concert.id}>
                                    <TableCell align="left">{concert.name}</TableCell>
                                    <TableCell align="center">{concert.dateConcert}</TableCell>
                                    <TableCell align="center">{concert.duration}</TableCell>
                                    <TableCell align="center">{free}</TableCell>
                                    <TableCell align="center">{insitu}</TableCell>

                                    {/*     <TableCell align="center">
                                            <Link href={concert.place} passHref>
                                                <MuiLink>
                                                    Ir
                                                    {`${process.env.NEXT_PUBLIC_API_BASE_URL}${concert.place}`}
                                                </MuiLink>
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link href={concert.festival} passHref>
                                                <MuiLink>
                                                    Ver
                                                </MuiLink>
                                            </Link>
                                        </TableCell>*/}

                                    <TableCell align="center">
                                        {/* <IconButton aria-label="edit" size="small" className={classes.edit}>
                                                <EditIcon />
                                            </IconButton>*/}
                                        <Link href={`${Routes.CONCERTS}/${concert.id}`}>
                                            {/*<Button size="small" color="primary">*/}
                                            {/*    Ver más*/}
                                            {/*</Button>*/}
                                            <IconButton aria-label="delete"  size="small" className={classes.detail}>
                                                <FindInPageIcon />
                                            </IconButton>
                                        </Link>

                                        {/* <IconButton aria-label="delete" size="small" className={classes.delete}>
                                                <DeleteIcon />
                                            </IconButton>*/}
                                    </TableCell>

                                </TableRow>
                            )
                        })).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                    </TableBody>

                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={concerts.meta.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
        )
}

export default withAuth(Conciertos); //Colocar WitAuth al terminar
