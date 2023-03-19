import React from "react";
import ContentLoader from "react-content-loader";
import styles from './Card.module.scss';
import AppContext from "../../context";


function Card({
                  id,
                  title,
                  imageUrl,
                  price,
                  onFavorite,
                  onPlus,
                  favorited = false,
                  loading = false
}) {
    const { isItemAdded } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const obj = { id, parentId: id, title, imageUrl, price };



    const onClickPlus = () =>{
        onPlus(obj);
    };

    const onClickFavorite = () =>{
        onFavorite(obj);
        setIsFavorite(!isFavorite);
    }

    return(
        <div className={styles.card}>
            {loading ? (
                    <ContentLoader
                        speed={2}
                        width={150}
                        height={210}
                        viewBox="0 0 150 210"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb">
                        <rect x="94" y="78" rx="0" ry="0" width="1" height="1"/>
                        <rect x="559" y="149" rx="0" ry="0" width="81" height="38"/>
                        <rect x="579" y="110" rx="0" ry="0" width="275" height="132"/>
                        <rect x="0" y="0" rx="20" ry="20" width="150" height="90"/>
                        <rect x="0" y="105" rx="5" ry="5" width="150" height="15"/>
                        <rect x="0" y="130" rx="5" ry="5" width="100" height="15"/>
                        <rect x="118" y="166" rx="10" ry="10" width="32" height="32"/>
                        <rect x="0" y="171" rx="5" ry="5" width="80" height="25"/>
                    </ContentLoader>
                ) :
                (<>
                    {onFavorite && (<div className={styles.favorite} onClick={onClickFavorite}>
                        <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="Unliked"/>
                    </div>)
                    }                    <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column ">
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                        </div>

                        {onPlus && (<img className={styles.plus}
                              onClick={onClickPlus}
                              src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                              alt="Plus"/>)}

                    </div>
                </>)}
        </div>
    );
}
export default Card;