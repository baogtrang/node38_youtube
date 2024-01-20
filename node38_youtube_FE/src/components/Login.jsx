import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";
import { Videos, ChannelCard } from ".";
import ReactFacebookLogin from "react-facebook-login";
import { loginFacebookApi } from "../utils/fetchFromAPI";

const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {}, []);

  return (
    <div
      className='p-5 '
      style={{ minHeight: "100vh" }}>
      <div className=' d-flex justify-content-center'>
        <form className='row g-3 text-white'>
          <div className='col-md-12'>
            <label
              htmlFor='inputEmail4'
              className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
            />
          </div>

          <div className='col-md-12'>
            <label
              htmlFor='inputEmail4'
              className='form-label'>
              Password
            </label>
            <input
              className='form-control'
              id='pass'
            />
          </div>
          <div className='col-12'>
            <button
              type='button'
              className='btn btn-primary'>
              Login
            </button>
          </div>
          <p></p>

          <ReactFacebookLogin
            appId='783558493798930'
            autoLoad={false}
            fields='name,email,picture'
            callback={(responseFacebook) => {
              console.log(responseFacebook);
              let { email, id, name } = responseFacebook;
              loginFacebookApi({ email, id, name })
                .then((result) => {
                  alert(result);
                  localStorage.setItem("LOGIN_USER", result);
                  // window.location.href = "/";
                })
                .catch((error) => console.log(error));
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
