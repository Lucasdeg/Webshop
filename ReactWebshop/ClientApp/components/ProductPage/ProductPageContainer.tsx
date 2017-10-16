import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {game, wishList,shoppingCart, console, product, category, storage, storageCategory} from "../DatabaseSimulation/TableTypes";
import {gameTableData, wishListData, shoppingCartdata, consoleTableData} from "../DatabaseSimulation/FakeDatabase";
import {consoleType} from "../DatabaseSimulation/ConsoleTable";
import {ProductPageComponent} from "./ProductPageComponent";
import {List} from "linqts";

//The product page

interface ProductPageState{
    product: string;
    consoleImage: string;
    loaded: boolean;
}
export class ProductPage extends React.Component<RouteComponentProps<{}>, ProductPageState>{
    constructor(){
        super();
        this.CheckChoosenConsole = this.CheckChoosenConsole.bind(this)
        this.AddToStorage = this.AddToStorage.bind(this);
        this.StorageAddHandler = this.StorageAddHandler.bind(this);
        this.NotificationAlert = this.NotificationAlert.bind(this);
        var ProductsToShow = new List<product>();
        this.state = {product: JSON.stringify(gameTableData.ElementAt(1)), consoleImage: "", loaded: false}; 
    }
    //The console image will be loaded
    componentWillMount(){
        this.CheckChoosenConsole().then(consoleImage => this.setState({consoleImage: consoleImage, loaded: true}))     
    }
    StorageAddHandler(isShoppingCart: boolean){
        this.AddToStorage(this.state.product, 1, isShoppingCart);
    }

    //wishlist PK and account manually inserted, this can be changed later that it checks the logged in user's PK.
    //See how to add the foreign key reference
    AddToStorage(productObjectAsString: string, loggedInUser: number, isShoppingcart: boolean ){
         var product = JSON.parse(productObjectAsString);

        var productToAddToStorage: storage;
        productToAddToStorage = {pk: wishListData.Count() + 1, accountFK: loggedInUser, productFK: product.pk,
        productForeignKeyReference: product.category, categoryKind: storageCategory.shoppingCart} 

        if(productToAddToStorage.categoryKind == storageCategory.shoppingCart){
            shoppingCartdata.Add(productToAddToStorage)
        }
        else{
            wishListData.Add(productToAddToStorage);
        }
        this.NotificationAlert(product, isShoppingcart);
    } 
    NotificationAlert(product: product, isForTheShoppingcart: boolean){
        if(shoppingCartdata){
            alert(product.name + " has been added to ShoppingCart!")
        }
        else{
            alert(product.name + " has been added to WishList!")
        }
    }

    CheckChoosenConsole() : Promise<string>{
        var xbox360Image = "https://www.blogcdn.com/www.joystiq.com/media/2012/09/xbox360logo.jpg"
        var xboxOneImage = "https://cdn.worldvectorlogo.com/logos/xbox-one-2.svg"
        var playstation3Image = "https://www.dafont.com/forum/attach/orig/3/6/36582.jpg"
        var playstation4Image = "https://www.geek.com/wp-content/uploads/2013/02/PlayStation4_logo.jpg"
        var consoleImage = ""

        switch(JSON.parse(this.state.product).console){
            case(consoleType.xbox360):
                consoleImage = xbox360Image;
            case(consoleType.xboxOne):
                consoleImage = xboxOneImage;
            case(consoleType.playstation3):
                consoleImage = playstation3Image;
            case(consoleType.playstation4):
                consoleImage = playstation4Image
        }
        return Promise.resolve(consoleImage);
    }
    render() {   
        return ( 
            <div>
                {this.state.loaded ? 
                <ProductPageComponent  product={this.state.product} consoleImage={this.state.consoleImage}
                AddProductToStorage={this.StorageAddHandler}/>    
                :
                <div> Loading... </div>
                }
            </div>
        );
    }
}           