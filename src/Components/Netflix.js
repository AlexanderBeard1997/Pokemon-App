import winx from "../images/Winx.webp"

const Netflix = () => {
    return(
        <div>
            <Card img={winx} />
        </div>
    );
};

const Card = ({img}) => {
    return <img src={img} alt=""/>;
};

export default Netflix;