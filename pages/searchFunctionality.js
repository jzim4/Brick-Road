import data from '../brickData.json'

export default function searchFunctionality() {
    let val = document.getElementById("fname").value;
    for (let i in data) {
        if (val == data[i].name) {
            return data[i];
        }
    }
    return {
        name: "none",
        message: "none",
        row: 50,
        col: 50
    };
}