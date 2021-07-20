import {fetcher} from "../../../utils";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {
    Button,
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
import CreateConcert from "@/components/concerts/CreateConcert";
import Link from "next/link";
import Routes from "@/constants/routes";
import {useRouter} from "next/router";
import SnackSuccess from "@/components/SnackSuccess";
import IconButton from "@material-ui/core/IconButton";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import UpdateFeeding from "@/components/feedings/UpdateFeeding";
import DeleteFeeding from "@/components/feedings/DeleteFeeding";

const useStyles = makeStyles((theme) => ({
    detail:{
        color: "#3f51b5",
    },
    head: {
        backgroundColor: "#3f51b5",
    },
    titles:{
        color: "#FFFFFF",
        textAlign: "left",
    },
    button:{
        backgroundColor: "#ffeb3b",
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
}));


const ReadArtistFeedings = ({id}) => {

    const classes = useStyles();
    //const router = useRouter();
    //const {id} = router.query;
    const {data: artistfeedings, error} = useSWR(`/artists/${id}/feedings`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if(error) return <p>No se pudieron cargar los cuadros...</p>;
    if (!artistfeedings) return <Loading/>;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <h1>Cuadro de Alimentación</h1>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell className={classes.titles}>Fecha</TableCell>
                            <TableCell className={classes.titles}>Nombre</TableCell>
                            <TableCell className={classes.titles}>Cantidad</TableCell>
                            <TableCell className={classes.titles}>Observación</TableCell>
                            {/*<TableCell className={classes.titles}>Lugar</TableCell>*/}
                            {/*<TableCell className={classes.titles}>Artista</TableCell>*/}
                            {/*<TableCell className={classes.titles}>Administrador</TableCell>*/}
                            <TableCell align="center" style={{color: "white"}}> Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {artistfeedings ? <SnackSuccess/> : <Loading/>}
                        {artistfeedings && artistfeedings.map((artistfeeding => {
                            //var passage = ((artist.passage) === 0) ? "No" : "Si" ;

                            return(
                                <TableRow key={artistfeeding.id}>
                                    <TableCell align="left">{artistfeeding.date}</TableCell>
                                    <TableCell align="left">{artistfeeding.food}</TableCell>
                                    <TableCell align="left">{artistfeeding.quantityLunchs}</TableCell>
                                    <TableCell align="left">{artistfeeding.observation}</TableCell>
                                    {/*<TableCell align="left">{feeding.place}</TableCell>*/}
                                    {/*<TableCell align="left">{feeding.artist}</TableCell>*/}
                                    {/*<TableCell align="left">{feeding.user}</TableCell>*/}
                                    <TableCell align="center" >
                                        <td>
                                            <Link href={`${Routes.FEEDINGS}/${artistfeeding.id}`}>
                                                <IconButton aria-label="ver"  size="small" className={classes.detail}>
                                                    <FindInPageIcon />
                                                </IconButton>
                                            </Link>
                                        </td>
                                        <td>
                                            <UpdateFeeding id={artistfeeding.id}/>
                                        </td>
                                        <td>
                                            <DeleteFeeding id={artistfeeding.id}/>
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
                    //count={feedings.data.length}
                    count = {artistfeedings.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>

        </div>
    );
}

export default ReadArtistFeedings;