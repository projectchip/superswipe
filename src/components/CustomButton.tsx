import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';

export const CssTextField = styled(TextField)({
    // '& label.Mui-focused': {
    //   color: '#f7f8fd',
    // },
    // '& .MuiInput-underline:after': {
    //   borderBottomColor: '#f7f8fd',
    // },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#f7f8fd',
        borderWidth: '2px'
    },
      '&:hover fieldset': {
        borderColor: '#f7f8fd',
        borderWidth: '2px'
    },
      '&.Mui-focused fieldset': {
        borderColor: '#f7f8fd',
        borderWidth: '2px'
    },
	},
});