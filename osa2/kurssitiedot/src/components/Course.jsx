import Content from './Content'
import Header from './Header'


const Course = (props) => {
    const { course} = props

    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            
        </div>
    )
}

export default Course