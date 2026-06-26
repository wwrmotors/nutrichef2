import { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  { id: "keto",       label: "Keto",                   emoji: "🥑", color: "#1a7a4a", light: "#d4f5e2", badge: "Guerrero Keto",       desc: "Alto en grasas, bajo en carbos" },
  { id: "saludable",  label: "Saludables",              emoji: "🥗", color: "#1565c0", light: "#dbeafe", badge: "Chef Saludable",       desc: "Nutrición balanceada y deliciosa" },
  { id: "higado",     label: "Hígado Graso",            emoji: "🫐", color: "#6a1fbf", light: "#ede9fe", badge: "Guardián del Hígado",  desc: "Recetas desinflamatorias" },
  { id: "pasteleria", label: "Pastelería Saludable",    emoji: "🍓", color: "#b91c1c", light: "#fee2e2", badge: "Maestro Repostero",    desc: "Dulces sin culpa" },
  { id: "diabetico",  label: "Diabéticos",              emoji: "💙", color: "#0e7490", light: "#cffafe", badge: "Guardián del Azúcar",  desc: "Bajo índice glucémico" },
  { id: "smoothie",   label: "Smoothies y Jugos",       emoji: "🥤", color: "#c2410c", light: "#ffedd5", badge: "Maestro Licuadero",   desc: "Energía líquida y vital" },
];

const RECIPES = [
  // ── KETO (20) ──────────────────────────────────────────────────────────────
  { id:1,  cat:"keto", title:"Bowl de Aguacate con Huevo",          time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70",
    audioSrc:"/audios/receta-1.mp3",
    ing:["2 aguacates maduros","2 huevos","Sal y pimienta","Jugo de limón","Chile en polvo"],
    steps:[
      {text:"Corta los aguacates por la mitad y retira el hueso."},
      {text:"Agranda un poco el espacio del hueso con una cuchara."},
      {text:"Casca un huevo dentro de cada mitad de aguacate."},
      {text:"Sazona con sal, pimienta y chile en polvo."},
      {text:"Hornea a 200°C por 12 a 15 minutos hasta que el huevo esté firme.", timer:13},
      {text:"Exprime limón fresco y sirve de inmediato."}
    ] },
  { id:2,  cat:"keto", title:"Salmón al Limón con Espárragos",      time:"20 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=70",
    audioSrc:"/audios/receta-2.mp3",
    ing:["2 filetes de salmón","200g espárragos","2 dientes de ajo","Mantequilla sin sal","Limón","Romero fresco"],
    steps:[
      {text:"Precalienta sartén a fuego medio alto con mantequilla."},
      {text:"Sazona el salmón con sal, pimienta y ralladura de limón."},
      {text:"Cocina el salmón con la piel abajo por 4 minutos.", timer:4},
      {text:"Voltea y agrega el ajo picado y el romero."},
      {text:"Incorpora los espárragos y cocina 3 minutos más.", timer:3},
      {text:"Exprime limón sobre todo y sirve."}
    ] },
  { id:3,  cat:"keto", title:"Hamburguesa Keto sin Pan",             time:"15 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&q=70",
    ing:["300g carne molida 80/20","Hojas de lechuga romana","Queso cheddar","Tocino","Mostaza sin azúcar","Tomate y cebolla"],
    steps:["Mezcla la carne con sal, pimienta y ajo en polvo.","Forma dos medallones gruesos y aplánalos.","Cocina en sartén caliente 3 minutos por lado.","Añade queso cheddar y tapa 30 segundos.","Fríe el tocino hasta que esté crujiente.","Arma la hamburguesa con hojas de lechuga como pan."] },
  { id:4,  cat:"keto", title:"Pollo en Salsa de Crema y Champiñones",time:"25 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&q=70",
    ing:["2 pechugas de pollo","200g champiñones","200ml crema de leche","Ajo","Tomillo","Mantequilla"],
    steps:["Sella el pollo en mantequilla caliente 3 minutos por lado.","Retira el pollo y sofríe el ajo y los champiñones 4 minutos.","Vierte la crema y añade el tomillo.","Regresa el pollo a la sartén.","Cocina a fuego bajo 10 minutos hasta que el pollo esté listo.","Rectifica sal y pimienta antes de servir."] },
  { id:5,  cat:"keto", title:"Ensalada César Keto",                  time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=70",
    ing:["Lechuga romana","Tocino crujiente","Queso parmesano rallado","Anchoas","Aceite de oliva","Limón y ajo"],
    steps:["Lava y seca bien la lechuga romana y córtala en trozos.","Mezcla aceite de oliva, ajo rallado, limón, anchoas picadas para el aderezo.","Coloca la lechuga en el tazón.","Añade el tocino crujiente desmenuzado.","Vierte el aderezo y mezcla bien.","Termina con parmesano rallado generoso."] },
  { id:6,  cat:"keto", title:"Huevos Rellenos con Atún",             time:"12 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=70",
    ing:["6 huevos duros","1 lata de atún en aceite","Mayonesa sin azúcar","Mostaza Dijon","Cebollín","Paprika"],
    steps:["Corta los huevos duros por la mitad y extrae las yemas.","Mezcla las yemas con el atún escurrido, mayonesa y mostaza.","Sazona con sal y pimienta al gusto.","Rellena las claras con la mezcla.","Espolvorea paprika y cebollín picado encima.","Refrigera 10 minutos antes de servir."] },
  { id:7,  cat:"keto", title:"Costillas de Cerdo al Horno",          time:"90 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=70",
    ing:["1kg costillas de cerdo","Pimentón ahumado","Ajo en polvo","Sal y pimienta","Aceite de oliva","Romero seco"],
    steps:["Seca las costillas con papel de cocina y retira la membrana.","Mezcla todas las especias y frota la mezcla en las costillas.","Envuelve en papel aluminio y deja marinar 30 minutos.","Hornea a 160°C por 1 hora dentro del papel aluminio.","Destapa y sube a 220°C por 15 minutos para dorar.","Deja reposar 10 minutos antes de cortar."] },
  { id:8,  cat:"keto", title:"Tortilla de Espinaca y Queso",         time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=70",
    ing:["3 huevos","1 taza espinaca fresca","50g queso mozzarella","1 diente de ajo","Mantequilla","Sal y pimienta"],
    steps:["Bate los huevos con sal y pimienta en un tazón.","Derrite mantequilla en sartén a fuego medio.","Saltea el ajo y la espinaca 1 minuto hasta que se marchite.","Vierte los huevos batidos sobre la espinaca.","Agrega el queso cuando los bordes estén cuajados.","Dobla la tortilla a la mitad y sirve caliente."] },
  { id:9,  cat:"keto", title:"Bacalao con Aceitunas y Tomate Cherry", time:"20 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=70",
    ing:["2 filetes de bacalao","100g aceitunas negras","150g tomates cherry","Ajo","Alcaparras","Aceite de oliva extra virgen"],
    steps:["Sella el bacalao en aceite de oliva caliente 3 minutos por lado.","En la misma sartén sofríe el ajo picado 1 minuto.","Agrega los tomates cherry y aplasta levemente.","Incorpora las aceitunas y las alcaparras.","Coloca el bacalao encima y tapa 5 minutos.","Termina con aceite de oliva crudo y sirve."] },
  { id:10, cat:"keto", title:"Carne Molida con Coliflor",            time:"20 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=70",
    ing:["300g carne molida","1 coliflor mediana","Cebolla","Ajo","Pimentón","Sal y comino"],
    steps:["Procesa la coliflor en trozos pequeños tipo arroz.","Cocina la coliflor en sartén seca 5 minutos y reserva.","Sofríe la cebolla y el ajo en la misma sartén.","Agrega la carne molida y cocina hasta dorar.","Sazona con pimentón, sal y comino.","Mezcla con la coliflor y sirve caliente."] },
  { id:11, cat:"keto", title:"Ensalada de Pollo con Aguacate",       time:"15 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70",
    ing:["1 pechuga de pollo cocida","1 aguacate maduro","Pepino","Tomate cherry","Aceite de oliva","Limón y sal"],
    steps:["Desmecha el pollo cocido en tiras.","Corta el aguacate, pepino y tomates en cubos.","Mezcla todo en un tazón grande.","Aliña con aceite de oliva, limón y sal.","Mezcla con movimientos suaves.","Sirve frío de inmediato."] },
  { id:12, cat:"keto", title:"Crema de Brócoli con Crema Agria",     time:"20 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=70",
    ing:["1 brócoli grande","400ml caldo de pollo","Crema agria","Queso cheddar rallado","Ajo","Mantequilla"],
    steps:["Sofríe el ajo en mantequilla 1 minuto.","Agrega el brócoli cortado y el caldo de pollo.","Cocina a fuego medio 15 minutos hasta que el brócoli esté tierno.","Licúa hasta obtener una crema suave.","Sirve con una cucharada de crema agria.","Termina con queso cheddar rallado."] },
  { id:13, cat:"keto", title:"Alitas de Pollo Picantes",             time:"40 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=70",
    ing:["1kg alitas de pollo","Salsa picante sin azúcar","Mantequilla","Ajo en polvo","Pimentón ahumado","Sal"],
    steps:["Seca muy bien las alitas con papel de cocina.","Sazona con sal, ajo en polvo y pimentón.","Hornea a 220°C por 25 minutos dando vuelta a la mitad.","Mezcla la salsa picante con mantequilla derretida.","Baña las alitas con la salsa y regresa al horno 10 minutos.","Sirve calientes con el resto de la salsa."] },
  { id:14, cat:"keto", title:"Steak con Mantequilla de Hierbas",     time:"15 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=70",
    ing:["2 filetes de res","Mantequilla sin sal","Ajo","Romero y tomillo fresco","Sal gruesa","Pimienta negra"],
    steps:["Saca el steak del refrigerador 20 minutos antes.","Sazona generosamente con sal gruesa y pimienta.","Calienta la sartén a fuego alto hasta que humee.","Sella el steak 2 a 3 minutos por lado sin moverlo.","Agrega mantequilla, ajo y hierbas y baña el steak.","Deja reposar 5 minutos antes de cortar."] },
  { id:15, cat:"keto", title:"Sopa Keto de Jamón y Queso",           time:"20 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70",
    ing:["200g jamón en cubos","100g queso gouda","400ml caldo de pollo","Crema de leche","Cebolla","Mantequilla"],
    steps:["Sofríe la cebolla en mantequilla a fuego medio.","Agrega el jamón y cocina 3 minutos.","Vierte el caldo de pollo y lleva a hervor.","Añade la crema de leche y mezcla.","Agrega el queso en trozos y revuelve hasta derretir.","Sirve caliente con pimienta negra molida."] },
  { id:16, cat:"keto", title:"Pepinos Rellenos de Queso Crema",      time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1563379091339-03246963d8f8?w=400&q=70",
    ing:["2 pepinos grandes","200g queso crema","Salmón ahumado","Eneldo fresco","Jugo de limón","Sal y pimienta"],
    steps:["Corta los pepinos en rondajas gruesas de 2 cm.","Haz una cavidad en el centro con una cucharita.","Mezcla el queso crema con el eneldo y el limón.","Rellena cada rodaja con la mezcla de queso.","Coloca un trozo de salmón ahumado encima.","Refrigera hasta servir."] },
  { id:17, cat:"keto", title:"Pollo a la Mantequilla (Estilo Keto)",  time:"30 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&q=70",
    ing:["3 pechugas de pollo","Mantequilla","Tomate en lata","Crema de leche","Garam masala","Ajo y jengibre"],
    steps:["Sella el pollo en mantequilla caliente por todos lados.","Sofríe el ajo y el jengibre rallados 1 minuto.","Agrega el tomate y el garam masala y cocina 5 minutos.","Incorpora la crema de leche y mezcla bien.","Regresa el pollo y cocina a fuego bajo 15 minutos.","Rectifica especias y sirve con mantequilla extra."] },
  { id:18, cat:"keto", title:"Lasaña Keto de Calabacín",             time:"45 min", diff:"Avanzada", pts:30, img:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=70",
    ing:["3 calabacines grandes","500g carne molida","Salsa de tomate sin azúcar","Queso mozzarella","Ricotta","Albahaca"],
    steps:["Corta los calabacines en láminas finas a lo largo.","Asa las láminas en la plancha 2 minutos por lado y reserva.","Sofríe la carne con ajo y sazona con sal y pimienta.","Agrega la salsa de tomate y cocina 10 minutos.","Arma capas: calabacín, carne, ricotta, queso.","Hornea a 180°C por 25 minutos hasta que el queso gratine."] },
  { id:19, cat:"keto", title:"Camarones al Ajillo Keto",              time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=70",
    ing:["400g camarones pelados","5 dientes de ajo","Mantequilla","Aceite de oliva","Chile rojo","Perejil fresco"],
    steps:["Seca los camarones con papel de cocina.","Calienta mantequilla y aceite de oliva en sartén.","Sofríe el ajo laminado y el chile 1 minuto.","Agrega los camarones en una sola capa.","Cocina 1 a 2 minutos por lado hasta que estén rosados.","Termina con perejil picado y sirve caliente."] },
  { id:20, cat:"keto", title:"Pancakes de Queso Crema Keto",         time:"15 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=70",
    ing:["2 huevos","60g queso crema","1 cucharada harina de almendra","1/2 cucharadita canela","Stevia al gusto","Mantequilla para cocinar"],
    steps:["Mezcla todos los ingredientes en la licuadora hasta suavizar.","Deja reposar la mezcla 2 minutos.","Calienta una sartén antiadherente con un poco de mantequilla.","Vierte porciones pequeñas de la mezcla.","Cocina 2 minutos hasta que aparezcan burbujas y voltea.","Sirve con crema agria o frutos rojos keto."] },

  // ── SALUDABLES (20) ────────────────────────────────────────────────────────
  { id:21, cat:"saludable", title:"Bowl de Quinoa con Vegetales",    time:"30 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=70",
    ing:["1 taza quinoa","Zucchini","Pimientos de colores","Cebolla morada","Aceite de oliva","Limón y hierbas"],
    steps:["Lava bien la quinoa bajo agua fría.","Cocina en 2 tazas de agua con sal por 15 minutos.","Corta vegetales y colócalos en bandeja con aceite.","Hornea a 220°C por 20 minutos.","Mezcla quinoa con vegetales asados.","Aliña con limón y aceite de oliva extra."] },
  { id:22, cat:"saludable", title:"Ensalada de Garbanzos y Pepino",  time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=70",
    ing:["1 lata garbanzos","1 pepino","Tomates cherry","Perejil fresco","Aceite de oliva","Limón y ajo"],
    steps:["Escurre y enjuaga los garbanzos.","Corta el pepino en medias lunas.","Parte los tomates cherry por la mitad.","Pica el perejil finamente.","Mezcla todo en un tazón.","Aliña con aceite, limón y ajo rallado."] },
  { id:23, cat:"saludable", title:"Pollo al Horno con Batata",        time:"40 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&q=70",
    ing:["2 pechugas de pollo","2 batatas medianas","Pimentón ahumado","Ajo en polvo","Aceite de oliva","Romero"],
    steps:["Precalienta el horno a 200°C.","Pela y corta las batatas en cubos de 2 cm.","Sazona el pollo con pimentón, ajo, sal y pimienta.","Coloca todo en bandeja con aceite y romero.","Hornea 35 a 40 minutos hasta dorar.","Deja reposar 5 minutos y sirve."] },
  { id:24, cat:"saludable", title:"Tacos de Lechuga con Pavo",        time:"15 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=70",
    ing:["300g pavo molido","Hojas de lechuga","Tomate","Cebolla morada","Limón","Cilantro y sal"],
    steps:["Cocina el pavo molido con sal y comino hasta dorar.","Pica tomate, cebolla y cilantro finamente.","Mezcla en un tazón con limón.","Coloca hojas de lechuga como base de taco.","Sirve el pavo sobre la lechuga.","Termina con la mezcla de tomate y cilantro."] },
  { id:25, cat:"saludable", title:"Salmón con Costra de Hierbas",     time:"20 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=70",
    ing:["2 filetes de salmón","Perejil y eneldo frescos","Ajo en polvo","Pan rallado integral","Aceite de oliva","Limón"],
    steps:["Precalienta el horno a 200°C.","Mezcla las hierbas picadas con el pan rallado y aceite.","Coloca el salmón en bandeja y salpica de sal.","Cubre la parte superior con la mezcla de hierbas.","Hornea 12 a 15 minutos hasta que la costra esté dorada.","Sirve con rodajas de limón."] },
  { id:26, cat:"saludable", title:"Lentejas Estofadas con Vegetales", time:"35 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=70",
    ing:["1 taza lentejas verdes","Zanahoria","Apio","Cebolla","Ajo","Tomate y cúrcuma"],
    steps:["Sofríe cebolla, zanahoria y apio 5 minutos.","Agrega el ajo y la cúrcuma 1 minuto.","Incorpora el tomate picado y cocina 3 minutos.","Añade las lentejas y caldo suficiente para cubrir.","Cocina a fuego bajo 25 minutos.","Rectifica sal y sirve con perejil."] },
  { id:27, cat:"saludable", title:"Bowl de Arroz Integral con Tofu",  time:"25 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70",
    ing:["1 taza arroz integral","200g tofu firme","Brócoli","Zanahoria","Salsa soya baja en sodio","Jengibre y sésamo"],
    steps:["Cocina el arroz integral según instrucciones.","Corta el tofu en cubos y sécalo bien.","Dora el tofu en sartén con un poco de aceite.","Saltea el brócoli y la zanahoria 4 minutos.","Mezcla salsa soya y jengibre para el aderezo.","Sirve arroz con vegetales, tofu y aderezo encima."] },
  { id:28, cat:"saludable", title:"Pechuga Rellena de Espinaca",      time:"30 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&q=70",
    ing:["2 pechugas grandes","Espinaca baby","Queso mozzarella bajo en grasa","Ajo","Pimentón rojo","Sal y pimienta"],
    steps:["Haz un corte lateral profundo en cada pechuga.","Saltea la espinaca con ajo 2 minutos.","Rellena las pechugas con espinaca y queso.","Cierra con palillos de dientes.","Sella en sartén caliente 3 minutos por lado.","Hornea a 180°C por 15 minutos para terminar."] },
  { id:29, cat:"saludable", title:"Ensalada Mediterránea Completa",   time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=70",
    ing:["Pepino","Tomate","Aceitunas negras","Queso feta","Cebolla morada","Orégano y aceite de oliva"],
    steps:["Corta el pepino, tomate y cebolla en trozos medianos.","Agrega las aceitunas negras.","Desmiga el queso feta encima.","Aliña generosamente con aceite de oliva.","Espolvorea orégano seco.","Mezcla suavemente y sirve."] },
  { id:30, cat:"saludable", title:"Pasta Integral con Pesto de Albahaca",time:"20 min", diff:"Fácil", pts:10, img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=70",
    ing:["200g pasta integral","Albahaca fresca","Piñones","Ajo","Parmesano rallado","Aceite de oliva extra virgen"],
    steps:["Cocina la pasta según instrucciones al dente.","Licúa la albahaca, piñones, ajo y parmesano.","Agrega aceite de oliva en hilo hasta obtener pesto suave.","Mezcla el pesto con la pasta caliente.","Agrega un poco del agua de cocción para unir.","Sirve con parmesano extra y piñones tostados."] },
  { id:31, cat:"saludable", title:"Wrap de Pollo y Aguacate",          time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70",
    ing:["1 tortilla integral grande","1 pechuga cocida","1/2 aguacate","Lechuga","Tomate","Mostaza con miel"],
    steps:["Calienta la tortilla 30 segundos en sartén.","Extiende mostaza con miel sobre la tortilla.","Coloca lechuga en la base.","Añade el pollo desmenuzado y el aguacate en rebanadas.","Agrega el tomate en rodajas.","Enrolla firmemente y corta en diagonal."] },
  { id:32, cat:"saludable", title:"Sopa Minestrone de Vegetales",      time:"40 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70",
    ing:["Zanahoria","Apio","Zucchini","Tomate","Judías blancas","Pasta integral pequeña","Caldo de vegetales"],
    steps:["Sofríe cebolla, zanahoria y apio 5 minutos.","Agrega el zucchini y el tomate en cubos.","Incorpora el caldo y lleva a hervor.","Añade las judías blancas.","Cocina 20 minutos a fuego medio.","Agrega la pasta los últimos 8 minutos y sirve."] },
  { id:33, cat:"saludable", title:"Tortilla Española Saludable",       time:"20 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=70",
    ing:["4 huevos","2 papas medianas","Cebolla","Aceite de oliva","Sal y pimienta","Perejil"],
    steps:["Corta las papas y la cebolla en láminas finas.","Cocina en aceite de oliva a fuego bajo 15 minutos.","Bate los huevos con sal y pimienta.","Mezcla las papas con los huevos.","Vierte en sartén y cocina a fuego bajo 5 minutos.","Voltea con plato y cocina 3 minutos más."] },
  { id:34, cat:"saludable", title:"Arroz con Frijoles Negros",          time:"25 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70",
    ing:["1 taza arroz","1 lata frijoles negros","Cebolla","Ajo","Comino","Cilantro y limón"],
    steps:["Cocina el arroz en agua con sal.","Sofríe cebolla y ajo en aceite hasta transparente.","Agrega los frijoles escurridos con el comino.","Cocina 5 minutos mezclando.","Sirve el arroz con los frijoles encima.","Termina con cilantro fresco y limón."] },
  { id:35, cat:"saludable", title:"Ceviche de Pollo Saludable",         time:"20 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=70",
    ing:["2 pechugas de pollo cocidas","Jugo de limón","Cebolla morada","Tomate","Cilantro","Aguacate y sal"],
    steps:["Desmecha el pollo en tiras finas.","Corta la cebolla morada en plumas finas y remoja en agua fría.","Mezcla el pollo con el jugo de limón y marina 10 minutos.","Agrega el tomate, cilantro y cebolla escurrida.","Incorpora el aguacate en cubos al final.","Rectifica sal y sirve frío."] },
  { id:36, cat:"saludable", title:"Vegetales Salteados con Jengibre",   time:"12 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=70",
    ing:["Brócoli","Zanahoria","Pimiento rojo","Jengibre fresco","Salsa soya","Aceite de sésamo"],
    steps:["Corta todos los vegetales en trozos similares.","Calienta aceite de sésamo en wok a fuego alto.","Agrega el jengibre rallado y saltea 30 segundos.","Incorpora los vegetales y saltea 5 minutos.","Vierte la salsa soya y mezcla bien.","Sirve de inmediato para mantener la textura."] },
  { id:37, cat:"saludable", title:"Crema de Zanahoria con Jengibre",    time:"25 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=70",
    ing:["500g zanahorias","Jengibre fresco","Cebolla","Leche de coco light","Caldo de vegetales","Sal y pimienta"],
    steps:["Sofríe la cebolla en aceite de oliva 3 minutos.","Agrega el jengibre rallado y cocina 1 minuto.","Incorpora las zanahorias en trozos y el caldo.","Cocina a fuego medio 20 minutos hasta que ablanden.","Licúa con la leche de coco hasta obtener crema suave.","Rectifica sazón y sirve con semillas."] },
  { id:38, cat:"saludable", title:"Ensalada de Atún con Garbanzos",     time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70",
    ing:["2 latas de atún en agua","1 lata garbanzos","Apio","Pepino","Mostaza Dijon","Jugo de limón"],
    steps:["Escurre bien el atún y los garbanzos.","Pica el apio y el pepino en cubos pequeños.","Mezcla el atún con los garbanzos y vegetales.","Prepara aderezo con mostaza, limón y aceite.","Vierte sobre la mezcla y revuelve.","Refrigera 10 minutos antes de servir."] },
  { id:39, cat:"saludable", title:"Risotto de Espárragos y Limón",      time:"30 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=70",
    ing:["1 taza arroz arbóreo","Espárragos","Caldo de vegetales","Cebolla","Vino blanco seco","Parmesano"],
    steps:["Calienta el caldo en una olla aparte.","Sofríe la cebolla en aceite 3 minutos.","Agrega el arroz y cocina 2 minutos hasta que suene crujiente.","Añade el vino y deja evaporar.","Agrega caldo caliente de a poco, revolviendo siempre.","Al final incorpora los espárragos y el parmesano."] },
  { id:40, cat:"saludable", title:"Hamburguesas de Lentejas",           time:"30 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&q=70",
    ing:["1 taza lentejas cocidas","Cebolla","Ajo","Pan rallado integral","Cilantro","Huevo y comino"],
    steps:["Tritura las lentejas dejando algo de textura.","Mezcla con cebolla y ajo picados, cilantro y comino.","Agrega el huevo y pan rallado para unir.","Forma medallones y refrigera 15 minutos.","Cocina en sartén con aceite 4 minutos por lado.","Sirve en pan integral con lechuga y tomate."] },

  // ── HÍGADO GRASO (20) ──────────────────────────────────────────────────────
  { id:41, cat:"higado", title:"Smoothie Detox de Remolacha",         time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["1 remolacha cocida","1 manzana verde","Jengibre fresco","Jugo de limón","1 taza agua","Hielo"],
    steps:["Pela y corta la remolacha en trozos.","Corta la manzana verde sin semillas.","Ralla un trozo pequeño de jengibre.","Coloca todo en la licuadora con agua e hielo.","Licúa a alta velocidad 60 segundos.","Agrega el limón, mezcla y sirve."] },
  { id:42, cat:"higado", title:"Sopa de Cúrcuma con Lentejas",        time:"35 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=70",
    ing:["1 taza lentejas rojas","1 cucharadita cúrcuma","Cebolla","Ajo","Tomate","Caldo de verduras"],
    steps:["Sofríe la cebolla y el ajo en aceite de oliva.","Agrega el tomate y cocina 3 minutos.","Incorpora la cúrcuma y mezcla con el sofrito.","Añade las lentejas y el caldo.","Cocina 25 minutos hasta que las lentejas ablanden.","Sirve con un chorrito de limón."] },
  { id:43, cat:"higado", title:"Ensalada de Alcachofa y Espinaca",    time:"15 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70",
    ing:["Corazones de alcachofa","Espinaca baby","Semillas de girasol","Aceite de oliva extra virgen","Vinagre balsámico","Ajo y limón"],
    steps:["Escurre y corta los corazones de alcachofa en cuartos.","Lava y seca la espinaca baby.","Tuesta las semillas de girasol en sartén seca.","Arma la ensalada mezclando todos los vegetales.","Prepara aderezo con aceite, vinagre y ajo.","Vierte y mezcla suavemente."] },
  { id:44, cat:"higado", title:"Zumo Verde Antiinflamatorio",           time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["2 ramas de apio","1 pepino","Espinaca","Perejil fresco","Limón","Jengibre fresco y manzana verde"],
    steps:["Lava bien todos los vegetales.","Corta el pepino y el apio en trozos.","Exprime el limón.","Pasa todo por el extractor de jugos o licúa con agua.","Si licúas, cuela con colador fino.","Bebe de inmediato para aprovechar los nutrientes."] },
  { id:45, cat:"higado", title:"Pollo al Vapor con Hierbas Frescas",   time:"25 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&q=70",
    ing:["2 pechugas de pollo","Romero fresco","Tomillo","Ajo","Caldo de vegetales bajo sodio","Limón"],
    steps:["Coloca las pechugas en una vaporera.","Cubre con las hierbas frescas y láminas de ajo.","Agrega el caldo al fondo para cocinar al vapor.","Cocina a vapor 20 minutos hasta que estén completamente cocidas.","Retira las hierbas y sirve.","Aliña con jugo de limón fresco."] },
  { id:46, cat:"higado", title:"Caldo Depurativo de Vegetales",         time:"45 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70",
    ing:["Apio","Zanahoria","Perejil","Cebolla","Cúrcuma","Jengibre y laurel"],
    steps:["Lava bien todos los vegetales.","Corta en trozos grandes.","Coloca todo en olla con 2 litros de agua.","Lleva a hervor y luego reduce a fuego bajo.","Cocina 40 minutos sin sal.","Cuela y bebe el caldo caliente."] },
  { id:47, cat:"higado", title:"Ensalada de Rúcula con Nueces y Pera",  time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=70",
    ing:["Rúcula fresca","1 pera madura","Nueces","Queso de cabra","Aceite de oliva","Vinagre balsámico y miel"],
    steps:["Lava y seca la rúcula.","Corta la pera en gajos finos.","Trocea las nueces groseramente.","Desmorona el queso de cabra.","Arma la ensalada en capas.","Aliña con aceite, vinagre y un toque de miel."] },
  { id:48, cat:"higado", title:"Té de Diente de León con Limón",        time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["2 cucharaditas diente de león seco","1 taza agua caliente","Jugo de limón","Miel cruda","Jengibre en rodajas"],
    steps:["Hierve el agua y déjala reposar 1 minuto.","Agrega el diente de león seco.","Deja infusionar 5 minutos.","Cuela la infusión.","Añade el limón y el jengibre.","Endulza con miel cruda al gusto."] },
  { id:49, cat:"higado", title:"Pescado al Papillote con Limón",         time:"25 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=70",
    ing:["2 filetes de pescado blanco","Limón","Tomate cherry","Alcaparras","Aceite de oliva","Hierbas frescas"],
    steps:["Precalienta el horno a 190°C.","Coloca el pescado en papel aluminio o encerado.","Agrega rodajas de limón, tomates y alcaparras encima.","Rocía con aceite de oliva y hierbas.","Cierra el papillote dejando espacio para el vapor.","Hornea 18 a 20 minutos y sirve en el mismo papel."] },
  { id:50, cat:"higado", title:"Batido de Arándanos Antiinflamatorio",   time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["1 taza arándanos congelados","Leche de avena sin azúcar","1 cucharada semillas de chía","Cúrcuma en polvo","Jengibre rallado","Miel cruda"],
    steps:["Coloca los arándanos en la licuadora.","Agrega la leche de avena.","Incorpora las semillas de chía.","Añade la cúrcuma y el jengibre.","Licúa 30 segundos hasta homogenizar.","Endulza con miel y sirve de inmediato."] },
  { id:51, cat:"higado", title:"Espinaca Salteada con Ajo y Limón",      time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70",
    ing:["400g espinaca fresca","3 dientes de ajo","Aceite de oliva","Limón","Sal marina","Pimienta negra"],
    steps:["Lava bien la espinaca y escurre.","Calienta aceite de oliva en sartén grande.","Dora el ajo laminado 1 minuto sin quemar.","Agrega la espinaca y mezcla.","Cocina 2 a 3 minutos hasta que se marchite.","Exprime limón, sazona y sirve."] },
  { id:52, cat:"higado", title:"Sopa Fría de Pepino y Yogur",            time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=70",
    ing:["2 pepinos grandes","200g yogur griego natural","Ajo","Eneldo fresco","Aceite de oliva","Vinagre de manzana"],
    steps:["Pela y pica los pepinos groseramente.","Coloca en licuadora con el yogur y el ajo.","Agrega el eneldo, aceite y vinagre.","Licúa hasta obtener crema suave.","Refrigera por lo menos 30 minutos.","Sirve frío con eneldo fresco encima."] },
  { id:53, cat:"higado", title:"Quinoa con Vegetales Desintoxicante",    time:"25 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=70",
    ing:["1 taza quinoa","Brócoli","Alcachofa cocida","Limón","Aceite de oliva","Perejil y ajo"],
    steps:["Cocina la quinoa en agua con sal.","Hierve o vaporiza el brócoli al dente.","Corta la alcachofa cocida en cuartos.","Mezcla quinoa con brócoli y alcachofa.","Aliña con aceite de oliva, limón y ajo rallado.","Finaliza con perejil fresco picado."] },
  { id:54, cat:"higado", title:"Infusión de Cardo Mariano",              time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["1 cucharadita cardo mariano triturado","1 taza agua","Canela en rama","Limón","Miel de abeja cruda"],
    steps:["Hierve el agua con la canela.","Agrega el cardo mariano triturado.","Deja infusionar 8 minutos tapado.","Cuela la infusión en una taza.","Agrega el jugo de limón.","Endulza con miel cruda y bebe caliente."] },
  { id:55, cat:"higado", title:"Ensalada de Remolacha Rallada",          time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70",
    ing:["2 remolachas crudas","Zanahoria","Perejil","Aceite de oliva","Vinagre de manzana","Sal y pimienta"],
    steps:["Pela las remolachas y zanahorias.","Rálla ambas con rallador grueso.","Pica el perejil finamente.","Mezcla todo en un tazón.","Aliña con aceite y vinagre de manzana.","Refrigera 15 minutos y sirve frío."] },
  { id:56, cat:"higado", title:"Puré de Batata con Cúrcuma",             time:"25 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=70",
    ing:["3 batatas medianas","Cúrcuma en polvo","Aceite de oliva","Ajo","Sal marina","Pimienta negra"],
    steps:["Pela y corta las batatas en cubos.","Hierve en agua con sal 15 minutos hasta ablandar.","Escurre bien y tritura con tenedor o prensador.","Agrega el aceite de oliva y el ajo rallado.","Sazona con cúrcuma, sal y pimienta.","Mezcla bien y sirve caliente."] },
  { id:57, cat:"higado", title:"Stir Fry de Brócoli y Cúrcuma",          time:"15 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=70",
    ing:["1 brócoli grande","Cúrcuma en polvo","Ajo","Jengibre","Aceite de coco","Sal y pimienta"],
    steps:["Corta el brócoli en floretes medianos.","Calienta el aceite de coco en sartén.","Sofríe el ajo y el jengibre 1 minuto.","Agrega el brócoli y saltea 5 minutos.","Espolvorea la cúrcuma y mezcla bien.","Sazona con sal y pimienta y sirve."] },
  { id:58, cat:"higado", title:"Agua Detox de Pepino y Menta",           time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["1 pepino","Menta fresca","Limón","Jengibre fresco","1 litro de agua fría","Hielo"],
    steps:["Lava bien el pepino y córtalo en rodajas finas.","Lava la menta y machácala suavemente.","Corta el limón en rodajas.","Ralla un trozo pequeño de jengibre.","Coloca todo en una jarra con agua fría.","Deja infusionar 1 hora en nevera y sirve con hielo."] },
  { id:59, cat:"higado", title:"Pollo con Verduras al Vapor",             time:"25 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&q=70",
    ing:["2 pechugas de pollo","Zanahoria","Brócoli","Judías verdes","Ajo en polvo","Sal y limón"],
    steps:["Corta el pollo en trozos medianos.","Prepara la vaporera con agua.","Coloca el pollo y los vegetales en la rejilla.","Sazona con ajo en polvo y sal.","Cocina al vapor 20 minutos.","Exprime limón al servir."] },
  { id:60, cat:"higado", title:"Ensalada de Aguacate y Toronja",          time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=70",
    ing:["1 aguacate maduro","1 toronja","Arúgula","Semillas de girasol","Aceite de oliva","Sal y pimienta negra"],
    steps:["Pela y secciona la toronja sin membrana.","Corta el aguacate en gajos.","Coloca la arúgula en el plato.","Añade la toronja y el aguacate.","Espolvorea las semillas.","Aliña con aceite, sal y pimienta."] },

  // ── PASTELERÍA SALUDABLE (20) ──────────────────────────────────────────────
  { id:61, cat:"pasteleria", title:"Brownies de Proteína",              time:"25 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=70",
    ing:["1 taza harina de avena","2 scoops proteína chocolate","3 cucharadas cacao","2 huevos","Miel o stevia","Chocolate 80%"],
    steps:["Precalienta horno a 180°C y engrasa molde.","Mezcla harina, proteína y cacao.","Bate los huevos con miel en otro recipiente.","Une húmedos y secos hasta integrar.","Trocea el chocolate y agréga a la mezcla.","Hornea 18 a 20 minutos. Deja enfriar antes de cortar."] },
  { id:62, cat:"pasteleria", title:"Muffins de Arándanos con Avena",   time:"30 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=70",
    ing:["2 tazas avena","1 taza leche de almendras","2 huevos","1 taza arándanos","Miel","Vainilla y canela"],
    steps:["Precalienta horno a 190°C.","Procesa la avena hasta harina gruesa.","Mezcla con canela y sal.","Bate huevos con leche, miel y vainilla.","Une secos y húmedos. Incorpora arándanos.","Hornea 22 minutos en molde de muffins."] },
  { id:63, cat:"pasteleria", title:"Cheesecake de Fresa sin Horno",    time:"20 min", diff:"Avanzada", pts:30, img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=70",
    ing:["200g queso crema light","1 taza fresas","4 cucharadas miel","Gelatina sin sabor","Galletas de avena","Mantequilla"],
    steps:["Tritura galletas y mezcla con mantequilla. Prensa en molde.","Hidrata la gelatina y disuelve a baño maría.","Bate queso con miel y fresas procesadas.","Incorpora la gelatina a la mezcla de queso.","Vierte sobre la base y refrigera 4 horas.","Decora con fresas frescas al servir."] },
  { id:64, cat:"pasteleria", title:"Galletas de Avena y Choco sin Harina",time:"20 min", diff:"Fácil",  pts:10, img:"https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=70",
    ing:["2 tazas avena","2 bananos maduros","2 cucharadas cacao","Trocitos de chocolate negro","Vainilla","Sal"],
    steps:["Precalienta horno a 175°C.","Tritura los bananos con tenedor hasta obtener puré.","Mezcla con la avena, cacao y vainilla.","Incorpora los trocitos de chocolate.","Forma bolitas y aplana en bandeja.","Hornea 12 a 14 minutos hasta dorar."] },
  { id:65, cat:"pasteleria", title:"Bizcocho de Naranja y Almendra",   time:"35 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=70",
    ing:["200g harina de almendra","3 huevos","Ralladura de naranja","Jugo de naranja","Miel","Levadura sin gluten"],
    steps:["Precalienta horno a 180°C.","Bate los huevos con la miel hasta espumar.","Agrega la ralladura y el jugo de naranja.","Incorpora la harina de almendra y la levadura.","Vierte en molde engrasado.","Hornea 30 minutos hasta insertar palillo limpio."] },
  { id:66, cat:"pasteleria", title:"Trufas de Dátil y Cacao",           time:"15 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=70",
    ing:["1 taza dátiles sin hueso","3 cucharadas cacao en polvo","2 cucharadas mantequilla de almendra","Vainilla","Coco rallado","Sal"],
    steps:["Remoja los dátiles en agua caliente 10 minutos.","Escurre y procesa en licuadora con el cacao.","Agrega la mantequilla de almendra y vainilla.","Mezcla hasta obtener pasta uniforme.","Forma bolitas con las manos húmedas.","Rueda en coco rallado y refrigera 30 minutos."] },
  { id:67, cat:"pasteleria", title:"Tarta de Manzana con Avena",        time:"45 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=70",
    ing:["3 manzanas","1 taza avena","2 cucharadas mantequilla","Canela","Miel","Jugo de limón"],
    steps:["Precalienta horno a 180°C.","Pela y corta las manzanas en láminas.","Mezcla con canela, miel y limón.","Prepara la base mezclando avena con mantequilla y miel.","Prensa la base en molde y coloca las manzanas.","Hornea 35 minutos hasta que estén suaves y doradas."] },
  { id:68, cat:"pasteleria", title:"Helado de Banana y Cacao",          time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=70",
    ing:["3 bananos congelados","2 cucharadas cacao en polvo","Leche de almendras","Vainilla","Miel al gusto"],
    steps:["Pela los bananos y congélalos previamente en trozos.","Coloca en la licuadora con poca leche.","Agrega el cacao y la vainilla.","Licúa hasta obtener cremoso tipo helado.","Ajusta dulzor con miel.","Sirve de inmediato o re-congela 1 hora para textura más firme."] },
  { id:69, cat:"pasteleria", title:"Panqué de Zanahoria Saludable",    time:"40 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=70",
    ing:["2 zanahorias ralladas","2 huevos","1 taza harina integral","Miel","Aceite de coco","Canela y nueces"],
    steps:["Precalienta horno a 180°C y engrasa molde.","Bate los huevos con la miel y el aceite de coco.","Incorpora la zanahoria rallada.","Agrega la harina y la canela tamizadas.","Añade las nueces picadas y mezcla.","Hornea 35 minutos y verifica con palillo."] },
  { id:70, cat:"pasteleria", title:"Mousse de Chocolate Negro",         time:"15 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=70",
    ing:["100g chocolate negro 85%","3 huevos","2 cucharadas miel","Vainilla","Sal","Crema de coco"],
    steps:["Derrite el chocolate a baño maría y deja enfriar.","Separa las yemas de las claras.","Bate las yemas con la miel y la vainilla.","Bate las claras a punto de nieve con sal.","Mezcla yemas con chocolate y luego incorpora las claras.","Refrigera en copas por 2 horas antes de servir."] },
  { id:71, cat:"pasteleria", title:"Barritas de Proteína con Semillas", time:"20 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=70",
    ing:["1 taza avena","2 scoops proteína vainilla","Mantequilla de maní","Miel","Semillas de chía y girasol","Trocitos de chocolate"],
    steps:["Mezcla avena, proteína y semillas en un tazón.","Calienta la mantequilla de maní y la miel hasta unir.","Vierte sobre la mezcla seca y combina bien.","Agrega los trocitos de chocolate.","Prensa en molde cuadrado forrado con papel.","Refrigera 2 horas y corta en barras."] },
  { id:72, cat:"pasteleria", title:"Panna Cotta de Coco y Frutos Rojos",time:"15 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=70",
    ing:["400ml leche de coco","Gelatina sin sabor","Miel","Vainilla","Frutos rojos frescos","Menta fresca"],
    steps:["Calienta la leche de coco a fuego bajo sin hervir.","Hidrata la gelatina en agua fría 5 minutos.","Agrega la gelatina a la leche de coco caliente y disuelve.","Endulza con miel y añade la vainilla.","Vierte en moldes y refrigera 3 horas.","Desmolda y sirve con frutos rojos y menta."] },
  { id:73, cat:"pasteleria", title:"Cookies de Mantequilla de Maní",   time:"15 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=70",
    ing:["1 taza mantequilla de maní natural","1 huevo","Miel o azúcar de coco","Vainilla","Sal","Trocitos de chocolate opcional"],
    steps:["Precalienta horno a 175°C.","Mezcla la mantequilla de maní con el huevo.","Agrega la miel, vainilla y una pizca de sal.","Forma bolitas y coloca en bandeja.","Aplana con tenedor haciendo cuadrícula.","Hornea 10 a 12 minutos. Deja enfriar completamente."] },
  { id:74, cat:"pasteleria", title:"Tarta de Limón con Base de Almendra",time:"30 min", diff:"Avanzada", pts:30, img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=70",
    ing:["200g harina de almendra","Mantequilla","Miel","3 huevos","Jugo de 3 limones","Ralladura de limón"],
    steps:["Mezcla harina de almendra con mantequilla y miel para la base.","Prensa en molde y hornea 10 minutos a 175°C.","Bate los huevos con el jugo y ralladura de limón.","Cocina la crema a baño maría revolviendo hasta espesar.","Vierte sobre la base prehorneada.","Refrigera 2 horas antes de cortar."] },
  { id:75, cat:"pasteleria", title:"Waffles de Banana sin Gluten",      time:"15 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=70",
    ing:["2 bananos maduros","2 huevos","1 taza harina de avena","1/2 cucharadita polvo para hornear","Vainilla","Canela"],
    steps:["Tritura los bananos hasta obtener puré suave.","Bate los huevos e incorpora con el puré.","Agrega la harina, polvo para hornear, vainilla y canela.","Mezcla hasta obtener masa homogénea.","Vierte en la wafflera precalentada y cocina.","Sirve con frutos rojos y miel."] },
  { id:76, cat:"pasteleria", title:"Budín de Semillas de Chía",          time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=70",
    ing:["3 cucharadas semillas de chía","1 taza leche vegetal","Miel","Vainilla","Frutos rojos","Granola"],
    steps:["Mezcla las semillas de chía con la leche vegetal.","Agrega la miel y la vainilla.","Revuelve bien para distribuir las semillas.","Refrigera mínimo 4 horas o toda la noche.","Revuelve al día siguiente y agrega más leche si es necesario.","Sirve con frutos rojos y granola encima."] },
  { id:77, cat:"pasteleria", title:"Crêpes de Avena con Fresas",         time:"15 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=70",
    ing:["1 taza avena molida","2 huevos","200ml leche de almendras","Vainilla","Fresas frescas","Yogur griego y miel"],
    steps:["Licúa la avena con los huevos y la leche.","Añade la vainilla y una pizca de sal.","Deja reposar la mezcla 5 minutos.","Calienta sartén y vierte porciones finas.","Cocina 1 minuto por lado hasta dorar.","Rellena con yogur, fresas y miel."] },
  { id:78, cat:"pasteleria", title:"Energy Balls de Coco y Dátil",       time:"15 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=70",
    ing:["1 taza dátiles","1 taza coco rallado sin azúcar","2 cucharadas cacao","Mantequilla de almendra","Vainilla","Sal"],
    steps:["Procesa los dátiles hasta obtener pasta.","Agrega el coco, cacao y mantequilla de almendra.","Incorpora la vainilla y sal.","Mezcla bien hasta conseguir masa compacta.","Forma bolitas con las manos húmedas.","Rueda en coco rallado y refrigera 30 minutos."] },
  { id:79, cat:"pasteleria", title:"Cake de Espinaca y Limón",           time:"40 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=70",
    ing:["1 taza espinaca baby","2 huevos","Jugo y ralladura de limón","1 taza harina de avena","Miel","Aceite de oliva"],
    steps:["Licúa la espinaca con el aceite y los huevos.","Agrega la miel, el limón y la ralladura.","Incorpora la harina de avena y levadura.","Mezcla hasta obtener masa verde uniforme.","Vierte en molde engrasado.","Hornea a 180°C por 30 a 35 minutos."] },
  { id:80, cat:"pasteleria", title:"Popsicles de Mango y Coco",          time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=70",
    ing:["2 mangos maduros","400ml leche de coco","2 cucharadas miel","Jugo de limón","Cúrcuma","Ralladura de lima"],
    steps:["Pela y corta el mango en trozos.","Licúa el mango con la leche de coco.","Agrega la miel, limón y cúrcuma.","Licúa hasta obtener mezcla homogénea.","Vierte en moldes de paletas y coloca palitos.","Congela mínimo 6 horas antes de servir."] },

  // ── DIABÉTICOS (20) ────────────────────────────────────────────────────────
  { id:81, cat:"diabetico", title:"Ensalada de Pepino con Vinagreta",   time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=70",
    ing:["2 pepinos","Cebolla morada","Tomate","Aceite de oliva","Vinagre de manzana","Eneldo y sal"],
    steps:["Corta los pepinos en medias lunas finas.","Pica la cebolla morada en julianas.","Corta el tomate en cubos.","Mezcla todos los vegetales.","Prepara vinagreta con aceite y vinagre.","Aliña y refrigera 15 minutos."] },
  { id:82, cat:"diabetico", title:"Pollo a la Plancha con Espárragos",  time:"20 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&q=70",
    ing:["2 pechugas de pollo","Espárragos frescos","Ajo en polvo","Limón","Aceite de oliva","Sal y pimienta"],
    steps:["Aplana el pollo para que tenga grosor uniforme.","Sazona con ajo, sal y pimienta.","Calienta la plancha a fuego alto.","Cocina el pollo 4 minutos por lado.","En la misma plancha cocina los espárragos 3 minutos.","Sirve con jugo de limón fresco."] },
  { id:83, cat:"diabetico", title:"Sopa de Lentejas sin Carbohidratos", time:"30 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70",
    ing:["1 taza lentejas verdes","Espinaca","Zanahoria","Apio","Cúrcuma","Caldo de pollo bajo sodio"],
    steps:["Sofríe apio y zanahoria en aceite de oliva.","Agrega las lentejas y la cúrcuma.","Incorpora el caldo de pollo y lleva a hervor.","Cocina 20 minutos a fuego medio.","Añade la espinaca los últimos 2 minutos.","Rectifica sazón sin agregar sal extra."] },
  { id:84, cat:"diabetico", title:"Tortilla de Clara de Huevo y Verduras",time:"10 min",diff:"Fácil",   pts:10, img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=70",
    ing:["4 claras de huevo","Espinaca","Tomate cherry","Cebollín","Aceite de oliva","Sal y pimienta"],
    steps:["Bate las claras con sal y pimienta.","Calienta sartén con aceite a fuego medio.","Agrega la espinaca y los tomates cortados.","Saltea 1 minuto y vierte las claras encima.","Cocina hasta que las orillas cuajen.","Dobla a la mitad y sirve."] },
  { id:85, cat:"diabetico", title:"Quinoa Tabulé sin Gluten",            time:"20 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=70",
    ing:["1 taza quinoa","Pepino","Tomate","Perejil abundante","Menta fresca","Limón y aceite de oliva"],
    steps:["Cocina la quinoa y deja enfriar completamente.","Pica el pepino, tomate, perejil y menta muy fino.","Mezcla la quinoa fría con todos los vegetales.","Aliña con limón abundante y aceite de oliva.","Mezcla bien y refrigera 30 minutos.","Sirve frío como ensalada o acompañamiento."] },
  { id:86, cat:"diabetico", title:"Bacalao al Horno con Vegetales",      time:"25 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=70",
    ing:["2 filetes de bacalao","Zucchini","Pimiento rojo","Cebolla","Aceite de oliva","Tomillo y orégano"],
    steps:["Precalienta horno a 200°C.","Corta los vegetales en trozos medianos.","Coloca los vegetales en bandeja con aceite y hierbas.","Coloca el bacalao encima.","Sazona con sal, pimienta y más hierbas.","Hornea 20 minutos hasta que el pescado esté opaco."] },
  { id:87, cat:"diabetico", title:"Ensalada de Tofu con Sésamo",          time:"15 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70",
    ing:["200g tofu firme","Hojas de espinaca","Semillas de sésamo","Jengibre rallado","Salsa soya baja sodio","Aceite de sésamo"],
    steps:["Corta el tofu en cubos y sécalo bien.","Dora en sartén sin aceite por todos lados.","Mezcla salsa soya, aceite de sésamo y jengibre.","Baña el tofu con la salsa y mezcla.","Sirve sobre espinaca fresca.","Espolvorea semillas de sésamo encima."] },
  { id:88, cat:"diabetico", title:"Crema de Coliflor sin Nata",           time:"20 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=70",
    ing:["1 coliflor grande","Caldo de vegetales sin sal","Ajo","Cebolla","Aceite de oliva","Sal y pimienta blanca"],
    steps:["Corta la coliflor en floretes y el ajo.","Sofríe la cebolla y el ajo en aceite.","Agrega la coliflor y el caldo.","Cocina 15 minutos hasta que ablande.","Licúa hasta obtener crema muy suave.","Rectifica sazón y sirve con aceite de oliva."] },
  { id:89, cat:"diabetico", title:"Pechuga Marinada con Hierbas",         time:"25 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&q=70",
    ing:["2 pechugas de pollo","Romero","Tomillo","Ajo","Aceite de oliva","Vinagre balsámico y sal"],
    steps:["Mezcla el aceite, vinagre, hierbas y ajo para la marinada.","Sumerge el pollo y marina 30 minutos mínimo.","Calienta la plancha o sartén a fuego alto.","Cocina el pollo escurrido 4 minutos por lado.","Baja el fuego y cocina 5 minutos más.","Deja reposar 3 minutos antes de cortar."] },
  { id:90, cat:"diabetico", title:"Tortilla de Batata Horneada",           time:"35 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=70",
    ing:["1 batata mediana","3 huevos","Cebolla","Pimiento verde","Aceite de oliva","Sal y cúrcuma"],
    steps:["Pela y corta la batata en rodajas finas.","Cocina la batata en aceite con cebolla 15 minutos.","Bate los huevos con la cúrcuma y sal.","Mezcla la batata cocida con los huevos.","Vierte en sartén y cocina a fuego bajo 5 minutos.","Gratina en horno a 200°C por 8 minutos."] },
  { id:91, cat:"diabetico", title:"Gazpacho de Tomate sin Azúcar",        time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=70",
    ing:["4 tomates maduros","1 pepino","Pimiento rojo","Ajo","Aceite de oliva extra virgen","Vinagre de jerez y sal"],
    steps:["Pela y trocea los tomates.","Corta el pepino y el pimiento en trozos.","Coloca todo en la licuadora con el ajo.","Agrega aceite y vinagre.","Licúa hasta obtener textura suave.","Refrigera 1 hora y sirve muy frío."] },
  { id:92, cat:"diabetico", title:"Salmón con Ensalada de Pepino y Eneldo",time:"15 min",diff:"Fácil",   pts:10, img:"https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=70",
    ing:["2 filetes de salmón","Pepino","Eneldo fresco","Yogur griego natural","Limón","Sal y pimienta"],
    steps:["Sazona el salmón con sal, pimienta y limón.","Cocina en sartén con aceite 3 a 4 minutos por lado.","Corta el pepino en rodajas finas.","Mezcla el yogur con eneldo picado y limón.","Sirve el salmón con la ensalada de pepino al lado.","Añade cucharadas del yogur de eneldo encima."] },
  { id:93, cat:"diabetico", title:"Albóndigas de Pavo al Horno",           time:"30 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=70",
    ing:["400g pavo molido","Cebolla rallada","Ajo","Perejil","Huevo","Sal y pimienta negra"],
    steps:["Mezcla el pavo con cebolla, ajo y perejil picados.","Agrega el huevo, sal y pimienta.","Forma albóndigas del tamaño de una nuez.","Coloca en bandeja con papel de hornear.","Hornea a 200°C por 20 minutos.","Sirve con vegetales asados o ensalada."] },
  { id:94, cat:"diabetico", title:"Ensalada de Berros y Pera",             time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=70",
    ing:["Berros frescos","1 pera verde","Nueces","Queso feta","Aceite de oliva","Vinagre balsámico blanco"],
    steps:["Lava y seca los berros.","Corta la pera en láminas finas.","Trocea las nueces groseramente.","Desmiga el queso feta.","Arma la ensalada con todos los ingredientes.","Aliña con aceite y vinagre balsámico blanco."] },
  { id:95, cat:"diabetico", title:"Fideos de Zucchini con Tomate",         time:"15 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=70",
    ing:["3 zucchinis grandes","Tomates cherry","Ajo","Albahaca fresca","Aceite de oliva","Parmesano rallado"],
    steps:["Espiraliza los zucchinis o córtalos en tiras finas.","Sofríe el ajo en aceite de oliva 1 minuto.","Agrega los tomates cherry y aplasta levemente.","Incorpora los fideos de zucchini y saltea 2 minutos.","Mezcla bien y retira del fuego.","Sirve con albahaca fresca y parmesano."] },
  { id:96, cat:"diabetico", title:"Estofado de Garbanzo y Espinaca",       time:"30 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=70",
    ing:["1 lata garbanzos","400g espinaca","Cebolla","Ajo","Tomate triturado","Comino y pimentón"],
    steps:["Sofríe cebolla y ajo en aceite de oliva.","Agrega el tomate y cocina 5 minutos.","Incorpora el comino y el pimentón.","Añade los garbanzos y cocina 10 minutos.","Agrega la espinaca y cocina 2 minutos más.","Rectifica sazón y sirve."] },
  { id:97, cat:"diabetico", title:"Poke Bowl de Atún con Edamame",         time:"20 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70",
    ing:["150g atún fresco en cubos","1 taza arroz integral cocido","Edamame","Pepino","Zanahoria rallada","Salsa soya y sésamo"],
    steps:["Marina el atún en salsa soya y aceite de sésamo 10 minutos.","Prepara el arroz integral cocido y frío.","Blanquea el edamame 3 minutos en agua hirviendo.","Corta el pepino en rodajas y ralla la zanahoria.","Arma el bowl con arroz de base.","Coloca el atún y vegetales. Aliña con más salsa soya."] },
  { id:98, cat:"diabetico", title:"Pollo con Pimientos Asados",             time:"30 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&q=70",
    ing:["2 pechugas de pollo","Pimientos de colores","Cebolla","Aceite de oliva","Orégano seco","Sal y pimienta"],
    steps:["Corta los pimientos y la cebolla en tiras.","Saltea los pimientos y cebolla 8 minutos.","Sazona el pollo con orégano, sal y pimienta.","Sella el pollo en la misma sartén 4 minutos por lado.","Añade los pimientos encima del pollo.","Cocina 5 minutos más tapado y sirve."] },
  { id:99, cat:"diabetico", title:"Crêpes de Avena con Ricotta",            time:"15 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=70",
    ing:["1 taza harina de avena","2 huevos","200ml leche desnatada","Ricotta fresca","Frutos rojos","Stevia"],
    steps:["Mezcla la avena con los huevos y la leche.","Deja reposar 5 minutos.","Cocina crêpes finas en sartén sin aceite.","Mezcla la ricotta con stevia.","Rellena las crêpes con ricotta y frutos rojos.","Dobla y sirve de inmediato."] },
  { id:100,cat:"diabetico", title:"Ensalada de Col y Zanahoria (Coleslaw)",time:"10 min", diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=70",
    ing:["Col blanca rallada","2 zanahorias ralladas","Cebollín","Yogur griego natural","Vinagre de manzana","Sal y pimienta"],
    steps:["Ralla la col y las zanahorias.","Pica el cebollín finamente.","Mezcla el yogur con el vinagre.","Sazona con sal y pimienta.","Vierte el aderezo sobre la col y zanahoria.","Refrigera 20 minutos antes de servir."] },

  // ── SMOOTHIES Y JUGOS (20) ────────────────────────────────────────────────
  { id:101,cat:"smoothie", title:"Verde Energizante",                    time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["2 ramas apio","1 manzana verde","Espinaca","Pepino","Limón","Jengibre y agua"],
    steps:["Lava bien todos los ingredientes.","Corta en trozos para facilitar la licuada.","Coloca todo en la licuadora con agua.","Licúa a alta velocidad 1 minuto.","Cuela si prefieres jugo más límpido.","Sirve de inmediato sobre hielo."] },
  { id:102,cat:"smoothie", title:"Proteico de Fresa y Banana",          time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["1 taza fresas congeladas","1 banana","1 scoop proteína vainilla","Leche de almendras","Semillas de chía","Miel"],
    steps:["Coloca las fresas congeladas en la licuadora.","Agrega la banana en trozos.","Incorpora la proteína y las semillas de chía.","Vierte la leche de almendras.","Licúa 30 segundos hasta cremoso.","Sirve de inmediato."] },
  { id:103,cat:"smoothie", title:"Antiinflamatorio de Cúrcuma y Mango",  time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["1 mango maduro","1 cucharadita cúrcuma","1 cucharadita jengibre","Leche de coco","Pimienta negra","Miel y hielo"],
    steps:["Pela y trocea el mango.","Coloca en la licuadora con la leche de coco.","Agrega la cúrcuma y el jengibre rallado.","Añade una pizca de pimienta negra para activar la cúrcuma.","Incorpora miel al gusto y hielo.","Licúa y sirve de inmediato."] },
  { id:104,cat:"smoothie", title:"Rojo Detox de Remolacha y Manzana",   time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["1 remolacha pequeña cocida","1 manzana roja","Zanahoria","Jengibre","Limón","Agua fría e hielo"],
    steps:["Pela la remolacha y córtala en trozos.","Corta la manzana sin semillas.","Pela la zanahoria y córtala.","Coloca todo en la licuadora con agua.","Agrega el jengibre y el limón.","Licúa bien, cuela y sirve frío."] },
  { id:105,cat:"smoothie", title:"Tropical de Piña y Coco",              time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["1 taza piña congelada","Leche de coco","Cúrcuma","Jengibre","Lima","Menta fresca"],
    steps:["Coloca la piña congelada en la licuadora.","Agrega la leche de coco.","Incorpora la cúrcuma y el jengibre.","Exprime la lima.","Licúa hasta obtener mezcla cremosa.","Sirve con menta fresca encima."] },
  { id:106,cat:"smoothie", title:"Morado de Arándanos y Maqui",          time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["1 taza arándanos","1 cucharada polvo de maqui","Banana","Leche de avena","Semillas de lino","Miel"],
    steps:["Coloca los arándanos en la licuadora.","Agrega el polvo de maqui y la banana.","Incorpora las semillas de lino.","Vierte la leche de avena.","Endulza con miel al gusto.","Licúa y sirve de inmediato."] },
  { id:107,cat:"smoothie", title:"Naranja Inmunológico con Jengibre",    time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["3 naranjas","Jengibre fresco","Cúrcuma","Zanahoria","Limón","Pimienta de cayena y miel"],
    steps:["Exprime las naranjas y el limón.","Pela y ralla el jengibre.","Pela la zanahoria y licúala con los jugos.","Agrega la cúrcuma y la pimienta de cayena.","Endulza con miel si lo deseas.","Sirve sobre hielo inmediatamente."] },
  { id:108,cat:"smoothie", title:"Bowl de Smoothie de Açaí",             time:"10 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["100g pulpa de açaí congelada","1 banana congelada","Leche de almendras","Granola","Frutos rojos frescos","Miel y semillas"],
    steps:["Coloca la pulpa de açaí y la banana en la licuadora.","Agrega leche de almendras poco a poco.","Licúa hasta cremoso muy espeso.","Vierte en un tazón.","Coloca granola, frutos rojos y semillas encima.","Termina con un hilo de miel."] },
  { id:109,cat:"smoothie", title:"Shot de Jengibre y Limón",             time:"3 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["Jengibre fresco 5cm","Jugo de 2 limones","Cúrcuma en polvo","Pimienta negra","Agua","Miel opcional"],
    steps:["Ralla el jengibre sobre un colador.","Exprime el jugo de limón.","Mezcla el jengibre con el limón.","Agrega la cúrcuma y pimienta negra.","Cuela bien la mezcla.","Bebe de un solo trago en ayunas."] },
  { id:110,cat:"smoothie", title:"Cremoso de Aguacate y Espinaca",       time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["1/2 aguacate maduro","1 taza espinaca","Banana congelada","Leche de almendras","Proteína vegetal","Miel"],
    steps:["Coloca el aguacate y la espinaca en la licuadora.","Agrega la banana congelada.","Vierte la leche de almendras.","Agrega la proteína vegetal.","Licúa hasta que sea completamente suave.","Endulza con miel y sirve frío."] },
  { id:111,cat:"smoothie", title:"Jugo de Apio y Manzana Verde",         time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["4 ramas de apio","2 manzanas verdes","Pepino","Perejil","Limón","Agua e hielo"],
    steps:["Lava bien el apio y el pepino.","Corta las manzanas sin semillas.","Pasa todo por el extractor de jugos.","Si licúas agrega agua y cuela.","Exprime el limón al final.","Sirve muy frío con hielo."] },
  { id:112,cat:"smoothie", title:"Latte de Cúrcuma (Golden Milk)",       time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["400ml leche vegetal","1 cucharadita cúrcuma","Canela en polvo","Jengibre","Pimienta negra","Miel"],
    steps:["Calienta la leche vegetal a fuego bajo.","Agrega la cúrcuma, canela y jengibre.","Mezcla bien con un batidor de mano.","Añade la pimienta negra para activar la cúrcuma.","Endulza con miel al gusto.","Sirve caliente o frío según prefieras."] },
  { id:113,cat:"smoothie", title:"Agua de Sandía con Menta y Lima",      time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["2 tazas sandía en cubos","Jugo de 2 limas","Menta fresca","Agua mineral","Hielo","Stevia opcional"],
    steps:["Licúa la sandía hasta obtener jugo.","Cuela para retirar las semillas.","Mezcla con el jugo de lima.","Agrega la menta machacada.","Vierte sobre agua mineral con hielo.","Endulza con stevia si lo deseas."] },
  { id:114,cat:"smoothie", title:"Batido de Kéfir con Frambuesas",       time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["200ml kéfir natural","1 taza frambuesas","Banana","Vainilla","Semillas de chía","Miel"],
    steps:["Coloca el kéfir en la licuadora.","Agrega las frambuesas y la banana.","Incorpora las semillas de chía.","Añade la vainilla.","Licúa 30 segundos.","Endulza con miel y sirve de inmediato."] },
  { id:115,cat:"smoothie", title:"Jugo de Zanahoria con Naranja y Jengibre",time:"5 min",diff:"Fácil", pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["3 zanahorias","2 naranjas","Jengibre fresco","Limón","Cúrcuma en polvo","Hielo"],
    steps:["Exprime las naranjas y el limón.","Pasa las zanahorias por el extractor.","Si usas licuadora, agrega agua y cuela.","Ralla el jengibre sobre el jugo.","Agrega la cúrcuma y mezcla.","Sirve sobre hielo de inmediato."] },
  { id:116,cat:"smoothie", title:"Smoothie de Cacao y Mantequilla de Maní",time:"5 min",diff:"Fácil",  pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["2 bananas congeladas","2 cucharadas cacao en polvo","2 cucharadas mantequilla de maní","Leche de almendras","Canela","Miel"],
    steps:["Coloca las bananas congeladas en la licuadora.","Agrega el cacao y la mantequilla de maní.","Vierte la leche de almendras.","Incorpora la canela.","Licúa hasta obtener textura de malteada.","Endulza con miel y sirve."] },
  { id:117,cat:"smoothie", title:"Limonada de Jengibre con Stevia",      time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["Jugo de 4 limones","Jengibre fresco rallado","Agua fría","Stevia al gusto","Menta fresca","Hielo"],
    steps:["Exprime bien los limones.","Ralla el jengibre y mezcla con el limón.","Agrega agua fría y mezcla.","Endulza con stevia al gusto.","Cuela si prefieres sin pulpa.","Sirve con hielo y menta fresca."] },
  { id:118,cat:"smoothie", title:"Batido de Espirulina y Piña",          time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["1 taza piña congelada","1 cucharadita espirulina","Banana","Leche de coco","Limón","Miel"],
    steps:["Coloca la piña congelada en la licuadora.","Agrega la banana y la leche de coco.","Incorpora la espirulina.","Exprime el limón.","Licúa hasta homogéneo.","Endulza con miel y sirve de inmediato."] },
  { id:119,cat:"smoothie", title:"Jugo de Granada y Arándanos",          time:"5 min",  diff:"Fácil",    pts:10, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["1 granada","1 taza arándanos","Jugo de limón","Agua fría","Miel","Hielo"],
    steps:["Extrae los granos de la granada.","Licúa los granos de granada con los arándanos.","Agrega el limón y el agua fría.","Licúa bien y cuela para obtener jugo limpio.","Endulza con miel si lo deseas.","Sirve frío sobre hielo."] },
  { id:120,cat:"smoothie", title:"Smoothie Bowl de Mango y Coco",        time:"10 min", diff:"Media",    pts:20, img:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70",
    ing:["2 mangos congelados","Leche de coco","Cúrcuma","Coco rallado sin azúcar","Frutas frescas","Granola y semillas"],
    steps:["Coloca el mango congelado en la licuadora.","Agrega leche de coco poco a poco.","Incorpora la cúrcuma.","Licúa hasta obtener mezcla espesa.","Vierte en tazón.","Decora con coco, frutas, granola y semillas."] },
];

const DIFF_COLOR = { "Fácil":"#22c55e","Media":"#f59e0b","Avanzada":"#f43f5e" };
const DIFF_BG    = { "Fácil":"#14532d","Media":"#78350f","Avanzada":"#4c0519" };

// ─── SPEECH HOOK ────────────────────────────────────────────────────────────
function useSpeech(){
  const [speaking,setSpeaking]=useState(false);
  const [cur,setCur]=useState(-1);
  const speak=(text,idx)=>{
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang="es-ES"; u.rate=0.95; u.pitch=1.05;
    u.onstart=()=>{setSpeaking(true);setCur(idx);};
    u.onend=()=>{setSpeaking(false);setCur(-1);};
    window.speechSynthesis.speak(u);
  };
  const stop=()=>{window.speechSynthesis.cancel();setSpeaking(false);setCur(-1);};
  return {speak,stop,speaking,cur};
}

// ─── STORE HOOK ─────────────────────────────────────────────────────────────
function useStore(){
  const load=()=>{try{const r=localStorage.getItem("nc120v2");return r?JSON.parse(r):null;}catch{return null;}};
  const [s,setS]=useState(()=>load()||{pts:0,cooked:[],badges:[],cp:{}});
  useEffect(()=>{try{localStorage.setItem("nc120v2",JSON.stringify(s));}catch{}},[s]);
  const cook=(id,cat)=>{
    setS(prev=>{
      if(prev.cooked.includes(id))return prev;
      const r=RECIPES.find(x=>x.id===id);
      const nc=[...prev.cooked,id];
      const np=prev.pts+(r?.pts||10);
      const cats=RECIPES.filter(x=>x.cat===cat).map(x=>x.id);
      const nb=[...prev.badges];
      if(cats.every(x=>nc.includes(x))&&!nb.includes(cat))nb.push(cat);
      const ncp={...prev.cp};
      WEEKLY.forEach(w=>{if(w.cat===cat)ncp[w.id]=(ncp[w.id]||0)+1;});
      return{...prev,cooked:nc,pts:np,badges:nb,cp:ncp};
    });
  };
  return{...s,cook};
}

// ─── CIRCULAR PROGRESS ──────────────────────────────────────────────────────
function CircleProgress({pct,size=38,stroke=3,color="#84cc16"}){
  const r=size/2-stroke;
  const circ=2*Math.PI*r;
  const dash=circ*(pct/100);
  return(
    <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e2d1a" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{transition:"stroke-dasharray 0.6s ease"}}/>
    </svg>
  );
}

// ─── RECIPE CARD ────────────────────────────────────────────────────────────
function RecipeCard({r,onClick,cooked}){
  const cat=CATEGORIES.find(c=>c.id===r.cat);
  const done=cooked.includes(r.id);
  return(
    <div onClick={onClick}
      style={{background:"#111c14",borderRadius:16,overflow:"hidden",cursor:"pointer",
        border:`1.5px solid ${done?cat.color+"99":"#1e2d1a"}`,
        transition:"transform 0.18s, box-shadow 0.18s",position:"relative"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 24px ${cat.color}22`;}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
      {/* Image */}
      <div style={{position:"relative",height:130,overflow:"hidden"}}>
        <img src={r.img} alt={r.title} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} loading="lazy"/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,#111c14 0%,transparent 55%)"}}/>
        {done&&(
          <div style={{position:"absolute",top:8,right:8,
            background:cat.color,borderRadius:"50%",width:22,height:22,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff",fontWeight:800,
            boxShadow:`0 0 8px ${cat.color}88`}}>✓</div>
        )}
        <div style={{position:"absolute",bottom:6,left:8,
          background:"rgba(0,0,0,0.72)",backdropFilter:"blur(4px)",
          borderRadius:6,padding:"2px 7px",color:"#fbbf24",fontSize:10,fontWeight:700,letterSpacing:"0.3px"}}>
          +{r.pts} pts
        </div>
      </div>
      {/* Info */}
      <div style={{padding:"9px 10px 12px"}}>
        <div style={{color:"#e8f5e2",fontWeight:700,fontSize:12,marginBottom:7,lineHeight:1.35}}>{r.title}</div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          <span style={{background:"#0d1a0f",color:"#6b9e72",borderRadius:5,padding:"2px 6px",fontSize:10,fontWeight:500}}>⏱ {r.time}</span>
          <span style={{background:DIFF_BG[r.diff],color:DIFF_COLOR[r.diff],borderRadius:5,padding:"2px 6px",fontSize:10,fontWeight:700}}>{r.diff}</span>
        </div>
      </div>
    </div>
  );
}

// ─── CATEGORY CHIP ──────────────────────────────────────────────────────────
function CatChip({c,active,done,total,onClick}){
  const pct=Math.round((done/total)*100);
  return(
    <div onClick={onClick}
      style={{background:active?c.color+"22":"#111c14",borderRadius:14,padding:"12px 10px",cursor:"pointer",
        border:`1.5px solid ${active?c.color+"88":"#1e2d1a"}`,transition:"all 0.18s",
        boxShadow:active?`0 0 16px ${c.color}33`:"none"}}>
      <div style={{fontSize:22,marginBottom:5}}>{c.emoji}</div>
      <div style={{color:active?c.color:"#8aab8e",fontWeight:700,fontSize:10,marginBottom:7,lineHeight:1.2}}>{c.label}</div>
      <div style={{background:"#0d1a0f",borderRadius:4,height:3,marginBottom:3}}>
        <div style={{background:c.color,height:3,borderRadius:4,width:`${pct}%`,transition:"width 0.5s"}}/>
      </div>
      <div style={{color:"#4a6b4e",fontSize:9}}>{done}/{total}</div>
    </div>
  );
}

// ─── TOAST ──────────────────────────────────────────────────────────────────
function Toast({msg}){
  return(
    <div style={{position:"fixed",top:68,left:"50%",transform:"translateX(-50%)",
      background:"linear-gradient(135deg,#166534,#15803d)",color:"#dcfce7",
      borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:13,zIndex:400,
      whiteSpace:"nowrap",border:"1px solid #22c55e44",
      boxShadow:"0 4px 20px rgba(34,197,94,0.3)"}}>
      {msg}
    </div>
  );
}

// ─── RECIPE MODAL ───────────────────────────────────────────────────────────
function RecipeModal({recipe,onClose,onCook,cooked,onViewRecipe}){
  const{speak,stop,speaking,cur}=useSpeech();
  const[tab,setTab]=useState("ing");
  const done=cooked.includes(recipe.id);
  const cat=CATEGORIES.find(c=>c.id===recipe.cat);
  useEffect(()=>()=>stop(),[]);

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:200,
      display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(3px)"}}
      onClick={e=>{if(e.target===e.currentTarget){stop();onClose();}}}>

      <div style={{background:"#0b1410",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:560,
        maxHeight:"92vh",overflowY:"auto",paddingBottom:32,
        boxShadow:`0 -8px 40px ${cat.color}22`}}>

        {/* Hero image */}
        <div style={{position:"relative"}}>
          <img src={recipe.img} alt={recipe.title}
            style={{width:"100%",height:210,objectFit:"cover",borderRadius:"24px 24px 0 0",display:"block"}}/>
          <div style={{position:"absolute",inset:0,
            background:"linear-gradient(to top,#0b1410 0%,rgba(11,20,16,0.3) 60%,transparent 100%)",
            borderRadius:"24px 24px 0 0"}}/>

          {/* Close */}
          <button onClick={()=>{stop();onClose();}}
            style={{position:"absolute",top:14,right:14,
              background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",
              border:"1px solid rgba(255,255,255,0.12)",color:"#fff",
              borderRadius:"50%",width:34,height:34,cursor:"pointer",
              fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>

          {/* Title block */}
          <div style={{position:"absolute",bottom:14,left:18,right:56}}>
            <div style={{display:"flex",gap:6,marginBottom:5,flexWrap:"wrap"}}>
              <span style={{background:cat.color,color:"#fff",borderRadius:7,padding:"2px 9px",
                fontSize:11,fontWeight:700}}>{cat.emoji} {cat.label}</span>
              {done&&<span style={{background:"#14532d",color:"#86efac",borderRadius:7,
                padding:"2px 9px",fontSize:11,fontWeight:700,border:"1px solid #166534"}}>✓ Cocinada</span>}
            </div>
            <div style={{color:"#f0fdf4",fontWeight:800,fontSize:19,lineHeight:1.2,
              textShadow:"0 1px 8px rgba(0,0,0,0.6)"}}>{recipe.title}</div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{display:"flex",margin:"14px 16px",background:"#111c14",borderRadius:12,overflow:"hidden",
          border:"1px solid #1e2d1a"}}>
          {[["⏱",recipe.time,"Tiempo"],["📊",recipe.diff,"Nivel"],["⭐",`+${recipe.pts}`,"Puntos"]].map(([e,v,l],i)=>(
            <div key={l} style={{flex:1,padding:"11px 6px",textAlign:"center",
              borderRight:i<2?"1px solid #1e2d1a":"none"}}>
              <div style={{fontSize:15}}>{e}</div>
              <div style={{color:"#e8f5e2",fontWeight:700,fontSize:12,marginTop:2}}>{v}</div>
              <div style={{color:"#4a6b4e",fontSize:10,marginTop:1}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Tab switcher */}
        <div style={{display:"flex",margin:"0 16px 14px",background:"#111c14",
          borderRadius:10,padding:3,border:"1px solid #1e2d1a"}}>
          {[["ing","🥕 Ingredientes"],["steps","👨‍🍳 Pasos"]].map(([t,l])=>(
            <button key={t} onClick={()=>setTab(t)}
              style={{flex:1,padding:"8px 0",border:"none",borderRadius:8,
                background:tab===t?cat.color:"transparent",
                color:tab===t?"#fff":"#4a6b4e",fontWeight:700,fontSize:12,cursor:"pointer",
                transition:"all 0.2s"}}>
              {l}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{padding:"0 16px"}}>
          {tab==="ing"?(
            <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:6}}>
              {recipe.ing.map((x,i)=>(
                <li key={i} style={{background:"#111c14",borderRadius:10,padding:"11px 14px",
                  color:"#cde8c9",fontSize:13,display:"flex",alignItems:"center",gap:10,
                  border:"1px solid #1e2d1a"}}>
                  <span style={{color:cat.color,fontWeight:900,fontSize:16,flexShrink:0}}>·</span>{x}
                </li>
              ))}
            </ul>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <div style={{color:"#4a6b4e",fontSize:11,textAlign:"center",marginBottom:4}}>
                Toca 🔊 para escuchar cada paso
              </div>
              {recipe.steps.map((step,i)=>(
                <div key={i}
                  style={{background:cur===i?cat.color+"18":"#111c14",
                    border:`1.5px solid ${cur===i?cat.color+"66":"#1e2d1a"}`,
                    borderRadius:12,padding:"12px 12px",display:"flex",gap:10,
                    alignItems:"flex-start",transition:"all 0.2s"}}>
                  <div style={{background:cur===i?cat.color:"#1e2d1a",color:cur===i?"#fff":cat.color,
                    borderRadius:"50%",width:26,height:26,display:"flex",
                    alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:11,flexShrink:0,
                    border:`1.5px solid ${cat.color}66`,transition:"all 0.2s"}}>
                    {i+1}
                  </div>
                  <div style={{flex:1,color:"#cde8c9",fontSize:12.5,lineHeight:1.6,paddingTop:3}}>{step}</div>
                  <button onClick={()=>speaking&&cur===i?stop():speak(`Paso ${i+1}: ${step}`,i)}
                    style={{background:speaking&&cur===i?cat.color:"#1e2d1a",border:"none",
                      borderRadius:8,width:32,height:32,cursor:"pointer",fontSize:15,flexShrink:0,
                      color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",
                      transition:"all 0.2s"}}>
                    {speaking&&cur===i?"⏹":"🔊"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{margin:"22px 16px 0",display:"flex",flexDirection:"column",gap:10}}>
          <button onClick={()=>{stop();onClose();onViewRecipe(recipe);}}
            style={{width:"100%",padding:"15px",
              background:"linear-gradient(135deg,#0f2d1a,#1a3d25)",
              border:`1.5px solid ${cat.color}88`,borderRadius:14,
              color:cat.color,fontWeight:800,fontSize:15,
              cursor:"pointer",letterSpacing:"0.2px",
              display:"flex",alignItems:"center",justifyContent:"center",gap:9,
              boxShadow:`0 4px 20px ${cat.color}18`,transition:"all 0.2s"}}>
            <span style={{fontSize:18}}>🎬</span> Ver Receta con Chef IA
          </button>
          {!done?(
            <button onClick={()=>{onCook(recipe.id,recipe.cat);stop();onClose();}}
              style={{width:"100%",padding:"15px",
                background:`linear-gradient(135deg,${cat.color},${cat.color}bb)`,
                border:"none",borderRadius:14,color:"#fff",fontWeight:800,fontSize:15,
                cursor:"pointer",letterSpacing:"0.2px",
                boxShadow:`0 4px 20px ${cat.color}44`,transition:"opacity 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.opacity="0.9"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              ✅ Marcar como cocinada · +{recipe.pts} pts
            </button>
          ):(
            <div style={{background:"#0d1f0f",borderRadius:14,padding:14,textAlign:"center",
              color:"#86efac",fontWeight:700,border:"1px solid #166534",
              boxShadow:"0 0 16px rgba(34,197,94,0.1)"}}>
              ✓ Ya cocinaste esta receta — ¡bien hecho!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ─── CHEF IA PAGE ────────────────────────────────────────────────────────────
// ► Reemplaza CHEF_VIDEO_URL con tu video de chef IA
// ► Cada receta puede tener: audioSrc (ruta del mp3 de ElevenLabs)
// ► Cada paso puede tener: { text: "...", timer: N }  donde N = minutos
const CHEF_VIDEO_URL = "https://player.mediadelivery.net/play/691450/9b452864-7dae-4692-8ee5-234e70428f86";

// Helper: normaliza steps (string legacy o objeto nuevo)
function normalizeSteps(steps){
  return (steps||[]).map(s=> typeof s==="string" ? {text:s} : s);
}

// ─── TICK-TACK ENGINE (Web Audio API) ────────────────────────────────────────
function useTickTack(){
  const ctxRef = useRef(null);
  const intervalRef = useRef(null);

  const getCtx = () => {
    if(!ctxRef.current) ctxRef.current = new (window.AudioContext||window.webkitAudioContext)();
    return ctxRef.current;
  };

  const playTick = (high=false) => {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = high ? 1100 : 820;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.09);
  };

  const startTicking = () => {
    stopTicking();
    let beat = 0;
    playTick(true);
    intervalRef.current = setInterval(()=>{
      beat++;
      playTick(beat%2===0);
    }, 500);
  };

  const stopTicking = () => {
    if(intervalRef.current){ clearInterval(intervalRef.current); intervalRef.current=null; }
  };

  const playDone = () => {
    const ctx = getCtx();
    [0,0.15,0.30].forEach((t,i)=>{
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = [880,1047,1319][i];
      osc.type = "sine";
      gain.gain.setValueAtTime(0.22, ctx.currentTime+t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+t+0.35);
      osc.start(ctx.currentTime+t);
      osc.stop(ctx.currentTime+t+0.36);
    });
  };

  useEffect(()=>()=>stopTicking(),[]);
  return {startTicking, stopTicking, playDone};
}

// ─── COUNTDOWN TIMER WIDGET ───────────────────────────────────────────────────
function CountdownTimer({minutes, color, onFinish}){
  const totalSecs = minutes * 60;
  const [secsLeft, setSecsLeft] = useState(totalSecs);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const {startTicking, stopTicking, playDone} = useTickTack();

  useEffect(()=>{
    let interval;
    if(running && secsLeft > 0){
      interval = setInterval(()=>{
        setSecsLeft(s=>{
          if(s<=1){
            clearInterval(interval);
            setRunning(false);
            setDone(true);
            stopTicking();
            playDone();
            if(onFinish) onFinish();
            return 0;
          }
          return s-1;
        });
      },1000);
    }
    return ()=>clearInterval(interval);
  },[running]);

  const toggle = () => {
    if(done) return;
    if(running){ stopTicking(); setRunning(false); }
    else { startTicking(); setRunning(true); }
  };

  const reset = () => {
    stopTicking(); setRunning(false); setDone(false); setSecsLeft(totalSecs);
  };

  const mins = Math.floor(secsLeft/60);
  const secs = secsLeft%60;
  const pct  = ((totalSecs-secsLeft)/totalSecs)*100;
  const circumference = 2*Math.PI*36;

  return(
    <div style={{margin:"10px 0",background:"#0b1a10",borderRadius:16,padding:"16px 18px",
      border:`1.5px solid ${done?"#22c55e":running?color+"88":color+"44"}`,
      boxShadow:running?`0 0 20px ${color}33`:"none",
      transition:"all 0.4s"}}>

      <div style={{display:"flex",alignItems:"center",gap:14}}>
        {/* Circular progress */}
        <div style={{position:"relative",width:80,height:80,flexShrink:0}}>
          <svg width="80" height="80" style={{transform:"rotate(-90deg)"}}>
            <circle cx="40" cy="40" r="36" fill="none" stroke="#1e2d1a" strokeWidth="5"/>
            <circle cx="40" cy="40" r="36" fill="none"
              stroke={done?"#22c55e":color} strokeWidth="5"
              strokeDasharray={`${circumference*(1-pct/100)} ${circumference}`}
              strokeLinecap="round"
              style={{transition:"stroke-dasharray 0.9s ease"}}/>
          </svg>
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center"}}>
            {done
              ? <span style={{fontSize:22}}>✅</span>
              : <>
                  <span style={{color:"#e8f5e2",fontWeight:900,fontSize:18,lineHeight:1,fontVariantNumeric:"tabular-nums"}}>
                    {String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}
                  </span>
                  {running&&<span style={{fontSize:8,color:color,marginTop:2,letterSpacing:"1px"}}>TICK</span>}
                </>
            }
          </div>
        </div>

        {/* Info + controls */}
        <div style={{flex:1}}>
          <div style={{color:"#e8f5e2",fontWeight:700,fontSize:13,marginBottom:2}}>
            ⏱ Temporizador · {minutes} min
          </div>
          <div style={{color:"#4a6b4e",fontSize:11,marginBottom:10}}>
            {done?"¡Tiempo cumplido! 🎉":running?"Cocinando... tick tack":"Listo para iniciar"}
          </div>
          <div style={{display:"flex",gap:7}}>
            {!done&&(
              <button onClick={toggle}
                style={{padding:"7px 16px",background:running?"#1e2d1a":`linear-gradient(135deg,${color},${color}bb)`,
                  border:`1px solid ${color}66`,borderRadius:9,
                  color:running?color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}}>
                {running?"⏸ Pausar":"▶ Iniciar"}
              </button>
            )}
            <button onClick={reset}
              style={{padding:"7px 14px",background:"#111c14",border:"1px solid #1e2d1a",
                borderRadius:9,color:"#4a6b4e",fontWeight:600,fontSize:12,cursor:"pointer"}}>
              ↺ Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CHEF PAGE ────────────────────────────────────────────────────────────────
function ChefPage({recipe, onClose, onCook, cooked}){
  const cat   = CATEGORIES.find(c=>c.id===recipe.cat);
  const done  = cooked.includes(recipe.id);
  const steps = normalizeSteps(recipe.steps);

  const audioRef    = useRef(null);
  const videoRef    = useRef(null);
  const [audioReady, setAudioReady]   = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [activeStep, setActiveStep]   = useState(-1);
  const [activeTimer, setActiveTimer] = useState(null); // step index with open timer
  const [timerKey, setTimerKey]       = useState(0);    // force re-mount timer on new step

  // ── Audio handlers ────────────────────────────────────────────────────────
  const handlePlay = () => {
    const a = audioRef.current;
    if(!a) return;
    a.play();
    setAudioPlaying(true);
  };

  const handlePause = () => {
    const a = audioRef.current;
    if(!a) return;
    a.pause();
    setAudioPlaying(false);
  };

  const handleStop = () => {
    const a = audioRef.current;
    if(!a) return;
    a.pause();
    a.currentTime = 0;
    setAudioPlaying(false);
    setActiveStep(-1);
    setActiveTimer(null);
  };

  // ── Step card click: manually advance active step ────────────────────────
  const goToStep = (i) => {
    setActiveStep(i);
    const s = steps[i];
    if(s.timer){
      setActiveTimer(i);
      setTimerKey(k=>k+1);
    } else {
      setActiveTimer(null);
    }
  };

  // Cleanup
  useEffect(()=>()=>{
    const a = audioRef.current;
    if(a){ a.pause(); a.src=""; }
  },[]);

  const hasAudio = !!recipe.audioSrc;

  return(
    <div style={{position:"fixed",inset:0,background:"#080f0b",zIndex:300,
      display:"flex",flexDirection:"column",maxWidth:560,margin:"0 auto",
      fontFamily:"'Inter',-apple-system,sans-serif",overflowY:"auto"}}>

      {/* ── HEADER ───────────────────────────────────────────────────────────*/}
      <div style={{position:"sticky",top:0,zIndex:10,background:"rgba(8,15,11,0.95)",
        backdropFilter:"blur(14px)",borderBottom:"1px solid #111c14",
        padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>{handleStop();onClose();}}
          style={{background:"#111c14",border:"1px solid #1e2d1a",color:"#84cc16",
            borderRadius:10,width:36,height:36,cursor:"pointer",fontSize:18,
            display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <div style={{flex:1}}>
          <div style={{color:cat.color,fontSize:10,fontWeight:700,
            letterSpacing:"1px",textTransform:"uppercase"}}>{cat.emoji} {cat.label}</div>
          <div style={{color:"#e8f5e2",fontWeight:800,fontSize:14,lineHeight:1.2,
            whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{recipe.title}</div>
        </div>
        <div style={{background:"#111c14",border:"1px solid #1e2d1a",
          borderRadius:8,padding:"4px 10px",textAlign:"center",flexShrink:0}}>
          <div style={{color:"#fbbf24",fontWeight:800,fontSize:12}}>+{recipe.pts}</div>
          <div style={{color:"#4a6b4e",fontSize:9}}>pts</div>
        </div>
      </div>

      {/* ── CHEF VIDEO ───────────────────────────────────────────────────────*/}
      <div style={{position:"relative",flexShrink:0}}>
        <div style={{position:"absolute",inset:0,
          background:`radial-gradient(ellipse at 50% 70%, ${cat.color}14 0%, transparent 70%)`,
          pointerEvents:"none",zIndex:1}}/>

        <div style={{position:"relative",margin:"16px 16px 0",borderRadius:20,overflow:"hidden",
          border:`1.5px solid ${cat.color}44`,
          boxShadow:`0 0 32px ${cat.color}1a, 0 8px 32px rgba(0,0,0,0.6)`}}>

          <video ref={videoRef} src={CHEF_VIDEO_URL}
            autoPlay loop muted playsInline
            style={{width:"100%",height:200,objectFit:"cover",display:"block",
              filter:audioPlaying?"brightness(1.05)":"brightness(0.55) saturate(0.6)",
              transition:"filter 0.6s"}}/>

          {/* Speaking waves overlay when audio plays */}
          {audioPlaying&&(
            <div style={{position:"absolute",bottom:10,left:12,
              display:"flex",alignItems:"center",gap:5,
              background:"rgba(8,15,11,0.78)",backdropFilter:"blur(6px)",
              borderRadius:20,padding:"5px 13px",border:`1px solid ${cat.color}44`}}>
              {[0,1,2,3,4].map(i=>(
                <div key={i} style={{width:3,borderRadius:2,background:cat.color,
                  animation:`waveBar 0.85s ease-in-out ${i*0.13}s infinite`,height:14}}/>
              ))}
              <span style={{color:"#e8f5e2",fontSize:11,fontWeight:600,marginLeft:5}}>
                Chef IA hablando...
              </span>
            </div>
          )}

          {!audioPlaying&&(
            <div style={{position:"absolute",inset:0,display:"flex",
              alignItems:"center",justifyContent:"center",
              background:"rgba(8,15,11,0.45)"}}>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:12,color:"#84cc16",fontWeight:700}}>Chef IA</div>
                <div style={{fontSize:10,color:"#4a6b4e",marginTop:2}}>
                  {hasAudio?"Dale ▶ para comenzar":"Sin audio asignado aún"}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── AUDIO PLAYER ─────────────────────────────────────────────────*/}
        <div style={{margin:"12px 16px",background:"#111c14",borderRadius:14,
          padding:"14px 16px",border:`1px solid ${cat.color}33`}}>

          {hasAudio ? (
            <>
              {/* Hidden HTML audio element */}
              <audio ref={audioRef} src={recipe.audioSrc} preload="metadata"
                onCanPlay={()=>setAudioReady(true)}
                onEnded={()=>setAudioPlaying(false)}
                style={{display:"none"}}/>

              <div style={{display:"flex",alignItems:"center",gap:10}}>
                {/* Play/Pause/Stop */}
                <button onClick={audioPlaying?handlePause:handlePlay}
                  style={{width:48,height:48,borderRadius:"50%",border:"none",
                    background:audioReady?`linear-gradient(135deg,${cat.color},${cat.color}bb)`:"#1e2d1a",
                    color:"#fff",fontSize:18,cursor:audioReady?"pointer":"default",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    boxShadow:audioReady?`0 4px 16px ${cat.color}44`:"none",
                    transition:"all 0.3s"}}>
                  {audioPlaying?"⏸":"▶"}
                </button>
                <button onClick={handleStop}
                  style={{width:36,height:36,borderRadius:"50%",
                    border:"1px solid #1e2d1a",background:"#0b1410",
                    color:"#4a6b4e",fontSize:14,cursor:"pointer",
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                  ⏹
                </button>

                <div style={{flex:1}}>
                  <div style={{color:"#e8f5e2",fontWeight:700,fontSize:12,marginBottom:2}}>
                    🎙 Audio ElevenLabs
                  </div>
                  <div style={{color:"#4a6b4e",fontSize:10}}>
                    {!audioReady?"Cargando audio..."
                      :audioPlaying?"Reproduciendo narración..."
                      :"Listo · toca ▶ para escuchar"}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{textAlign:"center",padding:"8px 0"}}>
              <div style={{color:"#4a6b4e",fontSize:12,fontWeight:600}}>🎙 Audio próximamente</div>
              <div style={{color:"#2d3d31",fontSize:10,marginTop:3}}>
                Agrega <code style={{color:cat.color}}>audioSrc:"/audios/receta-{recipe.id}.mp3"</code> a la receta
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── INGREDIENTS ──────────────────────────────────────────────────────*/}
      <div style={{padding:"4px 16px 0"}}>
        <div style={{color:"#4a6b4e",fontSize:10,fontWeight:700,letterSpacing:"1px",
          textTransform:"uppercase",marginBottom:8}}>Ingredientes</div>
        <div style={{background:"#111c14",borderRadius:14,padding:"12px 14px",
          border:"1px solid #1e2d1a"}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {recipe.ing.map((x,i)=>(
              <span key={i} style={{background:"#0b1410",color:"#cde8c9",
                borderRadius:8,padding:"5px 10px",fontSize:12,border:"1px solid #1e2d1a"}}>
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── STEPS + TIMERS ───────────────────────────────────────────────────*/}
      <div style={{padding:"14px 16px 10px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{color:"#4a6b4e",fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase"}}>
            Pasos detallados
          </div>
          <div style={{color:"#4a6b4e",fontSize:10}}>
            Toca un paso para activarlo
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {steps.map((step,i)=>{
            const isActive = activeStep===i;
            const isPast   = activeStep>i && activeStep>=0;
            const hasTimer = !!step.timer;
            return(
              <div key={i}>
                <div onClick={()=>goToStep(i)}
                  style={{background:isActive?cat.color+"18":isPast?"#0d1a0f":"#111c14",
                    border:`1.5px solid ${isActive?cat.color+"88":isPast?cat.color+"33":"#1e2d1a"}`,
                    borderRadius:14,padding:"13px 14px",
                    display:"flex",gap:12,alignItems:"flex-start",
                    transition:"all 0.35s ease",cursor:"pointer",
                    boxShadow:isActive?`0 0 16px ${cat.color}22`:"none"}}>

                  {/* Number circle */}
                  <div style={{background:isPast?cat.color:isActive?cat.color:"#1e2d1a",
                    color:"#fff",borderRadius:"50%",width:28,height:28,flexShrink:0,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontWeight:800,fontSize:11,border:`1.5px solid ${cat.color}44`,
                    boxShadow:isActive?`0 0 10px ${cat.color}88`:"none",
                    transition:"all 0.3s"}}>
                    {isPast?"✓":i+1}
                  </div>

                  {/* Step text */}
                  <div style={{flex:1,color:isActive?"#f0fdf4":isPast?"#6b9e72":"#8aab8e",
                    fontSize:13,lineHeight:1.6,paddingTop:3,
                    fontWeight:isActive?600:400,transition:"color 0.3s"}}>
                    {step.text}
                  </div>

                  {/* Timer badge */}
                  {hasTimer&&(
                    <div style={{flexShrink:0,background:isActive?cat.color+"33":"#1e2d1a",
                      border:`1px solid ${cat.color}55`,borderRadius:8,
                      padding:"3px 8px",textAlign:"center",alignSelf:"center"}}>
                      <div style={{color:cat.color,fontSize:10,fontWeight:700}}>⏱</div>
                      <div style={{color:cat.color,fontSize:9,fontWeight:700}}>{step.timer}m</div>
                    </div>
                  )}

                  {/* Wave when active */}
                  {isActive&&(
                    <div style={{display:"flex",alignItems:"center",gap:2,paddingTop:7,flexShrink:0}}>
                      {[0,1,2].map(j=>(
                        <div key={j} style={{width:2,borderRadius:2,background:cat.color,
                          animation:`waveBar 0.7s ease-in-out ${j*0.12}s infinite`,height:10}}/>
                      ))}
                    </div>
                  )}
                </div>

                {/* Countdown timer appears below active step with timer */}
                {isActive && hasTimer && activeTimer===i && (
                  <CountdownTimer
                    key={`timer-${i}-${timerKey}`}
                    minutes={step.timer}
                    color={cat.color}
                    onFinish={()=>{}}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MARK AS COOKED ───────────────────────────────────────────────────*/}
      <div style={{padding:"14px 16px 40px"}}>
        {!done?(
          <button onClick={()=>{onCook(recipe.id,recipe.cat);handleStop();onClose();}}
            style={{width:"100%",padding:"15px",
              background:`linear-gradient(135deg,${cat.color},${cat.color}bb)`,
              border:"none",borderRadius:14,color:"#fff",fontWeight:800,fontSize:15,
              cursor:"pointer",boxShadow:`0 4px 20px ${cat.color}44`}}>
            ✅ Marcar como cocinada · +{recipe.pts} pts
          </button>
        ):(
          <div style={{background:"#0d1f0f",borderRadius:14,padding:14,textAlign:"center",
            color:"#86efac",fontWeight:700,border:"1px solid #166534"}}>
            ✓ Ya cocinaste esta receta — ¡bien hecho!
          </div>
        )}
      </div>

      <style>{`
        @keyframes waveBar {
          0%,100%{height:4px;opacity:0.5}
          50%{height:15px;opacity:1}
        }
      `}</style>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function App(){
  const[view,setView]=useState("home");
  const[selCat,setSelCat]=useState("keto");
  const[selRec,setSelRec]=useState(null);
  const[search,setSearch]=useState("");
  const[toast,setToast]=useState(null);
  const[chefRec,setChefRec]=useState(null);
  const store=useStore();

  const showToast=m=>{setToast(m);setTimeout(()=>setToast(null),3000);};
  const handleCook=(id,cat)=>{
    if(store.cooked.includes(id))return;
    const r=RECIPES.find(x=>x.id===id);
    store.cook(id,cat);
    showToast(`🎉 +${r.pts} pts — ¡Receta completada!`);
  };

  const filtered=search.length>1
    ?RECIPES.filter(r=>r.title.toLowerCase().includes(search.toLowerCase())||r.cat.includes(search.toLowerCase()))
    :RECIPES.filter(r=>r.cat===selCat);

  const globalPct=Math.round((store.cooked.length/120)*100);

  return(
    <div style={{background:"#080f0b",minHeight:"100vh",
      fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",
      maxWidth:560,margin:"0 auto",position:"relative",color:"#e8f5e2"}}>

      {/* ── TOPBAR ─────────────────────────────────────────────────────────── */}
      <header style={{background:"#080f0b",padding:"0 16px",display:"flex",
        alignItems:"center",justifyContent:"space-between",height:58,
        position:"sticky",top:0,zIndex:100,
        borderBottom:"1px solid #111c14",backdropFilter:"blur(12px)"}}>

        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <span style={{fontSize:21}}>🌿</span>
          <div>
            <span style={{color:"#e8f5e2",fontWeight:800,fontSize:16,letterSpacing:"-0.5px"}}>NutriChef</span>
            <span style={{background:"linear-gradient(90deg,#84cc16,#22c55e)",WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",fontSize:10,fontWeight:800,
              letterSpacing:"1px",marginLeft:5}}>PRO</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{display:"flex",gap:2}}>
          {[["home","🏠","Inicio"],["retos","⚡","Retos"],["logros","🏆","Logros"]].map(([v,e,label])=>(
            <button key={v} onClick={()=>setView(v)}
              style={{background:view===v?"#111c14":"transparent",
                border:view===v?"1px solid #1e2d1a":"1px solid transparent",
                color:view===v?"#84cc16":"#4a6b4e",
                borderRadius:9,padding:"5px 10px",cursor:"pointer",fontSize:16,
                transition:"all 0.15s"}}
              title={label}>
              {e}
            </button>
          ))}
        </nav>

        {/* Points + global progress ring */}
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{textAlign:"right"}}>
            <div style={{color:"#fbbf24",fontWeight:800,fontSize:14,lineHeight:1}}>{store.pts}</div>
            <div style={{color:"#4a6b4e",fontSize:9,lineHeight:1,marginTop:1}}>pts</div>
          </div>
          <div style={{position:"relative",width:38,height:38}}>
            <CircleProgress pct={globalPct} color="#84cc16"/>
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:9,color:"#84cc16",fontWeight:700}}>{globalPct}%</div>
          </div>
        </div>
      </header>

      {/* TOAST */}
      {toast&&<Toast msg={toast}/>}

      {/* ── HOME ───────────────────────────────────────────────────────────── */}
      {view==="home"&&(
        <>
          {/* Hero */}
          <div style={{padding:"20px 16px 12px"}}>
            <div style={{color:"#4a6b4e",fontSize:11,fontWeight:600,letterSpacing:"1px",
              textTransform:"uppercase",marginBottom:3}}>
              120 recetas · 6 categorías
            </div>
            <h1 style={{color:"#e8f5e2",fontWeight:900,fontSize:26,margin:"0 0 14px",
              lineHeight:1.15,letterSpacing:"-0.5px"}}>
              ¿Qué cocinamos<br/>
              <span style={{background:"linear-gradient(90deg,#84cc16,#22c55e)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>hoy?</span>
            </h1>
            {/* Search */}
            <div style={{position:"relative"}}>
              <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:15,opacity:0.5}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Buscar receta..."
                style={{width:"100%",background:"#111c14",
                  border:"1.5px solid "+(search?"#84cc16":"#1e2d1a"),
                  borderRadius:11,padding:"10px 12px 10px 38px",
                  color:"#e8f5e2",fontSize:14,outline:"none",
                  boxSizing:"border-box",transition:"border-color 0.2s"}}/>
              {search&&<button onClick={()=>setSearch("")}
                style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",
                  background:"none",border:"none",color:"#4a6b4e",cursor:"pointer",fontSize:16}}>×</button>}
            </div>
          </div>

          {/* Categories */}
          {!search&&(
            <div style={{padding:"0 16px 14px"}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                {CATEGORIES.map(c=>{
                  const total=RECIPES.filter(r=>r.cat===c.id).length;
                  const done=store.cooked.filter(id=>RECIPES.find(r=>r.id===id&&r.cat===c.id)).length;
                  return(
                    <CatChip key={c.id} c={c} active={selCat===c.id} done={done} total={total}
                      onClick={()=>setSelCat(c.id)}/>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section label */}
          <div style={{padding:"0 16px 32px"}}>
            {!search&&(()=>{
              const cat=CATEGORIES.find(c=>c.id===selCat);
              return(
                <div style={{display:"flex",justifyContent:"space-between",
                  alignItems:"center",marginBottom:12}}>
                  <div>
                    <span style={{color:cat.color,fontWeight:800,fontSize:13}}>{cat.emoji} {cat.label}</span>
                    <span style={{color:"#4a6b4e",fontSize:11,marginLeft:6}}>{cat.desc}</span>
                  </div>
                  <span style={{color:"#4a6b4e",fontSize:11,
                    background:"#111c14",borderRadius:6,padding:"2px 8px",
                    border:"1px solid #1e2d1a"}}>{filtered.length}</span>
                </div>
              );
            })()}
            {search&&(
              <div style={{color:"#4a6b4e",fontSize:12,marginBottom:12,fontWeight:500}}>
                {filtered.length} resultado{filtered.length!==1?"s":""} para "<span style={{color:"#84cc16"}}>{search}</span>"
              </div>
            )}

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {filtered.map(r=>(
                <RecipeCard key={r.id} r={r} onClick={()=>setSelRec(r)} cooked={store.cooked}/>
              ))}
            </div>

            {filtered.length===0&&(
              <div style={{textAlign:"center",padding:"48px 0",color:"#4a6b4e"}}>
                <div style={{fontSize:36,marginBottom:10}}>🌿</div>
                <div style={{fontWeight:700,marginBottom:4}}>Sin resultados</div>
                <div style={{fontSize:13}}>Intenta otro término de búsqueda</div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── RETOS ──────────────────────────────────────────────────────────── */}
      {view==="retos"&&(
        <div style={{padding:"20px 16px"}}>
          <div style={{color:"#4a6b4e",fontSize:11,fontWeight:600,letterSpacing:"1px",
            textTransform:"uppercase",marginBottom:3}}>Esta semana</div>
          <h2 style={{color:"#e8f5e2",fontWeight:900,fontSize:24,margin:"0 0 18px",letterSpacing:"-0.5px"}}>
            ⚡ Retos <span style={{background:"linear-gradient(90deg,#84cc16,#22c55e)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Semanales</span>
          </h2>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {WEEKLY.map(w=>{
              const prog=store.cp[w.id]||0;
              const done=prog>=w.target;
              const pct=Math.min(100,Math.round((prog/w.target)*100));
              const cat=CATEGORIES.find(c=>c.id===w.cat);
              return(
                <div key={w.id}
                  style={{background:done?cat.color+"14":"#111c14",
                    border:`1.5px solid ${done?cat.color+"66":"#1e2d1a"}`,
                    borderRadius:14,padding:"14px 16px",
                    boxShadow:done?`0 0 16px ${cat.color}1a`:"none"}}>
                  <div style={{display:"flex",justifyContent:"space-between",
                    alignItems:"flex-start",marginBottom:10}}>
                    <div style={{flex:1,marginRight:12}}>
                      <div style={{color:done?cat.color:"#e8f5e2",fontWeight:700,
                        fontSize:14,marginBottom:2}}>{cat.emoji} {w.title}</div>
                      <div style={{color:"#4a6b4e",fontSize:12}}>{w.desc}</div>
                    </div>
                    <span style={{background:"#1a1000",color:"#fbbf24",border:"1px solid #78350f",
                      borderRadius:8,padding:"3px 10px",fontWeight:800,fontSize:12,whiteSpace:"nowrap"}}>
                      +{w.reward}pts
                    </span>
                  </div>
                  <div style={{background:"#0d1a0f",borderRadius:5,height:6,marginBottom:6,
                    overflow:"hidden"}}>
                    <div style={{background:done?`linear-gradient(90deg,${cat.color},${cat.color}cc)`:"#1e3a22",
                      height:6,borderRadius:5,width:`${pct}%`,transition:"width 0.6s ease"}}/>
                  </div>
                  <div style={{color:done?"#86efac":"#4a6b4e",fontSize:11,fontWeight:600}}>
                    {done?"✓ Completado":`${prog} / ${w.target} recetas — ${pct}%`}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Points summary */}
          <div style={{marginTop:20,background:"#111c14",borderRadius:16,padding:20,
            textAlign:"center",border:"1px solid #1e2d1a"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:10}}>
              <CircleProgress pct={globalPct} size={72} stroke={5} color="#84cc16"/>
            </div>
            <div style={{color:"#fbbf24",fontWeight:900,fontSize:36,lineHeight:1}}>{store.pts}</div>
            <div style={{color:"#4a6b4e",fontSize:13,marginTop:4}}>puntos totales acumulados</div>
            <div style={{marginTop:8,color:"#6b9e72",fontSize:12,fontWeight:600}}>
              {store.cooked.length} de 120 recetas completadas
            </div>
          </div>
        </div>
      )}

      {/* ── LOGROS ─────────────────────────────────────────────────────────── */}
      {view==="logros"&&(
        <div style={{padding:"20px 16px"}}>
          <div style={{color:"#4a6b4e",fontSize:11,fontWeight:600,letterSpacing:"1px",
            textTransform:"uppercase",marginBottom:3}}>Tu colección</div>
          <h2 style={{color:"#e8f5e2",fontWeight:900,fontSize:24,margin:"0 0 6px",letterSpacing:"-0.5px"}}>
            🏆 Mis <span style={{background:"linear-gradient(90deg,#84cc16,#22c55e)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Insignias</span>
          </h2>
          <p style={{color:"#4a6b4e",fontSize:13,margin:"0 0 20px"}}>
            Cocina todas las recetas de una categoría para desbloquear
          </p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {CATEGORIES.map(c=>{
              const earned=store.badges.includes(c.id);
              const total=RECIPES.filter(r=>r.cat===c.id).length;
              const done=store.cooked.filter(id=>RECIPES.find(r=>r.id===id&&r.cat===c.id)).length;
              const pct=Math.round((done/total)*100);
              return(
                <div key={c.id}
                  style={{background:earned?c.color+"18":"#111c14",
                    borderRadius:16,padding:"18px 14px",textAlign:"center",
                    border:`1.5px solid ${earned?c.color+"88":"#1e2d1a"}`,
                    boxShadow:earned?`0 0 20px ${c.color}22`:"none",
                    transition:"all 0.2s"}}>
                  <div style={{fontSize:38,marginBottom:8,
                    filter:earned?"none":"grayscale(1) opacity(0.4)"}}>{c.emoji}</div>
                  <div style={{color:earned?c.color:"#4a6b4e",fontWeight:800,
                    fontSize:11,marginBottom:2}}>{c.badge}</div>
                  <div style={{color:"#4a6b4e",fontSize:10,marginBottom:10}}>{done}/{total} recetas</div>

                  {/* mini progress */}
                  <div style={{background:"#0d1a0f",borderRadius:4,height:3,marginBottom:10,overflow:"hidden"}}>
                    <div style={{background:earned?c.color:"#1e3a22",height:3,
                      borderRadius:4,width:`${pct}%`,transition:"width 0.5s"}}/>
                  </div>

                  {earned
                    ?<span style={{background:c.color+"33",borderRadius:7,padding:"3px 10px",
                        color:c.color,fontSize:11,fontWeight:700,border:`1px solid ${c.color}44`}}>
                        ✓ Conseguida</span>
                    :<span style={{background:"#0d1a0f",borderRadius:7,padding:"3px 10px",
                        color:"#4a6b4e",fontSize:11,border:"1px solid #1e2d1a"}}>
                        🔒 Bloqueada</span>}
                </div>
              );
            })}
          </div>

          {/* Global stats */}
          <div style={{marginTop:16,background:"#111c14",borderRadius:14,padding:16,
            border:"1px solid #1e2d1a"}}>
            <div style={{color:"#4a6b4e",fontSize:11,fontWeight:700,
              textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:12}}>
              Progreso general
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {[["📖",store.cooked.length,"Cocinadas"],["🏅",store.badges.length,"Insignias"],["⭐",store.pts,"Puntos"]].map(([e,v,l])=>(
                <div key={l} style={{background:"#0b1410",borderRadius:10,padding:"14px 8px",
                  textAlign:"center",border:"1px solid #1e2d1a"}}>
                  <div style={{fontSize:20,marginBottom:4}}>{e}</div>
                  <div style={{color:"#e8f5e2",fontWeight:800,fontSize:20,lineHeight:1}}>{v}</div>
                  <div style={{color:"#4a6b4e",fontSize:10,marginTop:3}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL */}
      {selRec&&<RecipeModal recipe={selRec} onClose={()=>setSelRec(null)}
        onCook={handleCook} cooked={store.cooked}
        onViewRecipe={(r)=>{setSelRec(null);setChefRec(r);}}/>}

      {/* CHEF IA PAGE */}
      {chefRec&&<ChefPage recipe={chefRec} onClose={()=>setChefRec(null)} onCook={handleCook} cooked={store.cooked}/>}
    </div>
  );
}