const Total = ({ parts }) => {
    const totalExercises = parts.reduce((total, part) => total + part.exercises, 0)

    return (
        <div>
            <strong>total of {totalExercises} exercises</strong>     
        </div>
    )
}

export default Total