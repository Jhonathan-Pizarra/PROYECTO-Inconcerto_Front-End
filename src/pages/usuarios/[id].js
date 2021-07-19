import useSWR from "swr";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {fetcher} from "../../utils";
import withAuth from "@/hocs/withAuth";
import {Grid, Link as MuiLink, makeStyles, Paper, Typography} from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '30%',
    },
}));

const UsuariosID = () => {

    const classes = useStyles();
    const router = useRouter();
    const {id} = router.query;
    const {data: user, error} = useSWR(`/users/${id}`, fetcher);

    if(error) return <div>"No se obtuvo el usuario"</div>;
    if(!user) return <Loading/>;

    return (
        <div>
            <h1>Detalle Usuario</h1>
            <div>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" style={{textAlign: 'center'}}>
                                        <h2>{user.name}</h2>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Fecha:</b>&ensp;{user.created_at}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Email:</b>&ensp;{user.email}</p>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <p><b>Rol:</b>&ensp;{user.role === 'ROLE_ADMIN' ? 'Administrador':'Usuario'}</p>
                                    </Typography>

                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    );

};

export default withAuth(UsuariosID);
