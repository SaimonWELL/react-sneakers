import React from 'react';
import axios from "axios";

import styles from "./Drawer.module.scss";

import Info from "../Card/info";
import {useCart} from "../../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Index({onClose, onRemove, items = [], opened}){
    const { cartItems, setCartItems, totalPrice } = useCart();
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);


    const onClickOrder = async () =>{
        try {
            setIsLoading(false);
            const {data} = await axios.post('https://62e389773c89b95396ca6b3e.mockapi.io/orders', {items: cartItems});
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://62e389773c89b95396ca6b3e.mockapi.io/cart/' + item.id);
                await delay(1000);
            }

        } catch (error){
            alert("Не удалось создать заказ!");
        }
        setIsLoading(true);
    };

    return(
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''} `} >
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30 ">
                    Корзина <img className="removeBtn cu-p" src="/img/btn-remove.svg" onClick={onClose} alt="Close"/>
                </h2>

                {
                    items.length > 0 ? (<div className="d-flex flex-column flex" style={{overflow:"auto"}}>
                            <div className="items" style={{flex:1}}>
                            {
                                items.map((obj) =>(
                                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                        <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg">

                                        </div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img
                                            onClick={() => {onRemove(obj.id)}}
                                            className="removeBtn" src="/img/btn-remove.svg"
                                            alt=""
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="cartTotalBlock">
                                <ul>
                                    <li>
                                        <span>Итого: </span>
                                        <div></div>
                                        <b>{totalPrice} руб. </b>
                                    </li>
                                    <li>
                                        <span>Налог 5%: </span>
                                        <div></div>
                                        <b>{Math.floor((totalPrice/100)*5)} руб. </b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/></button>
                            </div></div>
                    ) : ( <Info
                            title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
                            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавтье хотя бы одну пару кросовок, чтобы сделать заказ."}
                            image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                            />

                    )}


            </div>
        </div>
    )
}
export default Index;