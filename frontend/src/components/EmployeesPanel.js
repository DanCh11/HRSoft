import React, { Component } from "react";
import { Link } from "react-router-dom";

class EmployeesPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
  }

  componentDidMount() {
    fetch("https://web422-teams-api-han.herokuapp.com/employees")
      .then(response => response.json())
      .then(data =>
        this.setState({
          employees: data
        })
      )
      .catch(err => console.log("fetch error: " + err));
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            <b>Employees</b>
          </h3>
        </div>
        <div className="panel-body">
          <div className="table-responsive overview-table">
            <table className="table table-striped table-bordered">
              <tbody>
                {this.state.employees.map((element, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {element.FirstName} {element.LastName}
                      </td>
                      <td>{element.Position.PositionName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Link to="/employees" className="btn btn-primary form-control">
            View All Employee Data
          </Link>
        </div>
      </div>
    );
  }
}

export default EmployeesPanel;
