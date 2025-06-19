import React from "react";

export default function Search({ allMeals, setFilteredMeals }) {
    const [item, setItem] = React.useState("");

    React.useEffect(() => {
        if (!item) {
            setFilteredMeals(allMeals);
        } else {
            const filtered = allMeals.filter(meal =>
                meal.strMeal.toLowerCase().includes(item.toLowerCase())
            );
            setFilteredMeals(filtered);
        }
    }, [item, allMeals]);

    return (
        <input type="text"
        placeholder="Search the food you want"
        value={item}
        onChange={(event)=>{
           setItem(event.target.value);
        }}
        className="rounded-xl w-[80%] mx-auto block mb-6 px-4 py-2 border border-gray-300"
        />
    );
}