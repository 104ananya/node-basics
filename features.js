const name1 = "random1";
const name2 = "random2";
const name3 = "random3";

export default name1;
export {name2, name3};

export const lovePercent = () => {
    return `${Math.floor(Math.random() * 100)}%`; 
}
