export const getPurchaseHistoryFromDB = (userId: string) => {
    
    return {
        id: userId,
        purchaseHistory: [
            {
                id: 1,
                item: "Caipirinha de Uva",
                saleDate: new Date(),
                price: 25.50,
                quantity: 1
            }, {
                id: 2,
                item: "Cerveja Heineken",
                saleDate: new Date(),
                price: 45.50,
                quantity: 3
            }, {
                id: 3,
                item: "Gin Tônica",
                saleDate: new Date(),
                price: 54.50,
                quantity: 2
            }, {
                id: 4,
                item: "Porção de fritas",
                saleDate: new Date(),
                price: 29.50,
                quantity: 1
            },
        ]
    };
};
