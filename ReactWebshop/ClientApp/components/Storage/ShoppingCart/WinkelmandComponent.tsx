import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {product, category}  from '../../DatabaseSimulation/TableTypes';

interface WinkelmandProps{
    shoppingCartProduct: product;
    RemoveItemFromStorage(fk:number, category:category);
}

interface WinkelmandState{   
}

export class WinkelMandComponent extends React.Component<WinkelmandProps, WinkelmandState> {
    constructor(props: any){
        super(props);
        this.RemoveItemFromStorage = this.RemoveItemFromStorage.bind(this);
       
    }
    RemoveItemFromStorage(){
        this.props.RemoveItemFromStorage(this.props.shoppingCartProduct.pk, this.props.shoppingCartProduct.category)
    }
    render(){
        return <div className={"Winkelmand"}>                  
                    <div>
                    <h1>Winkelmand</h1>
                    <li>  <img src={this.props.shoppingCartProduct.image}  height={300}/> </li>
                    <div> <h2> Naam: {this.props.shoppingCartProduct.name} </h2> </div>
                    <div> <h2> Prijs: {"€" + this.props.shoppingCartProduct.price.toFixed(2)} </h2> </div>
                    <h2> <button onClick={this.RemoveItemFromStorage}> Remove from shopping cart </button> </h2>
                
                    </div> 
                    </div>                
    }
}
export default WinkelMandComponent;