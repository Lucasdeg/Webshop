class ProductLink {
    constructor(n, i, p) {
        this.name = n;
        this.imagelink = i;
        this.pagelink = p;
    }
    makelink() {
        return "<a href= " + this.pagelink + "><img src=" + this.imagelink + " /><h2></br>" + this.name + "</h2> Naar Product</a>";
    }
}
var array1 = [new ProductLink("DOOM", "\"Images/doom-cover-new.jpg\"", "\"ConsoleChoiceDoom.html\""), new ProductLink("Call of Duty: Advanced Warfare", "\"Images/COD-AW-cover.jpg\"", "\"ConsoleChoiceAW.html\""), new ProductLink("PlayerUnknown's Battlegrounds", "\"Images/PUBG-cover.jpg\"", "\"ConsoleChoiceBATTLE.html\""), new ProductLink("Xbox console", "\"Images/Xbox.jpeg\"", "\"XBoX.html\"")];
document.getElementById("search1").innerHTML = array1[0].makelink();
//# sourceMappingURL=searcher.js.map