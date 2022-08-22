import React,{ Component } from "react";
// confirmation
// https://kinggambits.com/kinggambitapi/api/upload_file
//http://127.0.0.1:8000/api/ConfirmationPic
// sealed
// https://kinggambits.com/kinggambitapi/api/add_file
//http://127.0.0.1:8000/api/sealedPic
class 
AppUrlCollection extends Component{
    static BASE_URL = 'https://kinggambits.com/kinggambitapi/api/';

    static REGISTER = AppUrlCollection.BASE_URL+'register';
    static LOGIN = AppUrlCollection.BASE_URL+'login';
    static USER = AppUrlCollection.BASE_URL+'userinfo';
    static LOADS = AppUrlCollection.BASE_URL+'loadinfo';
    static LOAD = AppUrlCollection.BASE_URL+'load';
    static  STATES = AppUrlCollection.BASE_URL+'stateinfo';
    static  ACCEPT = AppUrlCollection.BASE_URL+'acceptload';
    static STATUS_UPDATE =AppUrlCollection.BASE_URL+'statusupdate';
    static CONFIRMATION_PIC =AppUrlCollection.BASE_URL+'ConfirmationPic';
    static SEALED_PIC =AppUrlCollection.BASE_URL+'sealedPic';
    static Submit_Forget =AppUrlCollection.BASE_URL+'submitForgetPasswordForm';
    static Submit_Reset =AppUrlCollection.BASE_URL+'submitResetPasswordForm';
    
}
export default AppUrlCollection;