import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles({
  input: {
    width: 220,
  },
});

function InputSenha({ id, label, register, error }) {
  const classes = useStyles();
  const [senhaVisivel, setSenhavisivel] = useState(false);

  return (
    <FormControl>
      <InputLabel htmlFor={id} error={error}>
        {label}
      </InputLabel>
      <Input
        id={id}
        type={senhaVisivel ? "text" : "password"}
        className={classes.input}
        error={error}
        {...register()}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                setSenhavisivel(!senhaVisivel);
              }}
            >
              {senhaVisivel ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export default InputSenha;
//.
