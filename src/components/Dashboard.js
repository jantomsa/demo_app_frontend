import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import { getVoteResults, getUserVote } from "../actions/voteActions";
import PropTypes from "prop-types";
import VoteItem from "./Vote/VoteItem";

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      userClickedOnVoteButton: false
    }
    this.blockButtons = this.blockButtons.bind(this);
  }

  componentDidMount() {
    this.props.getProjects();
    this.props.getVoteResults();
    this.props.getUserVote();
  }

  blockButtons(){
    this.setState({userClickedOnVoteButton: true})
  }

  render() {
    
    const { projects } = this.props.project;
    const { votes } = this.props.vote;
    const { userVote} = this.props.vote;

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Votes</h1>
              <p className="lead text-center height-big">
                  Vote, which programming language is the best. Each user can vote only once.
                </p>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Language</th>
                    <th scope="col">Count of votes</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {votes.map(vote => (
                  <VoteItem key={vote.id} vote={vote} userVote={userVote} blockButtons={this.blockButtons} userClickedOnVoteButton={this.state.userClickedOnVoteButton}/>
                ))}
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
                {/* <hr /> */}

        <div className="projects">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Projects</h1>
                <p className="lead text-center height-big">
                  Create your own project, update, or delete them. Dont forget to try create project task for project.
                </p>
                <br />
                <CreateProjectButton />

                <br />
                <hr />
                {projects.map(project => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  vote: PropTypes.object.isRequired,
  userVote: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
  getVoteResults: PropTypes.func.isRequired,
  getUserVote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  project: state.project,
  vote: state.vote,
  userVote: state.vote
});

export default connect(
  mapStateToProps,
  { getProjects, getVoteResults, getUserVote }
)(Dashboard);
