import * as React from 'react';
import {accountsTableData} from "../DatabaseSimulation/FakeDatabase";
import {user} from "../DatabaseSimulation/TableTypes";
import {List} from "linqts";
import { RouteComponentProps } from 'react-router';
import {RegistratieContainer} from "../Registratie/RegistratieContainer";
import { Redirect } from 'react-router';
import {User} from "../User/User";

interface LoginContainerState{
    //to check if it needs to redirect to Home, there is a method in User class to check the login status
    userLoggedIn: boolean; 
    typedInUsername: string;
    typedInPassword: string;
    isRegisterButtonClick: boolean;
    loggedInUser: user | null;
}
export class LoginContainer extends React.Component<RouteComponentProps<{}>, LoginContainerState> {
    constructor(){
        super();
        this.HandleChangeToInputFields = this.HandleChangeToInputFields.bind(this);
        this.GetUserFromApi = this.GetUserFromApi.bind(this);
        this.CheckIfLoginIsCorrect = this.CheckIfLoginIsCorrect.bind(this);
        this.RegisterTheAccount = this.RegisterTheAccount.bind(this);
        this.state = {typedInUsername:"", typedInPassword:"", isRegisterButtonClick: false, userLoggedIn: false, loggedInUser: null}   
        this.CreateLoggedInUser = this.CreateLoggedInUser.bind(this);    
    }
    //When the user types into one of the fields, the result is saved to the state
    HandleChangeToInputFields(event: any){         
        if(event.target.name == "username"){
            this.setState({typedInUsername: event.target.value});    
        }
        else{
            this.setState({typedInPassword: event.target.value});   
        }           
    }
    async GetUserFromApi() : Promise<user>{
        let apiLink = 'api/User/Get/Username/' + this.state.typedInUsername
        let apiResponse = await fetch(apiLink, {method: 'get', credentials: 'include', headers: new Headers({'content-type' : 'application/json'})});
        let apiResponseJson = await apiResponse.json();
        return apiResponseJson;
    }
    CheckIfLoginIsCorrect(event:any):void{
        event.preventDefault();
        this.GetUserFromApi()
        .then(foundUser => {
            if(foundUser.password == this.state.typedInPassword){
                this.CreateLoggedInUser(foundUser);
            }
            else{
                alert("Wrong password!")
            }
        })
        .catch(_ => alert("Username does not exist!"))
    }
    //Fetches the data (Pk, name etc) of the logged in user 
    CreateLoggedInUser(userAccount: user){
        var loggedInUser = User.CreateUser();
        loggedInUser.SetAccount(userAccount);
        this.setState({userLoggedIn: true})
    }
    //When the user clicks the register button
    RegisterTheAccount(){
        this.setState({isRegisterButtonClick: true})
    }
    render(){
        console.log("LOL")
        return(
            <div className={"Container"}>
            
            <div> <h1> Log in </h1> </div>
            <form  onSubmit={this.CheckIfLoginIsCorrect} onChange={this.HandleChangeToInputFields}>
            <div>
                <label>
                    <span>Gebruikersnaam:  </span>
                      
                <input type="text" name="username" value={this.state.typedInUsername} />               
            </label>
            </div>
            <div>
            <label>
                <span> Wachtwoord:   </span>    
                <input type="text" name="password"  value={this.state.typedInPassword} />             
            </label>
            </div>
            <input type="submit" value="Inloggen"  />
            <button onClick={this.RegisterTheAccount}> Registeer </button>   
            </form>       
            <div>            
            </div>    
            {this.state.userLoggedIn ?
            <Redirect to={"/"} push={true}/>
            :
            this.state.isRegisterButtonClick?
             <Redirect to={"/Registratie"} push={true}/>
            :
            <div> </div>
            }
                    
            </div>
        )}
}
export default LoginContainer;