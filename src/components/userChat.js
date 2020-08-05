import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./userChat.style.js";
import { getUserList, sendUserMessage } from "../actions";

/**
 * @description - Renders the user chat component.
 * @returns {Node} - Returns html.
 */
class Userchat extends Component {
  /**
   * @description - Constructor for the class.
   * @param {Object} props - Object props.
   */
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  /**
   * @description - Lifecycle hook.
   */
  componentDidMount() {
    const { match, dispatch } = this.props;
    const userid = match.params.id;
    this.setState({
      userid,
    });
    dispatch(getUserList());
  }

  /**
   * @description - Function that handles the input change functionality.
   * @param {Object} e - Event object.
   */
  handleChange = (e) => {
    this.setState({
      message: e.target.value,
    });
    if (e.key === "Enter") {
      e.preventDefault();
      this.sendMessage();
    }
  };

  /**
   * @description - Function that handles the send message functionality.
   */
  sendMessage = () => {
    const { dispatch } = this.props;
    const { message, userid } = this.state;
    if (message !== "") {
      const payload = {
        id: userid,
        message,
      };
      dispatch(sendUserMessage(payload));
      this.setState({
        message: "",
      });
    }
  };

  /**
   * @description - Function that handles the back functionality.
   */
  goBack = () => {
    const { history } = this.props;
    history.push("/home");
  };

  /**
   * @description - Renders the message div.
   * @returns {Node} - Html for message div.
   */
  renderMsgDiv = () => {
    const { userid } = this.state;
    const { classes, userList } = this.props;
    const userData = userList.find((item) => item.id === userid);
    return (
      <Fragment>
        {userData !== undefined ? (
          <Fragment>
            <h2 style={{ margin: "20px" }}>{userData.user}</h2>
            <div className={classes.msgContainer}>
              {userData.messages.map((item) => (
                <div className={classes.msgRow}>
                  <img
                    className={classes.imgDiv}
                    src="/user.png"
                    alt="User icon"
                  />
                  <div className={classes.msgDiv}>{item}</div>
                </div>
              ))}
            </div>
          </Fragment>
        ) : null}
      </Fragment>
    );
  };

  /**
   * @description - Renders the input div and back button.
   * @returns {Node} - Html for input div and back button.
   */
  renderInputDiv = () => {
    const { classes } = this.props;
    const { message } = this.state;
    return (
      <Fragment>
        <div className={classes.inputContainer}>
          <div className={classes.inputDiv}>
            <textarea
              className={classes.textStyles}
              type="text"
              value={message}
              placeholder="Enter Message"
              onChange={this.handleChange}
              onKeyPress={this.handleChange}
            />
            <button
              className={classes.sendBtn}
              type="button"
              onClick={this.sendMessage}
            >
              Send
            </button>
          </div>
          <div className={classes.btnDiv}>
            <button
              className={classes.backBtn}
              type="button"
              onClick={this.goBack}
            >
              Back
            </button>
          </div>
        </div>
      </Fragment>
    );
  };

  /**
   * @description - Renders the user chat page.
   * @returns {Node} - Returns html.
   */
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.container}>
          {this.renderMsgDiv()}
          {this.renderInputDiv()}
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
Userchat.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

Userchat.defaultProps = {};

export default injectSheet(styles)(
  withRouter(connect(mapStateToProps)(Userchat))
);
