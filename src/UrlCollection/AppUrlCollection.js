import React,{ Component } from "react";

class 
AppUrlCollection extends Component{
    static BASE_URL = 'https://kinggambits.com/kinggambitapi/api/';

    static REGISTER = AppUrlCollection.BASE_URL+'register';
    static LOGIN = AppUrlCollection.BASE_URL+'login';
    static USER = AppUrlCollection.BASE_URL+'userinfo';
    static LOADS = AppUrlCollection.BASE_URL+'loadinfo';
    static LOAD = AppUrlCollection.BASE_URL+'load';
    static  STATES = AppUrlCollection.BASE_URL+'stateinfo'
    static  ACCEPT = AppUrlCollection.BASE_URL+'acceptload'
   

}
export default AppUrlCollection;