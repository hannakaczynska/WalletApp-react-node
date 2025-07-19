import css from './list.module.css';

const List = ({ data, onItemClick }) => {
    const handleItemClick = (item) => {
        if (onItemClick) {
            onItemClick(item);
        }
    };

    return (
        <ul className={css.list}>
            {data.map((item, index) => (
                <li 
                    key={index} 
                    className={css.listItem}
                    onClick={() => handleItemClick(item)}
                >
                    {item}
                </li>
            ))}
        </ul>
    )
}

export default List;