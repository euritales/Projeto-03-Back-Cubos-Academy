import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
  Snackbar,
} from "@material-ui/core/";
import { useForm } from "react-hook-form";
import "./styles.css";
import InputSenha from "../../components/InputSenha";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "auto",
    width: "392px",
    borderRadius: 16,
    padding: "80px 40px",
    boxShadow:
      "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12);",
    "& h4": {
      textAlign: "center",
      marginBottom: 85,
    },
  },
  row: {
    display: "flex",
    flexDirection: "column",
    gap: 48,
    marginBottom: 48,
  },

  button: {
    margin: "0 auto",
    backgroundColor: "#007DFF",
    "&:hover": {
      backgroundColor: "#075CB4",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#FFFFFF",
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [carregamento, setCarregamento] = useState(false);
  const [requestErrado, setRequestErrado] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();

  async function validarLogin(data) {
    if (!data.senha) {
      setError("senha", { type: "validate" }, { shouldFocus: true });
      return;
    }
    setRequestErrado("");
    setCarregamento(true);

    const res = await fetch("https://desafio-m03.herokuapp.com/login ", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });

    setCarregamento(false);

    if (res.ok) {
      history.push("/produtos");
      return;
    }
    const dados = await res.json();
    setRequestErrado(dados);
  }

  function handleAlertClose() {
    setRequestErrado("");
  }
  return (
    <form className="container" onSubmit={handleSubmit(validarLogin)}>
      <Card className={classes.card}>
        <Typography variant="h4" component="h4">
          Login
        </Typography>
        <div className={classes.row}>
          <TextField
            className={classes.input}
            label="E-mail"
            {...register("email", { required: true })}
            error={!!errors.email}
          />
          <InputSenha
            label="senha"
            id="senha"
            register={() => register("senha", { required: true })}
            error={!!errors.senha}
          />
        </div>
        <Snackbar
          open={!!requestErrado}
          autoHideDuration={6000}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity="error">
            {requestErrado}
          </Alert>
        </Snackbar>
        <Button
          type=" submit "
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Entrar
        </Button>
        <Backdrop className={classes.backdrop} open={carregamento}>
          <CircularProgress color="inherit" />
        </Backdrop>{" "}
        <p>Primeira vez aqui? CRIE UMA CONTA</p>
      </Card>
    </form>
  );
}

export default Login;
