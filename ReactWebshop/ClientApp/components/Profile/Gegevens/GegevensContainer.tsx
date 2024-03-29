import * as React from 'react';
import {List} from "linqts";
import { RouteComponentProps } from 'react-router';
import {RegistratieContainer} from "../../Registratie/RegistratieContainer";
import { Redirect } from 'react-router';
import {GegevensComponent} from "./GegevensComponent";
import {ProfileSideMenuLayout} from "../Layout/ProfileSideMenuLayout";

export class GegevensContainer extends React.Component<RouteComponentProps<{}>, {}> {
    constructor(){
        super();
    }
    render(){  
        return(    
            <div>         
                <div className={"Container"}>
                <GegevensComponent  />  
            </div>        
            </div>             
        )
    }     
}
export default GegevensContainer;