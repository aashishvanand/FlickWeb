import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import useStyles from "./styles"
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { Typography } from "../../components/Wrappers/Wrappers";
import axios from "axios";
import APIContext from "../../context/APIContext"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Detail() {
    var classes = useStyles();

    var [currentPassword, setCurrentPassword] = useState('');
    var [newPassword, setNewPassword] = useState('');
    var [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSubmit = (event) => {
        console.log(newPassword)
        console.log(confirmNewPassword)
        if (newPassword === confirmNewPassword) {
            let changePasswordRequestBody = {
                email: localStorage.getItem('email'),
                currentPassword: currentPassword,
                newPassword: newPassword
            };

            const changePasswordOptions = {
                method: "POST",
                data: changePasswordRequestBody,
                baseURL: APIContext.changePassword.url
            };

            axios(changePasswordOptions)
                .then(function (response) {
                    if (!response.data.error && response.status === 200) {
                        setCurrentPassword('')
                        setNewPassword('')
                        setConfirmNewPassword('')

                        toast.success(" ✅ Password Updated", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    else if (response.data.error) {
                        toast.error("❌ Sorry!" + response.data.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        toast.error("❌ Sorry!" + error.response.data.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                })
                .finally(function () {
                });
        }
        else {
            toast.error("❌ Sorry! Password does not match", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }
    const handleCancel = (event) => {
        setCurrentPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
    }

    return (
        <>
            <PageTitle title={"Profile"} />
            <Grid container spacing={4}>
                <Grid item md={6}>
                    <Widget title="Change Password"
                        upperTitle>
                        <div>
                            <div>
                                <FormControl className={classes.root}>
                                    <Typography variant="h5" align="left" component="h2">
                                        Current
                            </Typography>
                                    <TextField
                                        fullWidth
                                        required
                                        value={currentPassword}
                                        type="password"
                                        id="currentPassword"
                                        label="Required"
                                        variant="outlined"
                                        onChange={e => setCurrentPassword(e.target.value)}
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl className={classes.root}>
                                    <Typography variant="h5" align="left" component="h2">
                                        New
                            </Typography>
                                    <TextField
                                        required
                                        value={newPassword}
                                        type="password"
                                        id="newPassword"
                                        label="Required"
                                        variant="outlined"
                                        onChange={e => setNewPassword(e.target.value)}
                                    />
                                    <Typography variant="h5" align="left" component="h2">
                                        Confirm
                            </Typography>
                                    <TextField
                                        required
                                        value={confirmNewPassword}
                                        type="password"
                                        id="confirmNewPassword"
                                        label="Required"
                                        variant="outlined"
                                        onChange={e => setConfirmNewPassword(e.target.value)}
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <Button disabled={currentPassword.length === 0 || newPassword.length === 0 || confirmNewPassword.length === 0} variant="contained" size="medium" color="primary" onClick={handleSubmit} className={classes.margin}>
                                    Submit
                            </Button>

                                <Button disabled={currentPassword.length === 0 || newPassword.length === 0 || confirmNewPassword.length === 0} variant="contained" size="medium" onClick={handleCancel} className={classes.margin}>
                                    Cancel
                            </Button>
                            </div>
                        </div>
                    </Widget>
                </Grid>
            </Grid>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )


}