import axios from "axios"
import { useEffect, useState } from 'react'

const EmployeeList = () => {
    const [employees, setEmployeeList] = useState();
    let employeesList = [];
    const fetchEmployeeList = async () => {
        return await axios.get("http://localhost:9002/employee");
    }

    const handleClick = async () => {
        console.log('click on the button ')
        employeesList = await fetchEmployeeList();
        setEmployeeList(employeesList.data);
    }
   
    useEffect(() => {
        handleClick();
    }, [])
    return (
        <div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Department</th>
                </tr>
                {employees?.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.age}</td>
                            <td>{val.department}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}
export default EmployeeList