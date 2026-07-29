import { useState } from "react"

const MovieForm = () => {
    const[title, setTitle] = useState("");
    const[titleError, setTitleError] = useState("");

    const handleTitle = (e) => {
        setTitle(e.target.value);
        if(e.target.value.length < 1) {
            setTitleError("Title is required!");
        }else if(e.target.value.length <3) {
            setTitleError("Title must be 3 characters or longer!");
        }else{
            setTitleError("");
        }
    }

    return (
        <form onSubmit={(e)=> e.preventDefault()}>
            <div>
                <label>Title:</label>
                <input type="text" onChange={handleTitle} />
                {
                    titleError ?
                    <p>{titleError}</p>:
                    ''
                }
            </div>
            {
                titleError ?
                <input type="submit" value="Create Movie" disabled />:
                <input type="submit" value="Create Movie" />
            }
        </form>
    );
}

const nums = [1,2,3,4,5];
const newNums =[];

for(let i=0; i<nums.length; i++) {
    newNums.push(nums[i] *2);
}
console.log(newNums);

const nums = [1,2,3,4,5];

function double(num) {
    return num *2;
}
const newNums = nums.map(double);
console.log(newNums);

const Groceries = (props) => {
    const groceryList = ["pearl onions", "thyme", "cremini mushrooms", "butter"];
        return (
            <ul>
                {groceryList.map((item, i)=>
                <li key={i}>{item}</li>}
            </ul>
        );
}
export default Groceries

