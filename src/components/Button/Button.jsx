import { ButtonLoadMore } from "./Button.styled";

const Button = ({ countPage }) => {
    return <ButtonLoadMore onClick={countPage}>Load more</ButtonLoadMore>;
}

export {Button}