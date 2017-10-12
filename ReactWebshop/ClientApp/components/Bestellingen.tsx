import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image'

interface BestellingenState{
    games: BestellingenGame[] 
}
//React reacts bad to self created classes, that is why a type is created
export type BestellingenGame = {
    name:string,
    console: string,
    price: number,
    category:string,
    orderdate: number | null,
    status: string | null,
    image: string
}

export class Bestellingen extends React.Component<RouteComponentProps<{}>, BestellingenState> {
    constructor(){
        super();
        this.CreateGamesAndLocalStorage = this.CreateGamesAndLocalStorage.bind(this);
        this.ConvertJson = this.ConvertJson.bind(this);
        this.state = {games:[]}
    }
    //Adds games to the local storage
    CreateGamesAndLocalStorage(){
    }
    ConvertJson() : any{
        //hier wordt de value van wenslijst naar string gecast om vervolgens naar een JSON object te worden gecast
        var games = JSON.parse(String(localStorage.getItem('bestellingen')));    
        this.setState({games: games.list})     
    }
    //This will get called when the component gets mounted (loaded)
    componentWillMount(){
        //this.CreateGamesAndLocalStorage();
        this.ConvertJson()

    }
    render() {
        return <div className={"Orders"}>      
                <h1>Bestellingen</h1>
                {this.state.games.map(game => (
                  <div>
                   <li> <img src={game.image}  height={300}/> </li>
                   <div> <h2> {game.name} </h2> </div>
                   <div> <h2> Besteld op: {game.orderdate} </h2></div>
                   <div> <h2> Status: {game.status} </h2></div>
                   <div> _________________________ </div>
                   </div>
                ))}           
            </div>; 
    }
}
