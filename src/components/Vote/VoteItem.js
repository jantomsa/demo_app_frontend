import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { voteById } from "../../actions/voteActions";

class VoteItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      description: "",
      countOfVotes: 0,
      showVoteButton: true
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.vote.id,
      description: this.props.vote.description,
      countOfVotes: this.props.vote.countOfVotes
    });
  }

  onClick = id => {
    this.props.voteById(id);
    this.setState({
      countOfVotes: this.state.countOfVotes + 1,
      showVoteButton: false
    });
    this.props.blockButtons();
  };

  render() {
    const { vote } = this.props;
    const { userVote } = this.props;
    const { userClickedOnVoteButton } = this.props;

    const voteButton = (
      <button
        className="btn btn-m btn-info"
        onClick={this.onClick.bind(this, vote.id)}
      >
        Vote for {vote.description}
      </button>
    );

    const alreadyVotedButton = (
      <button className="btn btn-m btn-info disabled">Already voted</button>
    );

    let button;
    if (
      Object.keys(userVote).length === 0 &&
      userClickedOnVoteButton === false
    ) {
      button = voteButton;
    } else {
      button = alreadyVotedButton;
    }

    return (
      <tr>
        <td>{vote.description}</td>
        <td>{this.state.countOfVotes}</td>
        <td>{button}</td>
      </tr>
    );
  }
}

VoteItem.propTypes = {
  voteById: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { voteById }
)(VoteItem);
