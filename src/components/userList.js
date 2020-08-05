import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./userList.style.js";
import { getUserList, addUserChat } from "../actions";
import randomstring from "randomstring";

/**
 * @description - Renders the userlist component.
 * @returns {Node} - Returns html.
 */
class UserList extends Component {
  /**
   * @description - Constructor for the class.
   * @param {Object} props - Object props.
   */
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  /**
   * @description - Lifecycle hook.
   */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getUserList());
  }

  /**
   * @description - Function to handle ech user click.
   * @param {*} id
   */
  handleClick = (id) => {
    const { history } = this.props;
    history.push(`/user/chat/${id}`);
  };

  /**
   * @description - Function to add new chat.
   */
  addNewChat = () => {
    const { dispatch } = this.props;
    const { username } = this.state;
    if (username !== "") {
      const id = randomstring.generate();
      const payload = {
        id,
        user: username,
        messages: [],
      };
      dispatch(addUserChat(payload));
    }
  };

  /**
   * @description - Function to handle on change func of input.
   * @param {Object} e - Event object.
   */
  handleChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  /**
   * @description - Renders the new chat div.
   * @returns {Node} - Returns html for new chat div.
   */
  renderAddNewChatDiv = () => {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.newDiv}>
          <input
            className={classes.inputDiv}
            type="text"
            placeholder="Enter username"
            onChange={this.handleChange}
          />
          <button
            className={classes.addBtn}
            type="button"
            onClick={this.addNewChat}
          >
            Add New Chat
          </button>
        </div>
      </Fragment>
    );
  };

  /**
   * @description - Renders the user list page.
   * @returns {Node} - Returns html.
   */
  render() {
    const { classes, userList } = this.props;
    return (
      <Fragment>
        <div className={classes.container}>
          <h1 style={{ margin: "50px" }}>Chat Application</h1>
          <h3>Available chats</h3>
          {userList.map((item, index) => (
            <div
              className={classes.userDiv}
              key={index}
              onClick={() => this.handleClick(item.id)}
            >
              {item.user}
            </div>
          ))}
          {this.renderAddNewChatDiv()}
        </div>
      </Fragment>
    );
  }
}
/**
 * @description Map all form state to props.
 * @param {Object} state - State.
 * @returns {Object} - Props.
 */
function mapStateToProps(state) {
  return {
    userList: state.userListReducer,
  };
}

UserList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

UserList.defaultProps = {};

export default injectSheet(styles)(
  withRouter(connect(mapStateToProps)(UserList))
);
