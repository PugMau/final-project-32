const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
				
			],
			category: JSON.parse(localStorage.getItem("category")) || [],
			product: JSON.parse(localStorage.getItem("product")) || [],
			user: JSON.parse(localStorage.getItem("user")) || [],
            kart: JSON.parse(localStorage.getItem("kart")) || []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			getAllCategories: async () => {
				const store = getStore();
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/category`);
					let data = await response.json();
					console.log(data);
			
					setStore({
						category: data
					});
			
					localStorage.setItem("category", JSON.stringify(data));
				} catch (error) {
					console.log(error);
				}
			},

			getAllProducts: async () => {
				const store = getStore();
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/product`);
					let data = await response.json();

					console.log(data);
			
					setStore({
						product: data
					});
			
					localStorage.setItem("product", JSON.stringify(data));
				} catch (error) {
					console.log(error);
				}
			},

			getAllUsers: async () => {
				const store = getStore();
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/user`);
					let data = await response.json();
					
			
					setStore({
						user: data
					});
			
					localStorage.setItem("user", JSON.stringify(data));
				} catch (error) {
					console.log(error);
				}
			},

			addProduct: async (product) => {
                try {
                    const response = await fetch( `${process.env.BACKEND_URL}/api/product`, {
                        method: 'POST',
                        // headers: {
                        //     'Content-Type': 'application/json'
                        // },
                        body: product
                    });

                    if (response.ok) {
                        const data = await response.json();
                        return data;
                    } else {
                        console.error('Error al agregar el producto');
                        return null;
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    return null;
                }
            },


			deleteProduct: async (id) => {
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/product/${id}`, {
						method: "DELETE"
					})

					if (response.ok) {
						getActions().getAllProducts()
						return true
					}

				} catch (error) {
					console.log(error)
				}
			},

			putProduct: async (product, id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/product/${id}`, {
						method: "PUT",
						body: product
					});
			
					if (response.ok) {
						getActions().getAllProducts();
						return true;
					} else {
						console.log("Error al actualizar producto");
						return false;
					}
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			searchProduct: (query) => {
                const store = getStore();
                let searchResult = store.product.filter((item) =>
                    item.generic_name.toLowerCase().includes(query.toLowerCase()) ||
                    item.active_ingredient.toLowerCase().includes(query.toLowerCase()) ||
                    item.category_id.toString().includes(query)
                );
                setStore({ search: searchResult });		
			},

			addToKart: (product) => {
                const store = getStore();
                const existingProduct = store.kart.find(item => item.product_id === product.product_id);

                if (existingProduct) {
                    const updatedKart = store.kart.map(item => {
                        if (item.product_id === product.product_id) {
                            return { ...item, quantity: item.quantity + 1 };
                        }
                        return item;
                    });
                    setStore({ kart: updatedKart });
                    localStorage.setItem("kart", JSON.stringify(updatedKart));
                } else {
                    const updatedKart = [...store.kart, { ...product, quantity: 1 }];
                    setStore({ kart: updatedKart });
                    localStorage.setItem("kart", JSON.stringify(updatedKart));
                }
            },
            updateKartQuantity: (productId, quantity) => {
                const store = getStore();
                const updatedKart = store.kart.map(item => {
                    if (item.product_id === productId) {
                        return { ...item, quantity: quantity };
                    }
                    return item;
                });
                setStore({ kart: updatedKart });
                localStorage.setItem("kart", JSON.stringify(updatedKart));
            },
            removeFromKart: (productId) => {
                const store = getStore();
                const updatedKart = store.kart.filter(product => product.product_id !== productId);
                setStore({ kart: updatedKart });
                localStorage.setItem("kart", JSON.stringify(updatedKart));
            },
		}
	};
};

export default getState;