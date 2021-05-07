import {fetcher} from "../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import Link from "next/link";
import {
    makeStyles, Paper, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, withStyles
} from "@material-ui/core";
import React, {useState} from "react";
import Routes from "@/constants/routes";
import UpdateArtistForm from "@/components/artists/UpdateArtistForm";
import DeleteArtistForm from "@/components/artists/DeleteArtistForm";


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

const ReadArtistasForm = () => {

    const {data: artists, error} = useSWR(`/artists/${''}`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const classes = useStyles();

    if(error) return <p>No se pudieron cargar los artistas...</p>;
    if (!artists) return <Loading/>;

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
                                <TableCell className={classes.titles}>Identificación</TableCell>
                                <TableCell className={classes.titles}>Nombre artístico</TableCell>
                                <TableCell className={classes.titles}>Nombre</TableCell>
                                <TableCell className={classes.titles}>Apellido</TableCell>
                                <TableCell className={classes.titles}>Nacionalidad</TableCell>
                                <TableCell className={classes.titles}>Email</TableCell>
                                <TableCell className={classes.titles}>Teléfono</TableCell>
                                <TableCell className={classes.titles}>Pasaje</TableCell>
                                <TableCell className={classes.titles}>Insitrumentos</TableCell>
                                <TableCell className={classes.titles}>Teléfono emergencia</TableCell>
                                <TableCell className={classes.titles}>Email emergencia</TableCell>
                                <TableCell className={classes.titles}>Grupo Alimenticio</TableCell>
                                <TableCell className={classes.titles}>Observación</TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center" style={{color: "white"}}> Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {artists.data.map((artist => {
                                var passage = ((artist.passage) === 0) ? "No" : "Si" ;

                                return(
                                    <TableRow key={artist.id}>
                                        <TableCell align="left">{artist.ciOrPassport}</TableCell>
                                        <TableCell align="left">{artist.artisticOrGroupName}</TableCell>
                                        <TableCell align="left">{artist.name}</TableCell>
                                        <TableCell align="left">{artist.lastName}</TableCell>
                                        <TableCell align="left">{artist.nationality}</TableCell>
                                        <TableCell align="left">{artist.mail}</TableCell>
                                        <TableCell align="left">{artist.phone}</TableCell>
                                        <TableCell align="left">{passage}</TableCell>
                                        <TableCell align="left">{artist.instruments}</TableCell>
                                        <TableCell align="left">{artist.emergencyPhone}</TableCell>
                                        <TableCell align="left">{artist.emergencyMail}</TableCell>
                                        <TableCell align="left">{artist.foodGroup}</TableCell>
                                        <TableCell align="left">
                                            <td className={classes.overrides}>
                                                {artist.observation}
                                            </td>
                                        </TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center" >
                                            <td>
                                                <Link href={`${Routes.ARTISTS}/${artist.id}`}>
                                                    <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                        <FindInPageIcon />
                                                    </IconButton>
                                                </Link>
                                            </td>
                                            <td>
                                                <UpdateArtistForm id={artist.id} />
                                            </td>
                                            <td>
                                                <DeleteArtistForm id={artist.id} />
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
                        count={artists.meta.total}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableContainer>
        </div>
    )
}

export default ReadArtistasForm;
