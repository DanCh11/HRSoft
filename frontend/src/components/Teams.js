import React, { Component } from "react";
import MainContainer from "./MainContainer.js";

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
  }

  componentDidMount() {
    fetch("https://web422-teams-api-han.herokuapp.com/teams")
      .then(response => response.json())
      .then(data =>
        this.setState({
          teams: data
        })
      )
      .catch(err => console.log("fetch error: " + err));
  }

  componentWillUnmount() {}
  render() {
    return (
      <div>
        <MainContainer sidebar="Teams">
          <h1 className="page-header">Teams</h1>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Projects</th>
                <th>Employees</th>
                <th>Team Lead</th>
              </tr>
            </thead>
            <tbody>
              {this.state.teams.map((team, index) => {
                return (
                  <tr key={index}>
                    <td>{team.TeamName}</td>
                    <td>
                      {team.Projects.map((project, index) => {
                        return <li key={index}>{project.ProjectName}</li>;
                      })}
                    </td>
                    <td>{team.Employees.length} Employees</td>
                    <td>
                      {team.TeamLead.FirstName} {team.TeamLead.LastName}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </MainContainer>
      </div>
    );
  }
}

export default Teams;
