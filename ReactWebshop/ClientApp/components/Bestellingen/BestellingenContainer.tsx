import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image';
import {List} from "linqts";
import {User} from "../User/User";
import {AbstractStorage,StorageState} from "../Storage/ReusableComponents/Storage";
import { Product, Bestelling, JoinedBestelling } from 'ClientApp/components/Items/ItemsInterfaces';

export class BestellingenContainer extends AbstractStorage {
    constructor(){
        super();
        //If the user is logged in, it gets the PK of the logged in user and adds it to the state;
        this.state = {
            customerID: User.getStorageId(), 
            isShoppingCart:false, 
            loaded:false, 
            products: [], 
            totalPrice: 0, 
            ordered: true,
            formVoornaam: "",
            formAchternaam: "",
            formStraatnaam: "",
            formStraatnummer: "",
            formPostcode: "",
            formEmail: "",
            productdata: []}
    }

    componentDidMount(){
        this.GetOrders();
    }

    async GetOrders(){
        if (this.state.customerID == 0)
        {
            return false;
        }
        else{
            console.log(this.state.customerID)
            await fetch('api/Bestellingen/Get/' + this.state.customerID)
            .then(response => response.json() as Promise<JoinedBestelling[]>)
            .then(data =>{
               console.log("GetOrders geeft " + data[0]);
               data = data.reverse();
               this.setState({products: data})
            });

        }
    }
    async UpdateBestelling(order, statusstring){
        let apiUrl = 'api/Bestellingen';
        let OrderToPost: Bestelling = {
            BestellingId: order.BestellingId,
            productId: order.productId,
            bestellingDatum: order.bestellingDatum,
            verstuurDatum: new Date(),
            status: statusstring,
            klantId: order.klantId.klantId
        }
        let apiResponse = await fetch(apiUrl, {method: "PUT", body:JSON.stringify(OrderToPost), headers: new Headers({'content-type' : 'application/json'})});
        alert("Voltooid");
        
    }

    render() {
        return (
            
        <div className={"Container"}>
            <div className='container'>
                <div className='col-md-9'>
                <h1>Bestellingen</h1>
            </div>
            </div>
                <div>
                {this.state.products.map(
                    order =>{
                        return(
                            <div className={"Component"}>
                            <div className='container'>
                                <div className="panel panel-default">    
                                <div className='col-md-2'>
                                        <div className="panel-body"><img className="img-responsive" src={order.productId.productImg}/></div>
                                    </div>
                                    <div className='col-md-4'>
                                        <p>Status: {order.status}</p>
                                        <p>Prijs: €{order.productId.productPrijs}</p>
                                        <p>Besteldatum: {order.bestellingDatum}</p>
                                        <p>Verstuurdatum: {order.verstuurDatum}</p>
                                    </div>
                                </div>
                                </div>

                            </div>
                        )
                    }

                )
                
                }


                </div>


        </div>
        );
    }
}           
export default BestellingenContainer;