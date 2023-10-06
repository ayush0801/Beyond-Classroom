import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Box,
  Button,
  Typography,
  styled,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useNavigate } from "react-router-dom";

import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import StarsCanvas from "./canvas/Stars";
import { Tilt } from 'react-tilt'
const Component = styled(Box)`
  width: 400px;
  margin: auto;
  // background: rgba( 255, 255, 255, 0.25 );
// box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 10px );
-webkit-backdrop-filter: blur( 8px );
border-radius: 55px;
border: 1px solid rgba( 255, 255, 255, 0.85);
`;

const Image = styled("img")({
  width: 300,
  display: "flex",
  margin: "auto",
  padding: "0 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  color: #fff;

`;

const SignupButton = styled(Button)`
text-transform: none;
color: #fff;

`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const loginInitialValues = {
  username: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const Login = ({ isUserAuthenticated }) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState("");
  const [account, toggleAccount] = useState("login");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  const imageURL =
    "https://i.ibb.co/qB1dDw7/Beige-Blue-Simple-Illustrated-Study-Blog-Logo.png";

  useEffect(() => {
    showError(false);
  }, [login]);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      showError("");

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        name: response.data.name,
        username: response.data.username,
      });

      isUserAuthenticated(true);
      setLogin(loginInitialValues);
      navigate("/");
    } else {
      showError("Something went wrong! please try again later");
    }
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      showError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
    } else {
      showError("Something went wrong! please try again later");
    }
  };

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };
  const gradientBackground = 'linear-gradient(180deg,#000000 12%,#000000f4 18%,#1c1c1c 30%, #353521f3 50% , #575100d8 70%,#c9bf00 95%)';
  const styles = {
    floatingLabelFocusStyle: {
        color: "white"
    },
    input: {
      color: 'white',
      fontFamily:'poppin' // Change this to your desired text color
    },
}


  return (
    <Box
      sx={{
        display:"flex"
        
      }}
    >
    <Box sx={{
      background : gradientBackground,
   
      width:"100%",
      height: "100vh",
      alignItems:"center",
      justifyContent:"center",
      display:"flex"
    }}
    >

      <StarsCanvas/> 
    <Component
     sx={{
      alignItems:"center",
        justifyContent:"center",
        display:"flex",
        flexDirection:"column",
          position:"absolute",
        zIndex: 1,
     }}
    >
      <Box sx={{
        height:account == "login"?620:670,
        px:4,
        alignItems:"center",
        justifyContent:"center",
        display:"flex",
        flexDirection:"column",
      
      }}
      borderRadius={55}   
      >
        <Tilt style={{ height: 250, width: 250}} >

        <Image src={imageURL} alt="Login"sx={{
          height: 250,
          width:250,
          borderRadius:"100px",
          marginTop:"15px",
          border:"1px solid grey",
          padding:"5px",
          opacity:"0.98"
          
        }}/>
        </Tilt>
        {account === "login" ? (
          <Wrapper sx={{
            alignItems:"center",
        justifyContent:"center",
        display:"flex",
        flexDirection:"column",
          }}>
            <TextField
                InputProps={{
                  style:{color:"white", fontFamily:"poppin",borderColor:"whitesmoke",},
                }}
              onChange={(e) => onValueChange(e)}
              value={login.username}
              name="username"
              label={<Text style={{fontFamily:"poppin", color:"whitesmoke", fontSize:16}}>Username</Text>}
              variant="standard"
              style={{width:"240px"}}
              />
            <TextField
        
            style={{width:"240px", fontFamily:'poppins', color:"white",fontSize:18,}}
            onChange={(e) => onValueChange(e)}
            value={login.password}
            name="password"
            type={showPassword ? "text" : "password"} // Toggle password visibility
            label={<Text style={{fontFamily:"poppin", color:"whitesmoke", fontSize:16}}>Password</Text>}
            variant="standard"
            
            InputProps={{
              style:{color:"white"},
              endAdornment: (
                <InputAdornment position="end">
                    <IconButton style={{color:"lightgrey"}} onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              />

            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={() => loginUser()} style={{borderRadius:"20px",fontSize:"18px",fontFamily:"Poppins", width:"180px",height:"50px",background:"#32bf0b"}}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" , fontFamily:"Poppins", color:"white", display:'flex',justifyContent:"center", alignItems:"center", fontSize:14,fontWeight:"300"}}>Don't have an account...?
            <SignupButton
              
              onClick={() => toggleSignup()}
              style={{ color:"black", fontFamily:"poppin",fontWeight:"600",letterSpacing:1.1}}
              >
               SignUp
            </SignupButton>
             </Text>
            
          </Wrapper>
        ) : (
          <Wrapper 
           sx={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
           }}
          >
            <TextField
              InputProps={{
                style:{color:"white", fontFamily:"poppin",borderColor:"whitesmoke",},
              }}
              style={{width: 240,}}
              onChange={(e) => onInputChange(e)}
              name="name"
              label={<Text style={{fontFamily:"poppin", color:"whitesmoke", fontSize:16}}>Name</Text>}
              
              variant="standard"
              />
            <TextField
              InputProps={{
                style:{color:"white", fontFamily:"poppin",borderColor:"whitesmoke",},
              }}
                
             floatingLabelFocusStyle={styles.floatingLabelFocusStyle} 
              InputLabelProps={{
                
              }}
              style={{width:240}}
              onChange={(e) => onInputChange(e)}
              name="username"
              label={<Text style={{fontFamily:"poppin", color:"whitesmoke", fontSize:16}}>Username</Text>}
              variant="standard"
              />
            <TextField
              style={{width:240}}
              onChange={(e) => onInputChange(e)}
              name="password"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              label={<Text style={{fontFamily:"poppin", color:"whitesmoke", fontSize:16}}>Password</Text>}
              variant="standard"
              InputProps={{
                style:{color:"white"},
                endAdornment: (
                  <InputAdornment position="end">
                     <IconButton style={{color:"lightgrey"}} onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <SignupButton onClick={() => signupUser()} style={{borderRadius:"20px",fontSize:"18px",fontFamily:"Poppins", width:"180px",height:"50px",background:"#32bf0b"}}>
              SignUp
            </SignupButton>
            <Text style={{ textAlign: "center" , fontFamily:"Poppins", color:"white", display:'flex',justifyContent:"center", alignItems:"center", fontSize:14,fontWeight:"300"}}>
              Already have an account?
            <LoginButton onClick={() => toggleSignup()} variant="contained"  style={{ color:"black", fontFamily:"poppin",fontWeight:"600",letterSpacing:1.1, background:"none",boxShadow:"none"}}>
              Login
            </LoginButton>
            </Text>
          </Wrapper>
        )}
      </Box>
    </Component>
        </Box>
        <Box sx={{
          background:"black",
          height:"100vh"
        }}>
     
        </Box>
        </Box>
  );
};

export default Login;
