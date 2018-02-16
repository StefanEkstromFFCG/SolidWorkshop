F�r att komma ig�ng:

1. H�mta node.js
2. npm install -g @angular/cli
3. Installera .NET Core SDK
4. Navigera till webprojektets mapp och skriv
	npm install && npm run build:dev

Kommandon att komma ih�g:
dotnet restore, build, run
npm install, run build:dev (tillg�ngliga klientscript i package.json)

*** UPPGIFT 2018-02-22 - Tj�nster och Shopping Cart ***

Nu n�r vi har f�tt en grundl�ggande design p� v�r f�rsta produktsida ska vi skapa riktiga tj�nster f�r v�ra produkter,
och n�r anv�ndaren sedan l�gger till en produkt ska man kunna hitta den i sin shopping cart. Er uppgift �r att 

1. Skapa en tj�nst som kan leverera produkter till v�ra components. Just nu har vi h�rdkodat produkter i tech.component,
men det vi vill g�ra �r att skapa en product.service.ts som vi kan injicera i v�ra components enligt 'constructor(productService: IProductService)'.
D� kan vi h�mta produkterna d�rifr�n ist�llet. Till att b�rja med kan vi helt enkelt flytta h�rdkodningen fr�n tech.component 
till productService. Det inneb�r ocks� att IProduct-interfacet m�ste flyttas till sin egen fil eftersom det nu beh�ver 
vara tillg�ngligt p� flera st�llen i v�r applikation.

2. Ut�ka addToCart-metoden i v�r tech.component.ts. Ist�llet f�r att logga till konsollen n�r man l�gger till en produkt 
ska vi nu l�gga till den i v�r shopping cart. Skapa en ShoppingCartService som tar hand om de produkter anv�ndaren 
l�gger till. F�rslagsvis injiceras den h�r ocks� i constructorn enligt constructor(..., shoppingCartService: IShoppingCartService),
och s� kallar ni p� en add-metod som ni definierar i den tj�nsten. I kommande session ska vi designa en vy f�r den h�r 
tj�nsten, men nu r�cker det med att logga dess inneh�ll.

H�r har ni en utf�rlig tutorial f�r tj�nster i Angular: https://angular.io/tutorial/toh-pt4




