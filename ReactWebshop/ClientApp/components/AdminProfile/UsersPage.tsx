import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Klant } from '../../../TypescriptModels/Klant';
import { Product } from 'ClientApp/components/Items/ItemsInterfaces';
import {IAdmin} from "./AdminInterface";
import { ProductPage } from 'ClientApp/components/ProductPage/ProductPageContainer';

//When the profile gets clicked it gets redirected to this empty profile page

interface UsersState{
    users : Klant[];
    loaded : boolean;
    change: number,
    createUserClicked: boolean;
    klantNaam:string,
    klantAchternaam: string,
    klantTussenvoegsel: string,
    klantTel: number,
    klantMail: string,
    klantStraat: string,
    klantPostcode: string,
    klantStraatnmr: string,
    username: string,
    password: string,
    editUserClicked: boolean;
}

export class UsersPage extends React.Component<{}, UsersState> implements IAdmin{
    constructor(){
        super();
        this.EditEntity = this.EditEntity.bind(this);
        this.DeleteEntity = this.DeleteEntity.bind(this);
        this.CreateEntity = this.CreateEntity.bind(this);
        this.handleChangeSubmit = this.handleChangeSubmit.bind(this);

        this.state = {
            users : [],
            loaded : false,
            change : 0,
            createUserClicked: false,
            editUserClicked: false,

    
            klantNaam : "",
            klantAchternaam : "",
            klantTussenvoegsel : "",
            klantTel : 0,
            klantMail : "",
            klantStraat : "",
            klantPostcode : "",
            klantStraatnmr : "",
            username : "",
            password : "",
        }

        fetch("api/Admin/GetAllUsers")
        .then(response => response.json() as Promise<Klant[]>)
        .then(data => {
            this.setState({users : data, loaded : true});
            console.log(data[0])
        }).catch(
            error => {
                this.setState({ loaded : false })
            }
        )
    }

    EditEntity(entity: Product | Klant){
        let IsEntityOfUserType = (anEntity: any) : anEntity is Klant => {
            return anEntity;
        }
        if(IsEntityOfUserType(entity)){
            this.setState({
                change: entity.klantId,
                klantNaam: entity.klantNaam,
                klantAchternaam: entity.klantAchternaam,
                klantTussenvoegsel: entity.klantTussenvoegsel,
                klantTel: entity.klantTel,
                klantMail: entity.klantMail,
                klantStraat: entity.klantStraat,
                klantPostcode: entity.klantPostcode,
                klantStraatnmr: entity.klantStraatnmr,
                username: entity.username,
                password: entity.password
            })
        }
    }
    async DeleteEntity(entity: Product | Klant) {
        alert("Weet je zeker dat je de klant wilt verwijderd?")
        let IsEntityOfUserType = (anEntity: any) : anEntity is Klant => {
            return anEntity;
        }

        if(IsEntityOfUserType(entity)){
            console.log("true")
            var apiUrl = "api/User/" + entity.klantId
   
            let apiResponse = await fetch(apiUrl, {method: 'DELETE', headers: new Headers({'content-type' : 'application/json'})});
            alert("Klant verwijderd");
        }
        this.setState({});
    }

    CreateEntity() {
        this.setState({createUserClicked: true})
    }
    async handleChangeSubmit(event: any, createdUserClick: boolean) {
        event.preventDefault();
        let apiUrl: string;
        let apiMethod: string;

        let klantToPost: Klant = {
            KlantId: 1,
            klantNaam : this.state.klantNaam,
            klantAchternaam: this.state.klantAchternaam,
            klantTussenvoegsel : this.state.klantTussenvoegsel,
            klantTel : this.state.klantTel,
            klantMail : this.state.klantMail,
            klantStraat : this.state.klantStraat,
            klantPostcode : this.state.klantPostcode,
            klantStraatnmr : this.state.klantStraatnmr,
            username : this.state.username,
            password: this.state.password,
        }
        if(createdUserClick == true){
            apiUrl = 'api/User/Post/'
            apiMethod = "POST"
        }
        else{
            apiUrl = "api/User/"
            apiMethod = "PUT"
            this.setState({createUserClicked: false})

        }
        let apiResponse = await fetch(apiUrl, {method: apiMethod, body:JSON.stringify(klantToPost), headers: new Headers({'content-type' : 'application/json'})});
        alert("Voltooid");
        
    }
    //TODO: Maak een nieuwe gebruiker aan
    render(){  
        return(         
            <div className={"UsersComponent"} > 
            <div className='col-md-10'>
                <h1> Users </h1>
                
                <button className={"btn btn-primary"} onClick={() => this.CreateEntity()} > Maak een nieuwe gebruiker aan </button>
                {this.state.loaded? 

                    this.state.users.map(
                        
                        user => {

                            return (
                                <div className={"Component"}>
                                    
                                    
                                        <div className='col-md-10'>   
                                            <h3>Username: { user.username }  </h3>
                                            <h3>klant id:{" " + user.klantId } </h3>
                                        
                                          
                                            <button type="button" className={"btn btn-primary"} data-toggle="collapse" data-target="#demo"  onClick={() => this.EditEntity(user)} > Bekijk / Pas Aan </button>
                                            <button className={"btn btn-primary"} onClick={() => this.DeleteEntity(user)} > Verwijder </button>
                                            </div>
                                            { console.log(this.state.change) }
                                            {
                                                user.klantId === this.state.change || this.state.createUserClicked?
                                                
                                                    <div>
                                                        <ul className='reg_ul'><form action="/action_page.php"
                                                          onSubmit={(this.state.createUserClicked? (event:any) => this.handleChangeSubmit(event, true) 
                                                            :
                                                        (event: any) => this.handleChangeSubmit(event, false))}>

                                                     <div id="demo">
                                                        <div className='col-md-6'>
                                                        
                                                            <li className='reg_li'>
                                                                <p></p>
                                                                <p>klantNaam</p>
                                                                <input placeholder="klantNaam" pattern="[a-zA-Z /s]{1,15}" title="klantNaam moet bestaan uit 1 tot en met 15 letters"
                                                                type="text" name="klantNaam" className="form-control" value={this.state.klantNaam} required={true}
                                                                onChange={(event:any) => this.setState({klantNaam: event.target.value})}
                                                                 />
                                                            </li>              
                                                            <li className='reg_li'>
                                                                <p>klantAchternaam</p>
                                                                <input placeholder="klantAchternaam" pattern="[a-zA-Z /s]{1,30}" title="klantAchternaam moet bestaan uit 1 tot 30 letters" 
                                                                type="text" name="klantAchternaam" className="form-control"  value={this.state.klantAchternaam} required={true} 
                                                                onChange={(event:any) => this.setState({klantAchternaam: event.target.value})}
                                                                
                                                                />
                                                            </li>            
                                                            <li className='reg_li'>
                                                                <p>klantTussenvoegsel</p>
                                                                <input placeholder="klantTussenvoegsel"
                                                                title='klantTussenvoegsel moet alleen uit letters bestaan'
                                                                type="text" name="klantTussenvoegsel"className="form-control"  value={this.state.klantTussenvoegsel} required={false} 
                                                                onChange={(event:any) => this.setState({klantTussenvoegsel: event.target.value})}
                                                                />
                                                            </li>            
                                                            <li className='reg_li'>
                                                                <p>klantTel</p>
                                                                <input placeholder="klantTel" pattern="[0-9]{1,30}" title="gebruikers naam mag maximaal uit 8 tekens bestaan"
                                                                type="text" name="klantTel"className="form-control"  value={this.state.klantTel} required={true}
                                                                onChange={(event:any) => this.setState({klantTel: event.target.value})}
                                                                />
                                                            </li>            
                                                            <li className='reg_li'>
                                                                <p>klantMail</p>
                                                                <input placeholder="klantMail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+[.]+[a-z]{2,3}$" title="klantMail moet minstens 6 waardes bevatten"
                                                                type="klantMail" name="klantMail"className="form-control"  value={this.state.klantMail} required={true} 
                                                                onChange={(event:any) => this.setState({klantMail: event.target.value})}
                                                                /> 
                                                            </li>            
                                                            <li className='reg_li'>
                                                                <p>klantStraat</p>
                                                                <input placeholder='klantStraat' pattern="[a-zA-Z /s]{2,30}" title="vul een juist adres in"
                                                                type="text" name="klantStraat"className="form-control"  value={this.state.klantStraat} required={true} 
                                                                onChange={(event:any) => this.setState({klantStraat: event.target.value})}
                                                                
                                                                />
                                                            </li>            
                                                            <li className='reg_li'>
                                                                <p>klantPostcode</p>
                                                                <input placeholder='klantPostcode' pattern="[1-9][0-9]{3}\s?[a-zA-Z]{2}" title="vul een juist image in"
                                                                type="text" name="klantPostcode"className="form-control"  value={this.state.klantPostcode} required={true} 
                                                                onChange={(event:any) => this.setState({klantPostcode: event.target.value})}
                                                                
                                                                />
                                                            </li>            
                                                            <li className='reg_li'>
                                                                <p>klantStraatnmr</p>
                                                                <input placeholder="klantStraatnmr" pattern="[0-9]{0,5}" title="klantStraatnmr moet uit 4 cijfers en 2 letters bestaan" 
                                                                type="text" name="klantStraatnmr"className="form-control"  value={this.state.klantStraatnmr} required={true} 
                                                                onChange={(event:any) => this.setState({klantStraatnmr: event.target.value})} />
                                                            </li>   
                                                            <li className='reg_li'>
                                                                <p>username</p>
                                                                <input placeholder="username" pattern="[a-zA-Z0-9]{3,15}"  title="username moet uit 4 cijfers en 2 letters bestaan" 
                                                                type="text" name="username"className="form-control"  value={this.state.username} required={true} 
                                                                onChange={(event:any) => this.setState({username: event.target.value})} />
                                                            </li>       
                                                            <li className='reg_li'>
                                                                <p>password</p>
                                                                <input placeholder="password" pattern=".{6,}"  title="klantStraatnmr moet uit 4 cijfers en 2 letters bestaan" 
                                                                type="text" name="password"className="form-control"  value={this.state.password} required={true} 
                                                                onChange={(event:any) => this.setState({password: event.target.value})} />
                                                            </li>                
                                                            <li><input className="btn-primary" placeholder="Wijzigen" type="submit" value="Wijzigen"/> </li>
                                                            </div>
                                                            </div>
                                                            </form></ul>
                                                            </div>
                                                        :
                                                        null
                                                    }
                                                </div>
                                           
                                            
                                        )
                                    }
                                )
                                :
                                <div className="sk-fading-circle">
                                    <div className="sk-circle1 sk-circle"></div>
                                    <div className="sk-circle2 sk-circle"></div>
                                    <div className="sk-circle3 sk-circle"></div>
                                    <div className="sk-circle4 sk-circle"></div>
                                    <div className="sk-circle5 sk-circle"></div>
                                    <div className="sk-circle6 sk-circle"></div>
                                    <div className="sk-circle7 sk-circle"></div>
                                    <div className="sk-circle8 sk-circle"></div>
                                    <div className="sk-circle9 sk-circle"></div>
                                    <div className="sk-circle10 sk-circle"></div>
                                    <div className="sk-circle11 sk-circle"></div>
                                    <div className="sk-circle12 sk-circle"></div>
                                </div>
                            }
            
                            <div>
                                
                            </div>
            
                        </div>
                        </div>
                    );
                }     
            }
        
    
