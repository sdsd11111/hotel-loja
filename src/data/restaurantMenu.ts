export interface Dish {
    name: string;
    slug: string;
    description: string;
    seoFocus?: string;
    ingredients?: string[];
    price?: number;
    category?: 'Entrada' | 'Principal' | 'Postre' | 'Bebida';
    image?: string;
}

export interface MenuCategory {
    id: string;
    title: string;
    subtitle: string;
    items: Dish[];
    isLink?: boolean;
    href?: string;
    image?: string;       // New field
    description?: string; // New field
}

export const restaurantMenuCategories: MenuCategory[] = [
    {
        id: "entradas-sopas",
        title: "Entradas & Sopas",
        subtitle: "Aperitivos Tradicionales",
        description: "Comience su experiencia con lo mejor de la tradición cuencana. Desde nuestro famoso Mote Pata hasta empanadas crujientes.",
        image: "/images/platos/placeholder_img_mote_pata.webp",
        items: [
            {
                name: "Sopa de Mote Pata Cuencana Tradicional",
                slug: "sopa-mote-pata-cuencana-tradicional",
                description: "La esencia de la gastronomía de Cuenca en un plato. Reconfortante sopa cremosa de mote andino, carne de cerdo desmechada y especias de la Sierra Sur. Un sabor auténtico de Ecuador.",
                seoFocus: "Plato Insignia Cuencano",
                ingredients: ["Mote", "Carne de Cerdo", "Leche y Crema", "Achiote", "Cebolla Paiteña"],
                price: 5.50,
                category: 'Entrada',
                image: "/images/platos/placeholder_img_mote_pata.webp"
            },
            {
                name: "Ceviche de Champiñones Frescos del Parque Nacional El Cajas",
                slug: "ceviche-champinones-frescos-del-cajas",
                description: "Una opción refrescante, ligera y saludable. Ceviche vegetariano con champiñones y palmito, marinados en jugo de limón y naranja. Servido con tostado y chifles crujientes, capturando el sabor de los Andes Azuayos.",
                seoFocus: "SEO Local (Conexión con el Parque Nacional El Cajas)",
                ingredients: ["Champiñones Frescos", "Palmito", "Jugo de Cítricos", "Cilantro", "Tostado y Chifles"],
                price: 7.95,
                category: 'Entrada',
                image: "/images/platos/placeholder_img_ceviche_cajas.webp"
            },
            {
                name: "Empanadas de Morochos Cuencanas con Ají de Casa",
                slug: "empanadas-morochos-cuencanas-aji-casa",
                description: "Fritura artesanal, crujiente por fuera y jugosa por dentro. Rellenas de una mezcla tradicional de carne de res y arroz, hechas con masa de morocho. El aperitivo más popular de Cuenca, servido con nuestro ají casero.",
                seoFocus: "Opción Rápida Tradicional",
                ingredients: ["Masa de Morocho", "Carne de Res", "Arroz", "Huevo duro", "Ají Casero"],
                price: 4.50,
                category: 'Entrada',
                image: "/images/platos/placeholder_img_empanadas_morochos.webp"
            },
            {
                name: "Tamal Lojano Auténtico Envuelto en Hoja de Achira",
                slug: "tamal-lojano-envuelto-hoja-achira",
                description: "Un clásico del sur andino con historia. Masa de maíz envuelta y cocida al vapor en hoja de achira, rellena de carne de cerdo/pollo, pasas y huevo. Traemos este sabor ancestral de Loja a Cuenca para una experiencia regional completa.",
                seoFocus: "Opción Regional (Sur)",
                ingredients: ["Masa de Maíz", "Carne de Cerdo/Pollo", "Huevo", "Pasas", "Hoja de Achira"],
                price: 6.25,
                category: 'Entrada',
                image: "/images/platos/placeholder_img_tamal_lojano.webp"
            }
        ]
    },
    {
        id: "mar-rio",
        title: "Del Mar & Río",
        subtitle: "Fusión de Altura",
        description: "Sabores frescos que conectan la costa con la sierra. Trucha local, salmón y mariscos preparados con técnicas de autor.",
        image: "/images/platos/placeholder_img_trucha_frita.webp",
        items: [
            {
                name: "Trucha Frita Crujiente del Río Tomebamba y Patacones",
                slug: "trucha-frita-crujiente-del-rio-tomebamba-patacones",
                description: "Capturamos la frescura de los ríos andinos. Trucha entera, ligeramente frita hasta un punto crujiente, que mantiene su jugosidad. Servida con nuestra salsa tártara de hierbas locales y patacones. Sabor tradicional del Parque Nacional El Cajas a su mesa.",
                seoFocus: "SEO Local (Plato típico en la ruta del Cajas)",
                ingredients: ["Trucha Fresca", "Patacones", "Ajo", "Limón", "Salsa Tártara Casera"],
                price: 12.95,
                category: 'Principal',
                image: "/images/platos/placeholder_img_trucha_frita.webp"
            },
            {
                name: "Salmón Sellado en Salsa de Maracuyá Andina",
                slug: "salmon-sellado-salsa-maracuya-andina",
                description: "Una Fusión de Altura entre el Pacífico y los Andes. Filete de salmón sellado a la perfección, bañado en nuestra exclusiva salsa agridulce de maracuyá y miel de abeja. Acompañado de un puré suave de papa. Una delicia ligera e inolvidable en Cuenca.",
                seoFocus: "Fusión de Altura",
                ingredients: ["Salmón Fresco", "Maracuyá", "Miel de Abeja", "Puré de Papa", "Hierbas Finas"],
                price: 18.50,
                category: 'Principal',
                image: "/images/platos/placeholder_img_salmon_maracuya.webp"
            },
            {
                name: "Camarones Jugosos al Horno con Mantequilla de Ajo y Cítricos",
                slug: "camarones-jugosos-horno-mantequilla-ajo-citricos",
                description: "Un plato aromático que despierta los sentidos. Camarones grandes y jugosos, horneados con una mantequilla de ajo y un blend de hierbas frescas, con un toque final de limón para resaltar su sabor. Ideal como entrada compartida o plato ligero.",
                seoFocus: "Opción Ligera y Aromática",
                ingredients: ["Camarones", "Mantequilla de Ajo", "Limón", "Perejil", "Pimienta Negra"],
                price: 14.75,
                category: 'Entrada',
                image: "/images/platos/placeholder_img_camarones_horno.webp"
            }
        ]
    },
    {
        id: "de-la-tierra",
        title: "De la Tierra",
        subtitle: "Especialidades de la Sierra Sur",
        description: "Platos fuertes que honran la tierra. Desde el clásico Hornado Cuencano hasta cortes de carne premium a la parrilla.",
        image: "/images/platos/placeholder_img_hornado_cuencano.webp",
        items: [
            {
                name: "Hornado de Cerdo Ecuatoriano con Cuero Crujiente",
                slug: "hornado-cerdo-ecuatoriano-cuero-crujiente",
                description: "La especialidad más icónica de Cuenca. Pierna de cerdo seleccionada, adobada y horneada durante horas para lograr una carne jugosa y tierna, con el cuero perfectamente crujiente. Servido con mote, llapingacho y agrio de cebolla. Un verdadero plato fuerte de la tradición.",
                seoFocus: "Plato Fuerte Cuencano",
                ingredients: ["Pierna de Cerdo", "Mote", "Llapingacho", "Agrio de Cebolla", "Especias Andinas"],
                price: 16.95,
                category: 'Principal',
                image: "/images/platos/placeholder_img_hornado_cuencano.webp"
            },
            {
                name: "Lomo Fino a la Parrilla con Salsa Cremosa de Queso Azul Azuayo",
                slug: "lomo-fino-parrilla-salsa-cremosa-queso-azul-azuayo",
                description: "Una opción Gourmet y de impacto. Medallón de lomo de res Premium cocido al punto, bañado en una rica salsa de queso azul producido artesanalmente en la sierra. Acompañado de espárragos frescos y papas rústicas. Un maridaje perfecto de los Andes Azuayos.",
                seoFocus: "Plato Premium",
                ingredients: ["Lomo de Res", "Queso Azul Artesanal", "Crema de Leche", "Espárragos", "Papas Rústicas"],
                price: 21.50,
                category: 'Principal',
                image: "/images/platos/placeholder_img_lomo_fino_queso.webp"
            },
            {
                name: "Seco de Gallina Criolla de la Abuela con Arroz Amarillo",
                slug: "seco-gallina-criolla-abuela-arroz-amarillo",
                description: "El sabor de hogar que define la cocina ecuatoriana. Gallina criolla cocida a fuego lento en un estofado espeso con cerveza, tomate, especias y un toque de naranja. Servido con arroz amarillo y maduros fritos. Un plato reconfortante, ideal para el clima de Cuenca.",
                seoFocus: "Conexión Local",
                ingredients: ["Gallina Criolla", "Cerveza Rubia", "Naranja", "Arroz Amarillo", "Maduros Fritos"],
                price: 13.95,
                category: 'Principal',
                image: "/images/platos/placeholder_img_seco_gallina.webp"
            },
            {
                name: "Parrillada Mixta Andina (Lomo, Pollo y Chorizo Artesanal)",
                slug: "parrillada-mixta-andina-lomo-pollo-chorizo",
                description: "La mejor selección de carnes para compartir. Incluye cortes de lomo, pechuga de pollo marinada y chorizo artesanal de la sierra. Servido con papas asadas y salsa chimichurri de la casa. El punto de encuentro de los sabores de la Sierra del Ecuador.",
                seoFocus: "Opción Clásica",
                ingredients: ["Lomo de Res", "Pechuga de Pollo", "Chorizo Artesanal", "Papas Asadas", "Chimichurri"],
                price: 25.00,
                category: 'Principal',
                image: "/images/platos/placeholder_img_parrillada_andina.webp"
            }
        ]
    },
    {
        id: "vegetariano-andino",
        title: "Vegetariano & Andino",
        subtitle: "Platos Basados en Plantas",
        description: "Opciones saludables y llenas de sabor que celebran los productos de nuestra huerta andina. Locros, quinua y más.",
        image: "/images/platos/placeholder_img_locro_papas.webp",
        items: [
            {
                name: "Locro de Papas con Queso y Aguacate (Plato de la Sierra Sur)",
                slug: "locro-papas-queso-aguacate-sierra-sur",
                description: "El clásico cuencano en su versión más reconfortante. Sopa espesa de papas nativas de los Andes Azuayos, enriquecida con queso fresco y un toque de achiote. Se sirve con aguacate maduro y chochos. Un plato vegetariano que calienta el alma.",
                seoFocus: "Opción Vegetariana Clásica",
                ingredients: ["Papas Andinas", "Queso Fresco", "Aguacate", "Achiote", "Crema de Leche (Opcional: Vegana)"],
                price: 7.50,
                category: 'Entrada',
                image: "/images/platos/placeholder_img_locro_papas.webp"
            },
            {
                name: "Quinoa Risotto Cremoso con Vegetales Rostizados del Huerto",
                slug: "quinoa-risotto-cremoso-vegetales-rostizados",
                description: "Una alternativa nutritiva y vegana (se puede adaptar). La súper semilla andina (Quinoa) preparada al estilo risotto, con una textura cremosa. Acompañado de zapallo, espárragos y pimiento rostizados con aceite de oliva. Un plato fuerte de base vegetal, perfecto para una cena ligera en Cuenca.",
                seoFocus: "Opción Saludable/Tendencia",
                ingredients: ["Quinoa", "Zapallo", "Espárragos", "Pimiento", "Aceite de Oliva", "Caldo Vegetal"],
                price: 11.95,
                category: 'Principal',
                image: "/images/platos/placeholder_img_quinoa_risotto.webp"
            },
            {
                name: "Tacos Vegetarianos de Portobello Adobado y Guacamole",
                slug: "tacos-vegetarianos-portobello-adobado-guacamole",
                description: "Fusión moderna y sabrosa. Champiñones Portobello marinados en especias, asados a la parrilla y servidos en tortillas de maíz suave. Coronados con nuestro guacamole fresco de aguacates de la zona y cilantro. Una opción vegana de baja fricción y alto impacto visual.",
                seoFocus: "Plato de Acompañamiento Fuerte",
                ingredients: ["Champiñones Portobello", "Tortillas de Maíz", "Guacamole", "Adobo Seco", "Cebolla y Cilantro"],
                price: 10.50,
                category: 'Entrada',
                image: "/images/platos/placeholder_img_tacos_portobello.webp"
            }
        ]
    },
    {
        id: "postres-cuencanos",
        title: "Postres Cuencanos",
        subtitle: "Dulces Históricos",
        description: "El toque dulce final. Postres históricos como la Espumilla y dulces de leche que evocan la nostalgia cuencana.",
        image: "/images/platos/placeholder_img_espumilla.webp",
        items: [
            {
                name: "Espumilla de Guayaba y Canela Típica Cuencana",
                slug: "espumilla-guayaba-canela-tipica-cuencana",
                description: "Un postre de la calle Larga, directamente a su mesa. Merengue suave y ligero con pulpa natural de guayaba, que ofrece una textura aireada y un sabor agridulce. Espolvoreado con canela. Un dulce clásico cuencano que no puede faltar.",
                seoFocus: "Postre Típico Cuencano",
                ingredients: ["Pulpa de Guayaba", "Claras de Huevo", "Azúcar", "Canela", "Galleta Molida"],
                price: 4.95,
                category: 'Postre',
                image: "/images/platos/placeholder_img_espumilla.webp"
            },
            {
                name: "Queso de Leche con Miel de Panela Orgánica",
                slug: "queso-leche-miel-panela-organica",
                description: "El cierre perfecto: sencillo, dulce y auténtico. Porción de queso fresco de leche, de textura suave, bañado generosamente con nuestra miel de panela artesanal. Un postre tradicional de la Sierra del Ecuador que honra la pureza de los ingredientes.",
                seoFocus: "Cierre Clásico",
                ingredients: ["Queso de Leche Fresco", "Panela (Endulzante Natural)", "Agua", "Canela"],
                price: 5.25,
                category: 'Postre',
                image: "/images/platos/placeholder_img_queso_panela.webp"
            },
            {
                name: "Helado de Paila Artesanal de Frutas Andinas (Mora o Taxo)",
                slug: "helado-paila-artesanal-frutas-andinas",
                description: "Una experiencia interactiva de sabor. Sorbete artesanal preparado a la paila (método ancestral con hielo y sal), con el sabor intenso de frutas frescas andinas (mora o taxo, según temporada). Un deleite refrescante y natural, con cero grasa.",
                seoFocus: "Experiencia Artesanal",
                ingredients: ["Fruta de Temporada (Mora/Taxo)", "Agua", "Azúcar", "Hielo y Sal (Método de Paila)"],
                price: 5.95,
                category: 'Postre',
                image: "/images/platos/placeholder_img_helado_paila.webp"
            }
        ]
    },
    {
        id: "bebidas-licores",
        title: "Bebidas y Licores Artesanales",
        subtitle: "Café y Tradición",
        description: "Descubra nuestra selección de cafés de altura, coctelería de autor y licores tradicionales como el Zhumir.",
        image: "/images/platos/placeholder_img_cafe_prensa.webp",
        isLink: true,
        href: "/servicios/restaurante/bebidas",
        items: [
            {
                name: "Café de Origen de Altura Ecuatoriano (Método de Prensa Francesa)",
                slug: "cafe-origen-altura-ecuatoriano",
                description: "Un tributo a la excelencia cafetera del sur. Granos arábigos de alta calidad, cultivados en zonas cercanas a Cuenca (Vilcabamba o Saraguro). Servido en prensa francesa para asegurar la máxima extracción de sabor y aroma. El final perfecto para cualquier comida.",
                seoFocus: "Bebida Premium / Regional",
                ingredients: ["Café de Grano Entero", "Agua Caliente Filtrada", "Leche (Opcional)"],
                price: 3.50,
                category: 'Bebida',
                image: "/images/platos/placeholder_img_cafe_prensa.webp"
            },
            {
                name: "Licor Zhumir (Aguardiente de Caña Artesanal)",
                slug: "licor-zhumir-aguardiente-cana",
                description: "El licor emblemático de la provincia de Azuay. Aguardiente de caña de azúcar producido en la región, perfecto para disfrutar solo como digestivo o como base para cócteles tradicionales. Una bebida cultural que celebra la tradición licorera de Cuenca.",
                seoFocus: "Bebida Cultural Local",
                ingredients: ["Aguardiente de Caña Zhumir", "Hielo", "Limón (Opcional)"],
                price: 5.00,
                category: 'Bebida',
                image: "/images/platos/placeholder_img_zhumir.webp"
            },
            {
                name: "Rompope Tradicional Cuencano (Bebida Dulce de Noche)",
                slug: "rompope-tradicional-cuencano",
                description: "Una bebida cremosa con historia. El Rompope es una emulsión de leche, yemas de huevo, azúcar y licor, infusionada con canela y clavo. Ideal para acompañar el postre o como bebida reconfortante para el clima frío de Cuenca al final del día.",
                seoFocus: "Bebida Cultural",
                ingredients: ["Leche", "Yemas de Huevo", "Licor Suave", "Canela", "Clavo"],
                price: 4.75,
                category: 'Bebida',
                image: "/images/platos/placeholder_img_rompope.webp"
            }
        ]
    }
];

export const getDishBySlug = (slug: string): Dish | undefined => {
    for (const category of restaurantMenuCategories) {
        const dish = category.items.find(item => item.slug === slug);
        if (dish) return dish;
    }
    return undefined;
};
