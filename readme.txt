För att komma igång:

1. Hämta node.js
2. npm install -g @angular/cli
3. Installera .NET Core SDK
4. Navigera till webprojektets mapp och skriv
	npm install && npm run build:dev

Kommandon att komma ihåg:
dotnet restore, build, run
npm install, run build:dev (tillgängliga klientscript i package.json)

*** UPPGIFT 2018-02-22 - Tjänster och Shopping Cart ***

Nu när vi har fått en grundläggande design på vår första produktsida ska vi skapa riktiga tjänster för våra produkter,
och när användaren sedan lägger till en produkt ska man kunna hitta den i sin shopping cart. Er uppgift är att 

1. Skapa en tjänst som kan leverera produkter till våra components. Just nu har vi hårdkodat produkter i tech.component,
men det vi vill göra är att skapa en product.service.ts som vi kan injicera i våra components enligt 'constructor(productService: IProductService)'.
Då kan vi hämta produkterna därifrån istället. Till att börja med kan vi helt enkelt flytta hårdkodningen från tech.component 
till productService. Det innebär också att IProduct-interfacet måste flyttas till sin egen fil eftersom det nu behöver 
vara tillgängligt på flera ställen i vår applikation.

2. Utöka addToCart-metoden i vår tech.component.ts. Istället för att logga till konsollen när man lägger till en produkt 
ska vi nu lägga till den i vår shopping cart. Skapa en ShoppingCartService som tar hand om de produkter användaren 
lägger till. Förslagsvis injiceras den här också i constructorn enligt constructor(..., shoppingCartService: IShoppingCartService),
och så kallar ni på en add-metod som ni definierar i den tjänsten. I kommande session ska vi designa en vy för den här 
tjänsten, men nu räcker det med att logga dess innehåll.

Här har ni en utförlig tutorial för tjänster i Angular: https://angular.io/tutorial/toh-pt4




