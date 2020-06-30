import React, { Component } from "react";
import moment from "moment";
import MainContainer from "./MainContainer.js";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    fetch("https://web422-teams-api-han.herokuapp.com/projects")
      .then(response => response.json())
      .then(data =>
        this.setState({
          projects: data
        })
      )
      .catch(err => console.log("fetch error: " + err));
  }

  render() {
    return (
      <MainContainer sidebar="Projects">
        <h1 className="page-header">Projects</h1>

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.projects.map((project, index) => {
              let endDate = "";
              if (project.ProjectEndDate == null) endDate = "n/a";
              else
                endDate = moment(project.ProjectEndDate)
                  .utc()
                  .format("LL");

              let startDate = moment(project.ProjectStartDate)
                .utc()
                .format("LL");

              return (
                <tr key={index}>
                  <td>{project.ProjectName}</td>
                  <td>{project.ProjectDescription}</td>
                  <td>{startDate}</td>
                  <td>{endDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </MainContainer>
    );
  }
}

export default Projects;
