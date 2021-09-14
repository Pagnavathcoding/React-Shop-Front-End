import React from 'react';
import { useEffect, useState, Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
// Products
import "./index.css";
import bike from './Products/Bike.jpg';
import camera from './Products/Camera.jpg';
import cocacola from './Products/CocaCola.jpg';
import glass from './Products/Glass.jpg';
import headphone from './Products/HeadPhone.jpg';
import jbl from './Products/JBL.jpg';
import keyboard from './Products/KeyBoard.jpg';
import nike from './Products/Nike.jpg';
import watch from './Products/Watch.jpg';
// Icons
import bag from './Icons/bag.svg';
import add from './Icons/add.svg';
import arrowright from './Icons/arrow-right.svg';
import bin from './Icons/bin.svg';
import close from './Icons/close.svg';
function local() {
    const stored = localStorage.getItem("cart");
    if (stored) {
        return JSON.parse(localStorage.getItem("cart"));
    }
    else {
        return []
    }
}
function App() {
    const [data, setData] = useState([
        {
            id: 1,
            product: "Bike",
            price: 750,
            image: bike
        },
        {
            id: 2,
            product: "Camera",
            price: 500,
            image: camera
        },
        {
            id: 3,
            product: "Coca Cola",
            price: 5,
            image: cocacola
        },
        {
            id: 4,
            product: "Glass",
            price: 50,
            image: glass
        },
        {
            id: 5,
            product: "Head Phone",
            price: 350,
            image: headphone
        },
        {
            id: 6,
            product: "JBL",
            price: 200,
            image: jbl
        },
        {
            id: 7,
            product: "Key Board",
            price: 120,
            image: keyboard
        },
        {
            id: 8,
            product: "Nike",
            price: 180,
            image: nike
        },
        {
            id: 9,
            product: "Watch",
            price: 340,
            image: watch
        },
    ]);
    const [cart, setCart] = useState(local());
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    function addToBag(id) {
        const add = data.filter((data) => {
            return data.id === id;
        });
        setCart(cart.map((data) => {
            return data.id === id ? { ...cart, id: Math.random() } : cart;
        }));
        setCart(cart.concat(add));
    }
    const [toggle, setToggle] = useState(false);
    function removeProduct(id) {
        const infos = cart.filter((data) => {
            return data.id !== id;
        })
        setCart(infos);
    }
    function total() {
        const data = cart;
        let arr = []
        for (let index = 0; index < data.length; index++) {
            arr.push(data[index].price);
        }
        if (arr.length > 0) {
            return arr.reduce((data, index) => {
                return data + index;
            }).toLocaleString();
        } else {
            return;
        }
    }
    return (
        <section>
            <header>
                <h1 className="logo" style={{ cursor: "pointer" }}>React Shop</h1>
                <div className="menu" className="cart" onClick={() => setToggle(!toggle)}>
                    <img src={bag} alt="bag" />
                    <p>{cart.length}</p>
                </div>
            </header>
            <div className={toggle ? "added show" : "added"}>
                <div className="close" onClick={() => setToggle(!toggle)}>
                    <img src={close} alt="close" />
                </div>
                <div className="title">
                    <h1>Rect Shop</h1>
                    <p>In your bag ({cart.length} {cart.length <= 1 ? "item" : "items"}).</p>
                </div>
                <div className="none" style={{ display: cart.length > 0 ? "none" : "flex" }}>
                    <p>{cart.length === 0 ? "Empty item in your bag!" : ""}</p>
                </div>
                <div className="remove-all" style={{ display: cart.length > 0 ? "flex" : "none" }}>
                    <button onClick={() => setCart([])}>Remove All</button>
                </div>
                <div className="bag">
                    {
                        cart.map((data) => {
                            return (
                                <div className="bag-item">
                                    <div className="images">
                                        <img src={data.image} alt={data.product} height="100px" style={{ borderRadius: "5px" }} />
                                    </div>
                                    <div className="name">
                                        <h1>Product</h1>
                                        <p>{data.product}</p>
                                    </div>
                                    <div className="price">
                                        <h1>Price</h1>
                                        <p>${data.price}</p>
                                    </div>
                                    <div className="delete" onClick={() => {
                                        removeProduct(data.id);
                                    }}>
                                        <button>Remove <img src={bin} alt="bin" /></button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="check" style={{ display: cart.length > 0 ? "flex" : "none" }}>
                    <div className="total">
                        <h1>Total:</h1>
                        <p>${total()}</p>
                    </div>
                    <button onClick={() => {
                        alert("Check out successfully! Thank you.");
                        setCart([]);
                    }}>Check Out <img src={arrowright} alt="check" /></button>
                </div>
            </div>
            <div className="greeting">
                <h1>Welcome to our Products!</h1>
                <p>Great products and services. Order now!</p>
            </div>
            <section className="container">
                {
                    data.map((data) => {
                        return (
                            <div key={data.id} className="item">
                                <div className="items" style={{ width: "100%", height: "40vh", backgroundImage: `url('${data.image}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}></div>
                                <div className="infos">
                                    <h1>Product: {data.product}</h1>
                                    <p>Price: ${data.price}</p>
                                    <button onClick={() => {
                                        addToBag(data.id)
                                    }}>Add to bag <img src={add} /></button>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
            <footer>
                <p>&copy; 2021 React Shop, made by <a href="mailto:pagnavathcoding@gmail.com">Pagnavath</a>.</p>
            </footer>
        </section>
    )
}
export default App;