import { Star } from 'react-bootstrap-icons';
import { StarFill } from 'react-bootstrap-icons';

const StarRating = ({selected, onSelect }) => {
    return (selected ? <StarFill onClick={onSelect} style={{color: "rgb(251, 173, 25)"}} /> : <Star onClick={onSelect} style={{color: "rgb(251, 173, 25)"}} />);
};

export default StarRating;