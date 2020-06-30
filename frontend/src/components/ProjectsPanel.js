import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

class ProjectsPanel extends Component {
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
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            <b>Projects</b>
          </h3>
        </div>
        <div className="panel-body">
          <div className="table-responsive overview-table">
            <table className="table table-striped table-bordered">
              <tbody>
                {this.state.projects.map((project, index) => {
                  let activeDate = moment().diff(
                    moment(project.ProjectStartDate),
                    "days"
                  );

                  return (
                    <tr key={index}>
                      <td>{project.ProjectName}</td>
                      <td>Active {activeDate} Days</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Link to="/projects" className="btn btn-primary form-control">
            View All Project Data
          </Link>
        </div>
      </div>
    );
  }
}

export default ProjectsPanel;
