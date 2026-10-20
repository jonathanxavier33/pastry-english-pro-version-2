/* Pastry English Pro - contenu pédagogique
   Chaque entrée : fr (français), en (anglais), ex (phrase d'exemple), hint (indice en anglais),
   alt (réponses alternatives acceptées en mode écriture, optionnel). */
const DATABASE = {
  "Classic Pastries": {
    icon: "🥐",
    items: [
      { fr: "L'éclair au chocolat", en: "Chocolate éclair", ex: "Fill the choux pastry with chocolate pastry cream.", hint: "Choux pastry filled with cream and topped with icing.", alt: ["chocolate eclair"] },
      { fr: "Le macaron", en: "Macaron", ex: "Sandwich the macaron shells with ganache.", hint: "Delicate almond meringue shells joined by a filling.", alt: ["macaroon"] },
      { fr: "La tarte au citron meringuée", en: "Lemon meringue pie", ex: "Torch the Italian meringue until golden.", hint: "Shortcrust base, lemon curd and a fluffy meringue topping." },
      { fr: "Le mille-feuille", en: "Mille-feuille", ex: "Layer the puff pastry with diplomat cream.", hint: "Also called a Napoleon: thin puff pastry layers and cream.", alt: ["napoleon", "millefeuille"] },
      { fr: "Le Paris-Brest", en: "Paris-Brest", ex: "Pipe the choux ring and top it with sliced almonds.", hint: "Ring-shaped choux pastry filled with praline cream." },
      { fr: "L'opéra", en: "Opera cake", ex: "Soak each sponge layer with coffee syrup.", hint: "Joconde sponge, coffee buttercream and chocolate ganache.", alt: ["opera"] },
      { fr: "La tarte Tatin", en: "Tarte Tatin", ex: "Caramelise the apples in butter and sugar.", hint: "An upside-down caramelised apple tart.", alt: ["tarte tatin"] },
      { fr: "Le Saint-Honoré", en: "Saint-Honoré", ex: "Dip the choux puffs in hot caramel.", hint: "Puff pastry base, caramelised choux puffs and chiboust cream.", alt: ["saint honore"] },
      { fr: "Le flan pâtissier", en: "Custard tart", ex: "Bake until the custard is lightly spotted.", hint: "Thick vanilla custard baked in a pastry case.", alt: ["flan"] },
      { fr: "Le baba au rhum", en: "Rum baba", ex: "Soak the baked baba in warm syrup.", hint: "A yeast cake soaked in a boozy syrup.", alt: ["baba au rhum"] },
      { fr: "La religieuse", en: "Religieuse", ex: "Stack the small choux bun on the large one.", hint: "Two choux buns stacked and filled with cream, like a little nun." },
      { fr: "Le kouign-amann", en: "Kouign-amann", ex: "Laminate the dough with plenty of butter and sugar.", hint: "A Breton cake with caramelised layers of butter and sugar." },
      { fr: "La brioche", en: "Brioche", ex: "Knead the butter into the enriched dough.", hint: "A soft, rich bread made with eggs and lots of butter." },
      { fr: "Le croissant", en: "Croissant", ex: "Roll the triangle of dough into a crescent.", hint: "A buttery, flaky, crescent-shaped viennoiserie." },
      { fr: "Le pain au chocolat", en: "Pain au chocolat", ex: "Place two chocolate sticks inside the dough.", hint: "Flaky laminated dough wrapped around chocolate.", alt: ["chocolate croissant"] },
      { fr: "Le chausson aux pommes", en: "Apple turnover", ex: "Seal the apple compote inside the puff pastry.", hint: "A half-moon of puff pastry filled with stewed apples." },
      { fr: "Le financier", en: "Financier", ex: "Bake the brown butter batter in small moulds.", hint: "A small almond cake made with browned butter.", alt: ["friand"] },
      { fr: "La madeleine", en: "Madeleine", ex: "Chill the batter to get the typical hump.", hint: "A small shell-shaped sponge cake." },
      { fr: "Le canelé", en: "Canelé", ex: "Coat the copper moulds with butter and beeswax.", hint: "A Bordeaux pastry with a dark caramelised crust and a soft centre.", alt: ["canele"] },
      { fr: "La galette des rois", en: "King cake", ex: "Hide a porcelain charm inside the frangipane.", hint: "A puff pastry cake with almond cream, eaten at Epiphany.", alt: ["galette des rois"] }
    ]
  },

  "Basic Ingredients": {
    icon: "🥚",
    items: [
      { fr: "La farine de blé", en: "Wheat flour", ex: "Sift the flour to avoid lumps.", hint: "The main powder used to make doughs and batters.", alt: ["flour"] },
      { fr: "Le sucre semoule", en: "Caster sugar", ex: "Weigh the caster sugar precisely.", hint: "Fine white sugar that dissolves quickly.", alt: ["superfine sugar"] },
      { fr: "Le sucre glace", en: "Icing sugar", ex: "Dust the tart with icing sugar before serving.", hint: "Very fine sugar powder. In the US: powdered sugar.", alt: ["powdered sugar", "confectioners sugar"] },
      { fr: "Le beurre doux", en: "Unsalted butter", ex: "Use unsalted butter so you control the seasoning.", hint: "Butter without added salt.", alt: ["sweet butter"] },
      { fr: "La crème liquide entière", en: "Heavy cream", ex: "Whip the cold heavy cream to stiff peaks.", hint: "Liquid dairy cream with over 30% fat.", alt: ["whipping cream", "double cream"] },
      { fr: "L'œuf entier", en: "Whole egg", ex: "Add the eggs one by one.", hint: "The yolk and the white together.", alt: ["egg"] },
      { fr: "Le jaune d'œuf", en: "Egg yolk", ex: "Whisk the egg yolks with sugar until pale.", hint: "The yellow part of an egg.", alt: ["yolk"] },
      { fr: "Le blanc d'œuf", en: "Egg white", ex: "Whisk the egg whites to firm peaks.", hint: "The clear part of an egg that turns white when whipped.", alt: ["white"] },
      { fr: "Le lait entier", en: "Whole milk", ex: "Bring the whole milk to the boil with the vanilla.", hint: "Milk with all its natural fat." },
      { fr: "La levure chimique", en: "Baking powder", ex: "Sift the baking powder with the flour.", hint: "A raising agent for cakes and sponges." },
      { fr: "La levure de boulanger", en: "Yeast", ex: "Dissolve the yeast in lukewarm milk.", hint: "A living ingredient that makes dough rise." },
      { fr: "La gousse de vanille", en: "Vanilla pod", ex: "Split the vanilla pod and scrape out the seeds.", hint: "A long dark pod full of tiny fragrant seeds.", alt: ["vanilla bean"] },
      { fr: "La poudre d'amande", en: "Ground almonds", ex: "Fold the ground almonds into the batter.", hint: "Almonds finely milled into a powder.", alt: ["almond flour", "almond powder"] },
      { fr: "Le chocolat noir", en: "Dark chocolate", ex: "Melt the dark chocolate over a bain-marie.", hint: "Chocolate with a high cocoa content and little sugar.", alt: ["plain chocolate"] },
      { fr: "La pâte d'amande", en: "Marzipan", ex: "Roll out the marzipan to cover the cake.", hint: "A sweet paste of almonds and sugar.", alt: ["almond paste"] },
      { fr: "Le praliné", en: "Praline paste", ex: "Mix the praline paste into the buttercream.", hint: "A smooth paste of caramelised nuts.", alt: ["praline"] },
      { fr: "La feuille de gélatine", en: "Gelatine sheet", ex: "Soak the gelatine sheets in cold water.", hint: "A setting agent sold in thin transparent sheets.", alt: ["gelatin sheet", "gelatine leaf", "gelatin leaf"] },
      { fr: "Le sirop de glucose", en: "Glucose syrup", ex: "Add glucose syrup to prevent crystallisation.", hint: "A thick sugar syrup that keeps preparations smooth." },
      { fr: "La fécule de maïs", en: "Cornstarch", ex: "Thicken the cream with cornstarch.", hint: "A fine white powder used as a thickener.", alt: ["cornflour", "corn starch"] },
      { fr: "La cassonade", en: "Brown sugar", ex: "Sprinkle brown sugar on top before baking.", hint: "Moist sugar with a caramel flavour.", alt: ["light brown sugar"] },
      { fr: "Le cacao en poudre", en: "Cocoa powder", ex: "Dust the tiramisu with cocoa powder.", hint: "Unsweetened ground cocoa beans." },
      { fr: "Le zeste de citron", en: "Lemon zest", ex: "Grate the lemon zest finely.", hint: "The thin, fragrant yellow skin of a lemon." },
      { fr: "Le colorant alimentaire", en: "Food colouring", ex: "Add a drop of food colouring to the shells.", hint: "A liquid or powder used to colour mixtures.", alt: ["food coloring", "food colour"] }
    ]
  },

  "Professional Tools": {
    icon: "🔧",
    items: [
      { fr: "Le fouet", en: "Whisk", ex: "Use a whisk to aerate the eggs.", hint: "A tool with looped wires for beating.", alt: ["wire whisk"] },
      { fr: "La maryse", en: "Rubber spatula", ex: "Scrape the bowl with a rubber spatula.", hint: "A flexible scraper for mixing and emptying bowls.", alt: ["silicone spatula", "spatula"] },
      { fr: "Le rouleau à pâtisserie", en: "Rolling pin", ex: "Roll out the dough evenly with a rolling pin.", hint: "A cylinder used to flatten dough." },
      { fr: "La poche à douille", en: "Piping bag", ex: "Fill the piping bag with choux cream.", hint: "A cone-shaped bag used to pipe cream or batter.", alt: ["pastry bag"] },
      { fr: "La douille", en: "Piping nozzle", ex: "Fit a star nozzle to the piping bag.", hint: "The metal or plastic tip that shapes the piped mixture.", alt: ["nozzle", "piping tip"] },
      { fr: "Le tapis en silicone", en: "Silicone baking mat", ex: "Place the choux buns on a silicone baking mat.", hint: "A reusable non-stick liner for baking trays.", alt: ["silpat"] },
      { fr: "Le batteur mélangeur", en: "Stand mixer", ex: "Beat the batter in the stand mixer.", hint: "An electric machine with a bowl and interchangeable attachments.", alt: ["mixer"] },
      { fr: "Le pétrin", en: "Dough mixer", ex: "Knead the brioche dough in the dough mixer.", hint: "A machine that kneads large quantities of dough.", alt: ["spiral mixer"] },
      { fr: "La balance", en: "Scale", ex: "Weigh the flour on the scale.", hint: "Used to measure ingredients precisely.", alt: ["scales", "kitchen scale"] },
      { fr: "Le thermomètre à sucre", en: "Sugar thermometer", ex: "Check the syrup with the sugar thermometer.", hint: "Measures the temperature of cooked sugar.", alt: ["candy thermometer"] },
      { fr: "Le cercle à tarte", en: "Tart ring", ex: "Line the tart ring with the dough.", hint: "A bottomless metal ring used to shape tarts." },
      { fr: "Le moule à cake", en: "Loaf tin", ex: "Grease the loaf tin with butter.", hint: "A rectangular tin for cakes and breads.", alt: ["loaf pan"] },
      { fr: "Le tamis", en: "Sieve", ex: "Pass the icing sugar through a sieve.", hint: "A mesh tool that removes lumps from dry ingredients.", alt: ["sifter"] },
      { fr: "Le chinois", en: "Fine strainer", ex: "Strain the custard through a fine strainer.", hint: "A cone-shaped strainer for smooth sauces and creams.", alt: ["chinois", "conical strainer"] },
      { fr: "La spatule coudée", en: "Offset spatula", ex: "Smooth the cream with an offset spatula.", hint: "A flat blade with a bent handle for spreading." },
      { fr: "Le pinceau", en: "Pastry brush", ex: "Brush the croissants with egg wash.", hint: "A small brush for glazing and greasing.", alt: ["brush"] },
      { fr: "Le couteau scie", en: "Serrated knife", ex: "Cut the sponge with a serrated knife.", hint: "A knife with a toothed edge for cakes and bread.", alt: ["bread knife"] },
      { fr: "La corne", en: "Dough scraper", ex: "Divide the dough with a dough scraper.", hint: "A flat tool for cutting dough and cleaning the worktop.", alt: ["bench scraper"] },
      { fr: "La plaque à pâtisserie", en: "Baking tray", ex: "Line the baking tray with baking paper.", hint: "A flat metal sheet used in the oven.", alt: ["baking sheet"] },
      { fr: "La grille de refroidissement", en: "Cooling rack", ex: "Leave the cakes on a cooling rack.", hint: "A wire rack that lets air circulate under baked goods.", alt: ["wire rack"] },
      { fr: "Le chalumeau", en: "Blowtorch", ex: "Brown the meringue with a blowtorch.", hint: "A small flame tool used to caramelise and colour.", alt: ["kitchen torch", "torch"] },
      { fr: "La chambre de pousse", en: "Proofing cabinet", ex: "Place the trays in the proofing cabinet.", hint: "A warm, humid cabinet where dough rises.", alt: ["proofer", "proving cabinet"] },
      { fr: "Le laminoir", en: "Dough sheeter", ex: "Roll the dough through the dough sheeter.", hint: "A machine that rolls dough to an even thickness." },
      { fr: "L'emporte-pièce", en: "Cookie cutter", ex: "Cut out the biscuits with a cookie cutter.", hint: "A metal shape used to cut dough.", alt: ["pastry cutter"] }
    ]
  },

  "Techniques & Verbs": {
    icon: "👩‍🍳",
    items: [
      { fr: "Fouetter", en: "To whisk", ex: "Whisk the eggs and sugar together.", hint: "Beat quickly to add air or mix.", alt: ["whisk"] },
      { fr: "Tamiser", en: "To sift", ex: "Sift the flour and the cocoa together.", hint: "Pass dry ingredients through a sieve.", alt: ["sift", "sieve"] },
      { fr: "Pétrir", en: "To knead", ex: "Knead the dough for ten minutes.", hint: "Work dough with your hands or a machine.", alt: ["knead"] },
      { fr: "Abaisser la pâte", en: "To roll out", ex: "Roll out the dough to three millimetres.", hint: "Flatten dough with a rolling pin.", alt: ["roll out", "to roll out the dough"] },
      { fr: "Foncer un cercle", en: "To line a tart ring", ex: "Line the tart ring and trim the edges.", hint: "Press dough into a ring or tin.", alt: ["line a tart ring", "to line"] },
      { fr: "Piquer la pâte", en: "To prick the dough", ex: "Prick the base with a fork before baking.", hint: "Make small holes so the dough does not puff up.", alt: ["prick", "to prick"] },
      { fr: "Pocher", en: "To pipe", ex: "Pipe the choux into even rings.", hint: "Squeeze a mixture from a piping bag.", alt: ["pipe"] },
      { fr: "Napper", en: "To glaze", ex: "Glaze the entremets with a mirror glaze.", hint: "Cover a dessert with a smooth coating.", alt: ["glaze", "to coat", "coat"] },
      { fr: "Incorporer délicatement", en: "To fold in", ex: "Fold in the whipped cream gently.", hint: "Mix gently to keep the air in.", alt: ["fold in", "fold"] },
      { fr: "Monter les blancs en neige", en: "To whip egg whites", ex: "Whip the egg whites to stiff peaks.", hint: "Beat egg whites until they are firm.", alt: ["whip egg whites", "to whisk egg whites"] },
      { fr: "Blanchir les jaunes", en: "To whisk until pale", ex: "Whisk the yolks and sugar until pale and thick.", hint: "Beat yolks and sugar until they lighten in colour.", alt: ["whisk until pale"] },
      { fr: "Cuire à blanc", en: "To blind bake", ex: "Blind bake the tart shell for fifteen minutes.", hint: "Bake a pastry case without its filling.", alt: ["blind bake"] },
      { fr: "Dorer", en: "To egg wash", ex: "Egg wash the croissants before baking.", hint: "Brush with beaten egg for a shiny crust.", alt: ["egg wash", "to glaze with egg"] },
      { fr: "Laminer", en: "To laminate", ex: "Laminate the dough with three folds.", hint: "Fold butter into dough to create thin layers.", alt: ["laminate"] },
      { fr: "Laisser pousser", en: "To proof", ex: "Let the dough proof for two hours.", hint: "Let yeast dough rise before baking.", alt: ["proof", "to prove", "prove"] },
      { fr: "Tempérer le chocolat", en: "To temper chocolate", ex: "Temper the chocolate before moulding.", hint: "Heat and cool chocolate so it sets shiny.", alt: ["temper"] },
      { fr: "Démouler", en: "To unmould", ex: "Unmould the entremets carefully.", hint: "Remove a dessert from its mould.", alt: ["unmould", "to unmold", "unmold"] },
      { fr: "Imbiber", en: "To soak", ex: "Soak the sponge with syrup.", hint: "Moisten a cake with syrup or alcohol.", alt: ["soak"] },
      { fr: "Garnir", en: "To fill", ex: "Fill the choux with pastry cream.", hint: "Put cream or filling inside a pastry.", alt: ["fill"] },
      { fr: "Passer au chinois", en: "To strain", ex: "Strain the cream through a fine sieve.", hint: "Remove lumps by passing a liquid through a strainer.", alt: ["strain"] },
      { fr: "Sabler", en: "To rub in", ex: "Rub the butter into the flour until sandy.", hint: "Work butter into flour with your fingertips.", alt: ["rub in"] },
      { fr: "Râper", en: "To grate", ex: "Grate the zest of two lemons.", hint: "Rub food on a grater to make small pieces.", alt: ["grate"] }
    ]
  },

  "Doughs & Creams": {
    icon: "🍮",
    items: [
      { fr: "La pâte brisée", en: "Shortcrust pastry", ex: "Rest the shortcrust pastry in the fridge.", hint: "A crumbly, unsweetened pastry for tarts and quiches." },
      { fr: "La pâte sablée", en: "Sweet shortcrust pastry", ex: "Roll out the sweet shortcrust pastry between two sheets of paper.", hint: "A rich, sandy and sweet pastry for tarts.", alt: ["sweet pastry"] },
      { fr: "La pâte feuilletée", en: "Puff pastry", ex: "Give the puff pastry six single turns.", hint: "Flaky pastry made of many layers of dough and butter." },
      { fr: "La pâte à choux", en: "Choux pastry", ex: "Dry out the choux paste on the heat.", hint: "A light pastry cooked first on the hob, then baked.", alt: ["choux paste"] },
      { fr: "La génoise", en: "Genoise sponge", ex: "Whisk the eggs and sugar over warm water for the genoise.", hint: "A light sponge based on whole eggs.", alt: ["genoise", "sponge cake"] },
      { fr: "Le biscuit Joconde", en: "Joconde sponge", ex: "Spread the Joconde sponge thinly on the tray.", hint: "A thin almond sponge used in layered cakes.", alt: ["joconde"] },
      { fr: "La meringue italienne", en: "Italian meringue", ex: "Pour the hot syrup over the egg whites for the Italian meringue.", hint: "A stable meringue made with hot sugar syrup." },
      { fr: "La crème pâtissière", en: "Pastry cream", ex: "Cool the pastry cream quickly in the blast chiller.", hint: "A thick vanilla custard used to fill choux and tarts.", alt: ["custard cream", "confectioner's custard"] },
      { fr: "La crème anglaise", en: "Custard sauce", ex: "Cook the custard sauce until it coats the spoon.", hint: "A pouring custard made of milk, eggs and sugar.", alt: ["creme anglaise", "custard"] },
      { fr: "La crème chantilly", en: "Whipped cream", ex: "Pipe the whipped cream on top of the strawberries.", hint: "Cream beaten until light and airy, often sweetened.", alt: ["chantilly cream", "chantilly"] },
      { fr: "La crème d'amande", en: "Almond cream", ex: "Spread the almond cream over the base.", hint: "A mixture of butter, sugar, eggs and ground almonds." },
      { fr: "La frangipane", en: "Frangipane", ex: "Mix the almond cream with pastry cream to make frangipane.", hint: "Almond cream lightened with pastry cream." },
      { fr: "La crème au beurre", en: "Buttercream", ex: "Beat the buttercream until smooth.", hint: "A rich cream made of butter and sugar or egg yolks.", alt: ["butter cream"] },
      { fr: "La ganache", en: "Ganache", ex: "Pour the hot cream over the chocolate to make the ganache.", hint: "A smooth mixture of chocolate and cream." },
      { fr: "La crème diplomate", en: "Diplomat cream", ex: "Fold whipped cream into the pastry cream for diplomat cream.", hint: "Pastry cream lightened with whipped cream." },
      { fr: "La crème mousseline", en: "Mousseline cream", ex: "Whisk soft butter into the pastry cream for mousseline cream.", hint: "Pastry cream enriched with butter." },
      { fr: "Le coulis", en: "Fruit coulis", ex: "Serve the dessert with a raspberry coulis.", hint: "A smooth sauce made from puréed fruit.", alt: ["coulis"] },
      { fr: "Le nappage", en: "Pastry glaze", ex: "Brush the fruit tart with pastry glaze.", hint: "A shiny gel that protects and glosses fruit.", alt: ["glaze", "apricot glaze"] },
      { fr: "Le fondant", en: "Fondant icing", ex: "Warm the fondant icing before glazing the éclairs.", hint: "A soft white sugar paste used to ice pastries.", alt: ["fondant"] },
      { fr: "Le sirop d'imbibage", en: "Soaking syrup", ex: "Brush the sponge with soaking syrup.", hint: "Sugar syrup that moistens a sponge.", alt: ["syrup"] }
    ]
  },

  "Hygiene & Safety": {
    icon: "🧼",
    items: [
      { fr: "Se laver les mains", en: "To wash your hands", ex: "Wash your hands before handling the dough.", hint: "The first rule of food hygiene.", alt: ["wash your hands", "wash hands"] },
      { fr: "La tenue de travail", en: "Work uniform", ex: "Put on a clean work uniform every day.", hint: "Clean clothing worn in the kitchen.", alt: ["chef whites", "uniform", "work clothes"] },
      { fr: "La charlotte", en: "Hairnet", ex: "Wear a hairnet in the production area.", hint: "A cap that stops hair from falling into food.", alt: ["hair net"] },
      { fr: "Les gants jetables", en: "Disposable gloves", ex: "Change your disposable gloves between tasks.", hint: "Single-use gloves for handling ready-to-eat food." },
      { fr: "Le plan de travail", en: "Worktop", ex: "Clean the worktop after each preparation.", hint: "The surface where you prepare food.", alt: ["work surface", "countertop", "bench"] },
      { fr: "Désinfecter", en: "To disinfect", ex: "Disinfect the knives and the boards.", hint: "Kill germs on a surface.", alt: ["disinfect", "to sanitise", "sanitise", "to sanitize", "sanitize"] },
      { fr: "La contamination croisée", en: "Cross-contamination", ex: "Use separate boards to avoid cross-contamination.", hint: "When germs pass from one food or surface to another.", alt: ["cross contamination"] },
      { fr: "La date limite de consommation", en: "Use-by date", ex: "Never use a product after its use-by date.", hint: "The last safe day to eat a perishable product.", alt: ["use by date", "dlc"] },
      { fr: "La date de durabilité minimale", en: "Best-before date", ex: "Check the best-before date on the flour bag.", hint: "After this date the quality may decrease.", alt: ["best before date", "ddm"] },
      { fr: "La chaîne du froid", en: "Cold chain", ex: "Respect the cold chain when you receive deliveries.", hint: "Keeping food at the right cold temperature from supplier to customer." },
      { fr: "Les allergènes", en: "Allergens", ex: "List the allergens on the label.", hint: "Ingredients that can cause allergic reactions, like nuts or gluten.", alt: ["allergen"] },
      { fr: "La température à cœur", en: "Core temperature", ex: "Check the core temperature of the cream.", hint: "The temperature at the centre of a product." },
      { fr: "La traçabilité", en: "Traceability", ex: "Keep the labels for traceability.", hint: "Being able to track a product from origin to sale." },
      { fr: "La chambre froide", en: "Cold room", ex: "Store the cream in the cold room.", hint: "A large refrigerated room for storage.", alt: ["walk-in fridge", "walk in fridge", "walk-in refrigerator"] },
      { fr: "Les denrées périssables", en: "Perishable goods", ex: "Put the perishable goods away immediately.", hint: "Food that spoils quickly.", alt: ["perishables", "perishable food"] },
      { fr: "Le sol glissant", en: "Slippery floor", ex: "Mop up the slippery floor straight away.", hint: "A wet floor is a danger for falls.", alt: ["wet floor"] },
      { fr: "Les chaussures de sécurité", en: "Safety shoes", ex: "Wear safety shoes in the workshop.", hint: "Non-slip shoes that protect your feet.", alt: ["safety boots", "safety footwear"] },
      { fr: "Le risque de brûlure", en: "Risk of burns", ex: "There is a risk of burns near the oven.", hint: "A danger when working with hot sugar or ovens.", alt: ["burn risk", "risk of burn"] }
    ]
  },

  "At the Counter": {
    icon: "🛎️",
    items: [
      { fr: "Bonjour, que puis-je pour vous ?", en: "Hello, how can I help you?", ex: "A customer walks into the pastry shop.", hint: "A polite greeting to open the sale.", alt: ["hello, can i help you?", "hello how can i help you"] },
      { fr: "Je voudrais une tarte aux fraises, s'il vous plaît.", en: "I would like a strawberry tart, please.", ex: "Customer: I would like a strawberry tart, please. You: Of course.", hint: "How a customer orders politely.", alt: ["i'd like a strawberry tart, please."] },
      { fr: "C'est pour emporter ou sur place ?", en: "Is it to take away or to eat in?", ex: "Ask this before you prepare the order.", hint: "A question about where the customer will eat.", alt: ["is it takeaway or eat in?", "takeaway or eat in?"] },
      { fr: "Avez-vous des gâteaux sans gluten ?", en: "Do you have any gluten-free cakes?", ex: "Customer: Do you have any gluten-free cakes? You: Yes, on the left.", hint: "A common question about diet.", alt: ["do you have gluten-free cakes?"] },
      { fr: "Ce gâteau contient des fruits à coque.", en: "This cake contains nuts.", ex: "Always tell customers about allergens.", hint: "An important allergen warning.", alt: ["this cake contains tree nuts."] },
      { fr: "Pour combien de personnes ?", en: "How many people is it for?", ex: "Customer: It is for eight people.", hint: "Ask this when someone orders a large cake." },
      { fr: "Voulez-vous un message sur le gâteau ?", en: "Would you like a message on the cake?", ex: "Customer: Yes, write Happy Birthday Emma.", hint: "Offer a personalised inscription." },
      { fr: "Ce sera prêt vendredi à midi.", en: "It will be ready on Friday at noon.", ex: "Write the pick-up time on the order form.", hint: "Giving a pick-up time.", alt: ["it will be ready by friday at noon.", "it will be ready friday at noon."] },
      { fr: "Cela fait douze euros cinquante.", en: "That is twelve euros fifty.", ex: "Say the price clearly and wait for payment.", hint: "Telling the total price.", alt: ["that's twelve euros fifty.", "it is twelve euros fifty.", "that will be twelve euros fifty."] },
      { fr: "Je suis désolé, nous n'en avons plus.", en: "I am sorry, we have run out.", ex: "Offer another cake when something is sold out.", hint: "Apologising when a product is unavailable.", alt: ["i'm sorry, we've run out.", "i am sorry, we are out of it.", "sorry, we have run out."] },
      { fr: "Puis-je vous proposer une boîte cadeau ?", en: "Can I offer you a gift box?", ex: "A gift box makes the cakes look special.", hint: "Suggesting a nicer packaging.", alt: ["would you like a gift box?", "shall i put it in a gift box?"] },
      { fr: "Voulez-vous régler par carte ?", en: "Would you like to pay by card?", ex: "Hold out the card machine to the customer.", hint: "Asking about the payment method.", alt: ["will you pay by card?", "do you want to pay by card?"] },
      { fr: "Pouvez-vous le faire sans lactose ?", en: "Can you make it lactose-free?", ex: "Customer: Can you make it lactose-free? You: I will ask the chef.", hint: "A customer asking for a special recipe.", alt: ["can you make it without lactose?"] },
      { fr: "Bonne journée !", en: "Have a nice day!", ex: "Smile and say goodbye.", hint: "A friendly way to end the sale.", alt: ["have a good day!", "have a great day!"] }
    ]
  },

  "Kitchen Talk": {
    icon: "🗣️",
    items: [
      { fr: "Attention, c'est chaud !", en: "Careful, it is hot!", ex: "Shout it when you carry a hot tray.", hint: "A safety warning in the workshop.", alt: ["careful, it's hot!", "watch out, it is hot!", "be careful, it is hot!"] },
      { fr: "Derrière vous !", en: "Behind you!", ex: "Say it when you pass behind a colleague.", hint: "A short warning to avoid collisions.", alt: ["behind!"] },
      { fr: "Chef, j'ai terminé.", en: "Chef, I have finished.", ex: "Tell your chef when your task is done.", hint: "Reporting that a task is completed.", alt: ["chef, i'm finished.", "chef, i am finished.", "chef, i am done.", "chef, i'm done."] },
      { fr: "Il n'y a plus de beurre.", en: "We have run out of butter.", ex: "Tell the chef before the stock is empty.", hint: "Reporting a missing ingredient.", alt: ["we are out of butter.", "there is no more butter.", "there is no butter left.", "we've run out of butter."] },
      { fr: "Peux-tu m'aider ?", en: "Can you give me a hand?", ex: "Ask a colleague when the tray is too heavy.", hint: "A friendly request for help.", alt: ["can you help me?", "could you help me?", "can you help me out?"] },
      { fr: "Combien de temps de cuisson ?", en: "How long does it need to bake?", ex: "Ask before you set the timer.", hint: "A question about baking time.", alt: ["how long does it bake for?", "how long should it bake?", "how long is the baking time?"] },
      { fr: "Quelle est la température du four ?", en: "What temperature is the oven?", ex: "Check it before loading the trays.", hint: "A question about the oven setting.", alt: ["what is the oven temperature?", "what's the oven temperature?", "what temperature is the oven set to?"] },
      { fr: "Mets la minuterie.", en: "Set the timer.", ex: "Set the timer for twelve minutes.", hint: "An instruction to avoid overbaking.", alt: ["set the timer"] },
      { fr: "Pèse les ingrédients.", en: "Weigh the ingredients.", ex: "Weigh all the ingredients before you start.", hint: "The first step of most recipes.", alt: ["weigh out the ingredients."] },
      { fr: "Nettoie ton poste de travail.", en: "Clean your workstation.", ex: "Clean your workstation at the end of the day.", hint: "An instruction for end of service.", alt: ["clean your work station.", "clean your workspace.", "clean your station."] },
      { fr: "Je n'ai pas compris, pouvez-vous répéter ?", en: "I did not understand, can you repeat that?", ex: "It is fine to ask when an instruction is unclear.", hint: "A polite way to ask for repetition.", alt: ["i didn't understand, can you repeat that?", "i did not understand, could you repeat that?", "i didn't understand, could you repeat that?"] },
      { fr: "Où dois-je ranger ceci ?", en: "Where should I put this away?", ex: "Ask when you are not sure where an item goes.", hint: "A question about storage.", alt: ["where do i put this away?", "where should i store this?"] }
    ]
  }
};

const EXAM_TOPICS = [
  "Describe your favourite pastry and explain briefly how it is made.",
  "Describe your workplace and a typical day in the pastry kitchen.",
  "A customer wants a birthday cake. Write the conversation you would have with them.",
  "Explain three hygiene rules you follow in the kitchen and why they are important.",
  "Write a short recipe for a simple cake: list the ingredients and the main steps.",
  "Describe your best experience during your work placement."
];

const LEVELS = [
  { xp: 0, name: "Apprentice" },
  { xp: 100, name: "Commis Pâtissier" },
  { xp: 250, name: "Chef de Partie" },
  { xp: 500, name: "Sous-Chef" },
  { xp: 900, name: "Chef Pâtissier" },
  { xp: 1500, name: "Maître Pâtissier" }
];
